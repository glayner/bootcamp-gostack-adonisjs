'use strict'

const Model = use('Model')

/**
 * @swagger
 * definitions:
 *   Project:
 *     type: object
 *     properties:
 *       id:
 *         type: uuid
 *       user_id:
 *         type: integer
 *       title:
 *         type: string
 *         required: true
 *       description:
 *         type: string
 *         required: true
 *       created_at:
 *         type: timestampz
 *       updated_at:
 *         type: timestampz
 */

class Project extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  tasks () {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
