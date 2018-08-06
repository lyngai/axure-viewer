const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
	ctx.body = 'koa test';
	return next();
})

module.exports = router.routes();