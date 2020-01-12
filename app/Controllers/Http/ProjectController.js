'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  /**
  * @swagger
  *  /projects:
  *  get:
  *    tags:
  *     - Projects
  *    description: find all projects per page
  *    produces:
  *      - application/json
  *    parameters:
  *      - name: page
  *        description: Project's page.
  *        in: query
  *        required: false
  *
  *    responses:
  *      200:
  *        description: return all projects per page
  *        example:
  *           {
  *             "total": "1",
  *             "perPage": 20,
  *             "page": 1,
  *             "lastPage": 1,
  *             "data": [
  *               {
  *                 "id": 1,
  *             "user_id": 1,
  *             "title": "Projeto Teste",
  *                 "description": "Teste",
  *                 "created_at": "2020-01-04 21:49:45",
  *                 "updated_at": "2020-01-04 21:49:45",
  *                 "user": {
  *                   "id": 1,
  *                   "username": "Teste User",
  *                   "email": "teste@email.com",
  *                   "password": "$2a$10$Mb/wyqZMTbwkp.glYYcx8uV7Ge1jZMu78dGZEhXv1jfry6fndAKYq",
  *                   "token": null,
  *                   "token_created_at": null,
  *                   "created_at": "2020-01-04 21:49:21",
  *                   "updated_at": "2020-01-04 21:49:21"
  *                 }
  *               }
  *             ]
  *           }
  */
  async index ({ request }) {
    const { page } = request.get()
    const projects = await Project.query().with('user').paginate(page)
    return projects
  }

  /**
  * @swagger
  *  /projects:
  *  post:
  *    tags:
  *     - Projects
  *    description: Create a new project
  *    produces:
  *      - application/json
  *    parameters:
  *      - name: title
  *        description: title of project
  *        in: body
  *        required: true
  *        type: string
  *      - name: description
  *        description: Project's description
  *        in: body
  *        required: true
  *        type: string
  *
  *    responses:
  *      200:
  *        description: return the project created
  *        example:
  *          {
  *            "title": "Projeto teste",
  *            "description": "Teste",
  *            "user_id": 23,
  *            "created_at": "2020-01-11 16:00:45",
  *            "updated_at": "2020-01-11 16:00:45",
  *            "id": 3
  *          }
  *
  */
  async store ({ request, auth }) {
    const data = request.only(['title', 'description'])

    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  /**
  * @swagger
  *  /projects/:id:
  *  get:
  *    tags:
  *     - Projects
  *    description: find the projects per id
  *    produces:
  *      - application/json
  *    parameters:
  *      - name: id
  *        description: Project's id.
  *        in: query
  *        required: true
  *
  *    responses:
  *      200:
  *        description: return the projects per id with tasks
  *        example:
  *          {
  *            "id": 1,
  *            "user_id": 1,
  *            "title": "Projeto em React",
  *            "description": "Teste",
  *            "created_at": "2020-01-04 21:49:45",
  *            "updated_at": "2020-01-04 21:49:45",
  *            "user": {
  *                   "id": 1,
  *                   "username": "User Teste",
  *                   "email": "teste@email.com",
  *                   "password": "$2a$10$Mb/wyqZMTbwkp.glYYcx8uV7Ge1jZMu78dGZEhXv1jfry6fndAKYq",
  *                   "token": null,
  *                   "token_created_at": null,
  *                   "created_at": "2020-01-04 21:49:21",
  *                   "updated_at": "2020-01-04 21:49:21"
  *            },
  *            "tasks": [
  *            {
  *              "id": 3,
  *              "project_id": 1,
  *              "user_id": 3,
  *              "file_id": 1,
  *              "title": "Tarefa #1",
  *              "description": "Class para Hooks",
  *              "due_date": "2020-01-07T15:00:00.000Z",
  *              "created_at": "2020-01-06 02:03:21",
  *              "updated_at": "2020-01-06 11:06:46",
  *              "type": "public"
  *            },
  *            {
  *              "id": 2,
  *              "project_id": 1,
  *              "user_id": null,
  *              "file_id": 1,
  *              "title": "Tarefa #1",
  *              "description": null,
  *              "due_date": "2020-01-07T15:00:00.000Z",
  *              "created_at": "2020-01-06 08:03:06",
  *              "updated_at": "2020-01-11 00:00:10",
  *              "type": "private"
  *            }
  *            ]
  *          }
  */
  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.load('user')
    await project.load('tasks')

    return project
  }

  async update ({ params, request }) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['title', 'description'])

    project.merge(data)

    await project.save()

    return project
  }

  async destroy ({ params, request, response }) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
