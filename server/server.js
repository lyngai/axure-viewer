const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-body')({
	multipart: true,
	formidable: {
		uploadDir: path.resolve('tmp'),
		maxFileSize: 10*1024*1024 // 限制上传10M
	}
});
const router = require('./routes/web');
const apiRouter = require('./routes/api');

const app = new Koa();

const cors = (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH,PUT,OPTIONS,HEAD');
	ctx.set('Access-Control-Allow-Headers', '*');
	// console.log('cors middleware');
	return next(ctx);
};

app.use(cors)
   .use(bodyParser)
   .use(router)
   .use(apiRouter.router)
   .use(apiRouter.method);

app.listen(3000, function(){
	console.log('Listening on localhost:3000...');
});