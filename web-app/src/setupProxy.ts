import express from 'express';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

const target = process.env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}` :
        process.env.ASPNETCORE_URLS ? process.env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:9497';

const app = express();
app.use('/', createProxyMiddleware({
    target: target,
    secure: false,
    changeOrigin: true,
    headers: {
        Connection: 'Keep-Alive'
    }
}));
app.listen(process.env.ASPNETCORE_HTTPS_PORT ?? 9497);
