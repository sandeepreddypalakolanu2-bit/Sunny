import { randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createServer as createHttpServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProd = process.argv.includes('--prod');

const dataDir = path.join(__dirname, 'data');
const submissionsPath = path.join(dataDir, 'submissions.json');
const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(__dirname, 'index.html');

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const emptyStore = {
  contacts: [],
  newsletters: [],
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(payload));
}

function normalizeText(value, maxLength = 5000) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function ensureStore() {
  try {
    await access(submissionsPath);
  } catch {
    await mkdir(dataDir, { recursive: true });
    await writeFile(submissionsPath, `${JSON.stringify(emptyStore, null, 2)}\n`, 'utf8');
  }
}

async function readStore() {
  await ensureStore();

  try {
    const raw = await readFile(submissionsPath, 'utf8');
    const parsed = JSON.parse(raw);

    return {
      contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
      newsletters: Array.isArray(parsed.newsletters) ? parsed.newsletters : [],
    };
  } catch {
    await writeFile(submissionsPath, `${JSON.stringify(emptyStore, null, 2)}\n`, 'utf8');
    return structuredClone(emptyStore);
  }
}

async function writeStore(store) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(submissionsPath, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error('Request body too large.'));
        request.destroy();
      }
    });

    request.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON payload.'));
      }
    });

    request.on('error', reject);
  });
}

async function handleApi(request, response) {
  if (!request.url) {
    return false;
  }

  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

  if (request.method === 'GET' && url.pathname === '/api/health') {
    sendJson(response, 200, { ok: true, environment: isProd ? 'production' : 'development' });
    return true;
  }

  if (request.method === 'POST' && url.pathname === '/api/contact') {
    try {
      const body = await parseBody(request);
      const submission = {
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        name: normalizeText(body.name, 120),
        email: normalizeText(body.email, 180).toLowerCase(),
        service: normalizeText(body.service, 120),
        message: normalizeText(body.message, 4000),
      };

      if (submission.name.length < 2) {
        sendJson(response, 400, { ok: false, message: 'Please enter your name.' });
        return true;
      }

      if (!isValidEmail(submission.email)) {
        sendJson(response, 400, { ok: false, message: 'Please enter a valid email address.' });
        return true;
      }

      if (submission.message.length < 10) {
        sendJson(response, 400, { ok: false, message: 'Please add a short project message.' });
        return true;
      }

      const store = await readStore();
      store.contacts.unshift(submission);
      await writeStore(store);

      sendJson(response, 201, {
        ok: true,
        message: 'Thanks. Your project request has been saved successfully.',
      });
      return true;
    } catch (error) {
      sendJson(response, 400, { ok: false, message: error.message || 'Unable to save contact request.' });
      return true;
    }
  }

  if (request.method === 'POST' && url.pathname === '/api/newsletter') {
    try {
      const body = await parseBody(request);
      const submission = {
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        email: normalizeText(body.email, 180).toLowerCase(),
      };

      if (!isValidEmail(submission.email)) {
        sendJson(response, 400, { ok: false, message: 'Please enter a valid email address.' });
        return true;
      }

      const store = await readStore();
      const existing = store.newsletters.find((entry) => entry.email === submission.email);

      if (existing) {
        sendJson(response, 200, { ok: true, message: 'This email is already subscribed.' });
        return true;
      }

      store.newsletters.unshift(submission);
      await writeStore(store);

      sendJson(response, 201, {
        ok: true,
        message: 'Thanks. You have been added to the newsletter list.',
      });
      return true;
    } catch (error) {
      sendJson(response, 400, { ok: false, message: error.message || 'Unable to save newsletter signup.' });
      return true;
    }
  }

  return false;
}

async function streamFile(response, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extension] || 'application/octet-stream';

  response.writeHead(200, {
    'Content-Type': contentType,
  });

  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on('error', reject);
    response.on('close', resolve);
    stream.pipe(response);
  });
}

async function serveProductionAsset(request, response) {
  const url = new URL(request.url || '/', 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);
  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const normalizedPath = path.normalize(requestedPath).replace(/^(\.\.(\/|\\|$))+/, '');
  const filePath = path.join(distDir, normalizedPath);
  const resolvedPath = path.resolve(filePath);

  if (!resolvedPath.startsWith(path.resolve(distDir))) {
    sendJson(response, 403, { ok: false, message: 'Forbidden.' });
    return;
  }

  try {
    const fileStats = await stat(resolvedPath);

    if (fileStats.isFile()) {
      await streamFile(response, resolvedPath);
      return;
    }
  } catch {
    // Fall through to SPA fallback.
  }

  await streamFile(response, path.join(distDir, 'index.html'));
}

async function createAppServer() {
  if (!isProd) {
    const vite = await createViteServer({
      appType: 'spa',
      server: { middlewareMode: true },
    });

    return createHttpServer(async (request, response) => {
      try {
        if (await handleApi(request, response)) {
          return;
        }

        vite.middlewares(request, response, async () => {
          try {
            const template = await readFile(indexHtmlPath, 'utf8');
            const html = await vite.transformIndexHtml(request.url || '/', template);

            response.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8',
            });
            response.end(html);
          } catch (error) {
            vite.ssrFixStacktrace(error);
            response.writeHead(500, {
              'Content-Type': 'text/plain; charset=utf-8',
            });
            response.end(error.message);
          }
        });
      } catch (error) {
        response.writeHead(500, {
          'Content-Type': 'application/json; charset=utf-8',
        });
        response.end(JSON.stringify({ ok: false, message: error.message || 'Server error.' }));
      }
    });
  }

  return createHttpServer(async (request, response) => {
    try {
      if (await handleApi(request, response)) {
        return;
      }

      await serveProductionAsset(request, response);
    } catch (error) {
      response.writeHead(500, {
        'Content-Type': 'application/json; charset=utf-8',
      });
      response.end(JSON.stringify({ ok: false, message: error.message || 'Server error.' }));
    }
  });
}

await ensureStore();

const server = await createAppServer();
server.listen(PORT, '0.0.0.0', () => {
  const mode = isProd ? 'production' : 'development';
  console.log(`Ishwarya portfolio server running in ${mode} mode on http://localhost:${PORT}`);
});
