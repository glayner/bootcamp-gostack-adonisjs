'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .except(['index', 'show'])
    .validator(new Map(
      [
        [
          ['projects.store'],
          ['Project']
        ]
      ]
    ))

  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .except(['index', 'show'])
    .validator(new Map(
      [
        [
          ['projects.tasks.store'],
          ['Task']
        ]
      ]
    ))

  Route.resource('permissions', 'PermissionController')
    .apiOnly()
  Route.resource('roles', 'RoleController')
    .apiOnly()
}).middleware(['auth', 'is:(administrator || moderator)'])

Route.group(() => {
  Route.get('projects', 'ProjectController.index')
  Route.get('projects/:id', 'ProjectController.show')

  Route.get('projects/:projects_id/tasks/', 'TaskController.index')
  Route.get('projects/:projects_id/tasks/:id', 'TaskController.show')
}).middleware(['auth', 'can:(read_task || read_private_task)'])
