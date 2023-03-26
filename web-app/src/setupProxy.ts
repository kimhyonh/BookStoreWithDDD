import express from 'express';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

const target = process.env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}` :
        process.env.ASPNETCORE_URLS ? process.env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:9497';

const app = express();
app.use('/weatherforecast', createProxyMiddleware({
    target: target,
    secure: false,
    headers: {
        Connection: 'Keep-Alive'
    }
}));
app.listen(process.env.PORT ?? 3000);
