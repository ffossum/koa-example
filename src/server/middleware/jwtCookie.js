import {getUserByJwt, signJwt} from '../jwt';

const COOKIE_NAME = 'jwt';
const EXPIRATION_AGE = 604800000; // 7 days

function getExpirationDate() {
  return new Date(Number(new Date()) + EXPIRATION_AGE);
}

export async function refreshJwtCookie(ctx, next) {
  if (ctx.isAuthenticated()) {
    const jwt = await signJwt({id: ctx.req.user.id}, {expiresIn: '7d'});
    ctx.cookies.set(COOKIE_NAME, jwt, {
      httpOnly: true,
      expires: getExpirationDate()
    });
  }
  await next();
}

function lastWeek() {
  return new Date(Number(new Date()) - EXPIRATION_AGE);
}

export async function expireJwtCookie(ctx, next) {
  ctx.cookies.set(COOKIE_NAME, false, {
    httpOnly: true,
    expires: lastWeek()
  });
  ctx.status = 200;

  await next();
}

export async function authenticateJwtCookie(ctx, next) {
  const jwt = ctx.cookies.get(COOKIE_NAME);
  try {
    const user = await getUserByJwt(jwt);
    ctx.req.user = user;
  } catch (err) {}

  await next();
}
