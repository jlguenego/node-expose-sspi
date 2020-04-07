import 'source-map-support/register';
import Koa from 'koa';
import { sso } from '../../src/index';
const app = new Koa();

const middleware = sso.auth();

app.use(async (ctx, next) => {
  await middleware(ctx.req, ctx.res, next);
});

app.use(async (ctx, next) => {
  ctx.body = (ctx.req as any).sso;
});

app.listen(3000, () => console.log('Koa started on port 3000'));
