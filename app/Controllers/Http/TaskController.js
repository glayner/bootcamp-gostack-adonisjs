'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index ({ params, auth }) {
    const user = await auth.getUser()

    if (await user.can('read_private_task')) {
      const tasks = await Task.query()
        .where('project_id', params.projects_id)
        .with('user')
        .fetch()

      return tasks
    }
    const tasks = await Task.query()
      .where('type', 'public')
      .with('user')
      .fetch()

    return tasks
  }

  async store ({ params, request }) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id',
      'type'
    ])

    const task = await Task.create({ ...data, project_id: params.projects_id })

    return task
  }

  async show ({ params, response, auth }) {
    const task = await Task.findOrFail(params.id)

    if (task.type === 'public') {
      return task
    }
    const user = await auth.getUser()

    if (await user.can('read_private_task')) {
      return task
    }

    return response.status(400).send({ message: { error: 'Você não tem permissão de leitura' } })
  }

  async update ({ params, request }) {
    const task = await Task.findOrFail(params.id)
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id',
      'type'
    ])

    task.merge(data)

    await task.save()

    return task
  }

  async destroy ({ params }) {
    const task = await Task.findOrFail(params.id)

    await task.delete()
  }
}

module.exports = TaskController
