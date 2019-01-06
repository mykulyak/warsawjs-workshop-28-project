const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serveStatic = require('koa-static');
const cors = require('@koa/cors');
const compress = require('koa-compress');

const Datastore = require('./Datastore');

const app = new Koa();

app.use(cors());
app.use(compress({
  threshold: 4096,
}));
app.use(bodyParser());

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

app.use(router.routes());
app.use(router.allowedMethods());

app.use(serveStatic(path.join(__dirname, '..', 'dist')));

app.listen(process.env.PORT || 3000);
