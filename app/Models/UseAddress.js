'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
/**
 * @swagger
 * definitions:
 *   UseAddress:
 *     type: object
 *     properties:
 *       id:
 *         type: uuid
 *       user_id:
 *         type: integer
 *       street:
 *         type: string
 *         required: true
 *       number:
 *         type: integer
 *         required: true
 *       district:
 *         type: string
 *       city:
 *         type: string
 *         required: true
 *       state:
 *         type: string
 *         required: true
 *       created_at:
 *         type: timestamp
 *       updated_at:
 *         type: timestamp
 */

class UseAddress extends Model {
}

module.exports = UseAddress
