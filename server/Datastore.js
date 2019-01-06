const fs = require('fs');

class Datastore {
  constructor(options) {
    const { filename } = options;
    this.filename = filename;
    this.data = fs.existsSync(this.filename)
      ? JSON.parse(fs.readFileSync(this.filename))
      : {
        projects: [],
        nextProjectId: 1,
        tasks: [],
        nextTaskId: 1,
      };
  }

  save() {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filename, JSON.stringify(this.data, null, 2), 'utf-8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  formatProject({ id, name }) {
    const taskCount = this.data.tasks.reduce(
      (memo, { projectId }) => (id === projectId ? memo + 1 : memo),
      0,
    );
    return {
      id,
      name,
      taskCount,
    };
  }

  async getProjects() {
    const taskCounts = this.data.tasks.reduce((memo, { projectId }) => {
      memo[projectId] = (memo[projectId] || 0) + 1; // eslint-disable-line no-param-reassign
      return memo;
    }, {});
    return this.data.projects.map(({ id, name }) => ({
      id,
      name,
      taskCount: taskCounts[id] || 0,
    }));
  }

  async createProject(attrs) {
    const { name } = attrs;
    const project = {
      id: String(this.data.nextProjectId++), // eslint-disable-line no-plusplus
      name,
    };
    this.data.projects.push(project);
    await this.save();
    return this.formatProject(project);
  }

  async getProject(projectId) {
    const project = this.data.projects.find(({ id }) => id === projectId);
    if (!project) {
      throw new Error('Not found');
    }
    return this.formatProject(project);
  }

  async updateProject(projectId, attrs) {
    const project = this.data.projects.find(({ id }) => id === projectId);
    if (!project) {
      throw new Error('Not found');
    }
    const { name } = attrs;
    Object.assign(project, { name });
    await this.save();
    return this.formatProject(project);
  }

  async deleteProject(projectId) {
    const index = this.data.projects.findIndex(({ id }) => id === projectId);
    if (index >= 0) {
      this.data.projects.splice(index, 1);
      await this.save();
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  formatTask({
    id, projectId, title, dueDate,
  }) {
    return {
      id, projectId, title, dueDate,
    };
  }

  async getProjectTasks(projectId) {
    const project = this.data.projects.find(({ id }) => id === projectId);
    if (!project) {
      throw new Error('Not found');
    }
    const tasks = this.data.tasks.filter(({ projectId: pid }) => pid === projectId);
    return tasks.map(this.formatTask);
  }

  async createTask(projectId, attrs) {
    const project = this.data.projects.find(({ id }) => id === projectId);
    if (!project) {
      throw new Error('Not found');
    }
    const { title, dueDate } = attrs;
    const task = {
      id: String(this.data.nextTaskId++), // eslint-disable-line no-plusplus
      projectId,
      title,
      dueDate,
    };
    this.data.tasks.push(task);
    await this.save();
    return this.formatTask(task);
  }

  async getTask(taskId) {
    const task = this.data.tasks.find(({ id }) => id === taskId);
    if (!task) {
      throw new Error('Not found');
    }
    return this.formatTask(task);
  }

  async updateTask(taskId, attrs) {
    const task = this.data.tasks.find(({ id }) => id === taskId);
    if (!task) {
      throw new Error('Not found');
    }
    const { title, dueDate } = attrs;
    Object.assign(task, { title, dueDate });
    await this.save();
    return this.formatTask(task);
  }

  async deleteTask(taskId) {
    const index = this.data.tasks.findIndex(({ id }) => id === taskId);
    if (index >= 0) {
      this.data.tasks.splice(index, 1);
      await this.save();
    }
    return null;
  }
}

module.exports = Datastore;
