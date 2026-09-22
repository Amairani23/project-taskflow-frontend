import { getToken } from "./token"
import { BASE_URL } from "./auth"

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    }
  }

  //Muestra información del usuario
  getUsers() {
    return fetch(`${this.baseUrl}/users`, {
      headers: this._getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // Edita información del usuario
  updateUserAdmin(userData, userId) {
    return fetch(`${this.baseUrl}/users/${userId}`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        systemRol: userData.systemRol,
      }),
    }).then(async (res) => {
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || `Error: ${res.status}`)
      }

      return data
    })
  }

  // Eliminar proyecto
  deleteUser(userId) {
    console.log("3. API:", userId)
    return fetch(`${this.baseUrl}/users/${userId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || `Error: ${res.status}`)
      }

      return data
    })
  }

  // Edita información del usuario
  updateUserInfo(userData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: userData.name,
        avatar: userData.avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // Muestra las proyectos
  getInitialProject() {
    return fetch(`${this.baseUrl}/projects`, {
      headers: this._getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // Edita proyecto
  updateProjectInfo(projectData, projectId) {
    return fetch(`${this.baseUrl}/projects/${projectId}`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        titleProject: projectData.titleProject,
        descriptionProject: projectData.descriptionProject,
        assignedTo: projectData.assignedTo,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  //Agrega proyecto
  addProject(projectData) {
    return fetch(`${this.baseUrl}/projects`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        titleProject: projectData.titleProject,
        descriptionProject: projectData.descriptionProject,
        assignedTo: projectData.assignedTo,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // Eliminar proyecto
  deleteProject(projectId) {
    return fetch(`${this.baseUrl}/projects/${projectId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || `Error: ${res.status}`)
      }

      return data
    })
  }

  // Muestra las tareas para admin
  getInitialTaskAdmin() {
    return fetch(`${this.baseUrl}/tasks`, {
      headers: this._getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // Editar las tareas para admin
  updateTaskAdmin(taskData, projectId, taskId) {
    return fetch(`${this.baseUrl}/projects/${projectId}/tasks/${taskId}`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        title: taskData.title,
        status: taskData.status,
        prioridad: taskData.prioridad,
        assignedTo: taskData.assignedTo,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // Muestra las tareas
  getInitialTask(projectId) {
    return fetch(`${this.baseUrl}/projects/${projectId}/tasks`, {
      headers: this._getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // Edita tarea
  updateTaskInfo(taskData, projectId, taskId) {
    return fetch(`${this.baseUrl}/projects/${projectId}/tasks/${taskId}`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        title: taskData.title,
        status: taskData.status,
        prioridad: taskData.prioridad,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  //Agrega tareas
  createTask(taskData, projectId) {
    return fetch(`${this.baseUrl}/projects/${projectId}/tasks`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        title: taskData.title,
        status: taskData.status,
        prioridad: taskData.prioridad,
        assignedTo: taskData.assignedTo,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // Eliminar tarea
  deleteTask(taskId, projectId) {
    return fetch(`${this.baseUrl}/projects/${projectId}/tasks/${taskId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => {
      if (res.ok) return res.json()
      return Promise.reject(`Error: ${res.status}`)
    })
  }
}

const api = new Api({
  baseUrl: BASE_URL,
})

export default api
