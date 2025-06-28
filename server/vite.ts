// server/vite.ts
import express, { type Express } from 'express';
import fs from 'fs';
import path from 'path';
import {
  createServer as createViteServer,
  createLogger,
  type ViteDevServer
} from 'vite';
import type { Server as HttpServer } from 'http';
import viteConfig from '../vite.config';
import { nanoid } from 'nanoid';

const viteLogger = createLogger();

/** Simple timestamped logger */
export function log(message: string, source = 'express'): void {
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour:   'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: HttpServer): Promise<void> {
  const serverOptions: import('vite').ServerOptions = {
    middlewareMode: true,
    hmr:            { server },
    allowedHosts:   true, // must be `true` or string[]
  };

  const vite: ViteDevServer = await createViteServer({
    ...viteConfig,
    configFile:   false,
    customLogger: {
      ...viteLogger,
      error: (msg, opts) => {
        viteLogger.error(msg, opts);
        process.exit(1);
      },
    },
    server:  serverOptions,
    appType: 'custom',
  });

  app.use(vite.middlewares);

  // All other requests → index.html
  app.use('*', async (req, res, next) => {
    try {
      const templatePath = path.resolve(
          import.meta.dirname,
          '..',
          'client',
          'index.html'
      );
      let template = await fs.promises.readFile(templatePath, 'utf-8');
      template = template.replace(
          `src="/src/main.tsx"`,
          `src="/src/main.tsx?v=${nanoid()}"`
      );
      const html = await vite.transformIndexHtml(req.originalUrl, template);
      res.status(200).type('text/html').send(html);
    } catch (err) {
      vite.ssrFixStacktrace(err as Error);
      next(err);
    }
  });
}

export function serveStatic(app: Express): void {
  const distPath = path.resolve(import.meta.dirname, 'public');
  if (!fs.existsSync(distPath)) {
    throw new Error(`Missing build directory: ${distPath}`);
  }

  // ← express.static is available now because we `import express` above
  app.use(express.static(distPath));
  app.use('*', (_req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}
