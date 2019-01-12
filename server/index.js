const fs = require('fs');
const path = require('path');
const http2 = require('http2');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serveStatic = require('koa-static');
const cors = require('@koa/cors');
const compress = require('koa-compress');
const sslify = require('koa-sslify').default;
// const favicon = require('koa-favicon');

const Datastore = require('./Datastore');

const PORT = process.env.PORT || 3000;
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = new Koa();

app.use(cors());
app.use(sslify({
  port: PORT,
}));
app.use(compress({
  threshold: 4096,
}));
app.use(bodyParser());
// app.use(favicon(path.join(__dirname, 'assets', 'favicon.png')));

const router = new Router();

const db = new Datastore({ filename: path.join(__dirname, '..', 'datastore.json') });

router.post('/auth', async (ctx) => {
  console.warn(ctx);
});

router.delete('/auth', async (ctx) => {
  console.warn(ctx);
});

router.get('/projects', async (ctx) => {
  const result = await db.getProjects();
  ctx.response.body = result;
});

router.post('/projects', async (ctx) => {
  const attrs = ctx.request.body;
  const result = await db.createProject(attrs);
  ctx.response.body = result;
});

router.get('/projects/:id', async (ctx) => {
  const projectId = ctx.params.id;
  const result = await db.getProject(projectId);
  ctx.response.body = result;
});

router.put('/projects/:id', async (ctx) => {
  const projectId = ctx.params.id;
  const attrs = ctx.request.body;
  const result = await db.updateProject(projectId, attrs);
  ctx.response.body = result;
});

router.delete('/projects/:id', async (ctx) => {
  const projectId = ctx.params.id;
  const result = await db.deleteProject(projectId);
  ctx.response.body = result;
});

router.get('/projects/:id/tasks', async (ctx) => {
  const projectId = ctx.params.id;
  const result = await db.getProjectTasks(projectId);
  ctx.response.body = result;
});

router.post('/projects/:id/tasks', async (ctx) => {
  const projectId = ctx.params.id;
  const attrs = ctx.request.body;
  const result = await db.createTask(projectId, attrs);
  ctx.response.body = result;
});

router.get('/tasks/:id', async (ctx) => {
  const taskId = ctx.params.id;
  const result = await db.getTask(taskId);
  ctx.response.body = result;
});

router.put('/tasks/:id', async (ctx) => {
  const taskId = ctx.params.id;
  const attrs = ctx.request.body;
  const result = await db.updateTask(taskId, attrs);
  ctx.response.body = result;
});

router.delete('/tasks/:id', async (ctx) => {
  const taskId = ctx.params.id;
  const result = await db.deleteTask(taskId);
  ctx.response.body = result;
});

const swSource = fs.readFileSync(path.join(__dirname, '..', 'dist', 'assets', 'sw.js'));
router.get('/sw.js', async (ctx) => {
  ctx.response.type = 'application/javascript';
  ctx.response.body = swSource;
});

const faviconSource = fs.readFileSync(path.join(__dirname, 'assets', 'favicon.png'));
router.get('/favicon.png', async (ctx) => {
  ctx.response.type = 'image/png';
  ctx.response.body = faviconSource;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(serveStatic(path.join(__dirname, '..', 'dist')));

const options = {
  key: fs.readFileSync(path.join(__dirname, 'config', 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'config', 'server.crt')),
};

app.listen(HTTP_PORT);
http2
  .createSecureServer(options, app.callback())
  .listen(PORT);
