'use strict'

const Model = use('Model')
const Hash = use('Hash')

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       token:
 *         type: string
 *       token_created_at:
 *         type: timestamp
 *       created_at:
 *         type: timestamp
 *       updated_at:
 *         type: timestamp
 *       required:
 *         - username
 *         - email
 *         - password
 *
 */

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }

  addresses () {
    return this.hasMany('App/Models/UseAddress')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  projects () {
    return this.hasMany('App/Models/Project')
  }

  tasks () {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = User
