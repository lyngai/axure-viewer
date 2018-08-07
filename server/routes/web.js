const path = require('path');
const Router = require('koa-router');
const serve = require('koa-static');
const router = new Router();

router.get('/*', serve('../dist')); // front-end
router.get('/projects/*', serve('.')); // axure projects

module.exports = router.routes();