const API_ROOT = 'https://localhost:3000';

export function login(credentials) {
  return global.fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function logout() {
  return global.fetch(`${API_ROOT}/auth`, {
    method: 'DELETE',
  });
}

export function readProjectList() {
  return global.fetch(`${API_ROOT}/projects`, {
    method: 'GET',
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.json();
  });
}

export function createProject(attrs) {
  return global.fetch(`${API_ROOT}/projects`, {
    method: 'POST',
    body: JSON.stringify(attrs),
  });
}

export function readProject(id) {
  return global.fetch(`${API_ROOT}/projects/${id}`, {
    method: 'GET',
  });
}

export function updateProject(id, attrs) {
  return global.fetch(`${API_ROOT}/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(attrs),
  });
}

export function deleteProject(id) {
  return global.fetch(`${API_ROOT}/projects/${id}`, {
    method: 'DELETE',
  });
}

export function readTaskList(projectId) {
  return global.fetch(`${API_ROOT}/projects/${projectId}/tasks`, {
    method: 'GET',
  });
}

export function createTask(projectId, attrs) {
  return global.fetch(`${API_ROOT}/projects/${projectId}/tasks`, {
    method: 'POST',
    body: JSON.stringify(attrs),
  });
}

export function updateTask(taskId, attrs) {
  return global.fetch(`${API_ROOT}/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(attrs),
  });
}

export function deleteTask(taskId) {
  return global.fetch(`${API_ROOT}/tasks/${taskId}`, {
    method: 'DELETE',
  });
}
