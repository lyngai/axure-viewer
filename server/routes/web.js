const path = require('path');
const Router = require('koa-router');
const serve = require('koa-static');
const router = new Router();

// current dir = server, url prefix = dir path
router.get('/*', serve('../dist'));
router.get('/projects/*', serve('.'), (ctx, next) => {
	console.log('projects');
});

// console.log(path.resolve('../dist'),path.resolve('./projects') );
console.dir(router, {depth: null});

module.exports = router.routes();