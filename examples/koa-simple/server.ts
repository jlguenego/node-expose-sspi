import 'source-map-support/register';
import Koa from 'koa';
import { sso } from 'node-expose-sspi';
const app = new Koa();

const middleware = sso.auth();

app.use(async (ctx, next) => {
  await middleware(ctx.req, ctx.res, next);
});

app.use((ctx) => {
  ctx.body = ctx.req.sso;
});

app.listen(3000, () => console.log('Koa started on port 3000'));
