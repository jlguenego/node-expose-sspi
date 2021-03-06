import 'source-map-support/register';
import Koa from 'koa';
// eslint-disable-next-line node/no-unpublished-import
import { sso, NextFunction } from '../..';
const app = new Koa();

const auth = sso.auth();

const authPromise = (
  ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const next: NextFunction = (err?: Error) => (err ? reject(err) : resolve());
    auth(ctx.req, ctx.res, next);
  });
};

app.use(async (ctx, next) => {
  await authPromise(ctx);
  next();
});

app.use((ctx) => {
  ctx.body = ctx.req.sso;
});

app.listen(3000, () => console.log('Koa started on port 3000'));
