'use strict'
/**
  * @swagger
  *  /users:
  *  post:
  *    tags:
  *     - User
  *    description: create new user
  *    produces:
  *      - application/json
  *    parameters:
  *      - name: username
  *        description: Name of the user.
  *        in: body
  *        required: true
  *        type: string
  *      - name: email
  *        description: User's email.
  *        in: body
  *        required: true
  *        type: string
  *      - name: password
  *        description: User's password.
  *        in: body
  *        required: true
  *        type: string
  *      - name: password_confirmation
  *        description: Password's confirmation.
  *        in: body
  *        required: true
  *        type: string
  *        format: password
  *      - name: addresses
  *        description: User's address.
  *        in: body
  *        required: false
  *        type: array
  *        schema:
  *         type: object
  *         properties:
  *           street:
  *             type: string
  *             example: "Rua teste"
  *           number:
  *             type: integer
  *             example: 3
  *           district:
  *             type: string
  *           city:
  *             type: string
  *             example: "Cidade teste"
  *           state:
  *             type: string
  *             example: "DF"
  *           required:
  *             - street
  *             - number
  *             - city
  *             - state
  *      - name: roles
  *        description: Array of id's roles.
  *        in: body
  *        required: false
  *        type: array
  *      - name: permissions
  *        description: Array of id's permissions.
  *        in: body
  *        required: false
  *        type: array
  *
  *    responses:
  *      200:
  *        description: return user created
  *        example:
  *           {
  *              "username": "User Teste",
  *              "email": "userteste@email.com",
  *              "password": "$2a$10$d.rlwUeUZr4abivKbQiEf.cdGIy7uO52IxtcXXp93pso1aS6MsbBi",
  *              "created_at": "2020-01-12 01:36:33",
  *              "updated_at": "2020-01-12 01:36:33",
  *              "id": 25,
  *              "roles": [
  *                {
  *                  "id": 1,
  *                  "slug": "administrator",
  *                  "name": "Administrator",
  *                  "description": "Administrator of project",
  *                  "created_at": "2020-01-10 16:04:04",
  *                  "updated_at": "2020-01-10 16:04:04",
  *                  "pivot": {
  *                      "role_id": 1,
  *                      "user_id": 25
  *                   }
  *                 }
  *               ],
  *              "permissions": [
  *                {
  *                  "id": 3,
  *                  "slug": "read_task",
  *                  "name": "Read Task",
  *                  "description": "Read task on project",
  *                  "created_at": "2020-01-10 16:04:04",
  *                  "updated_at": "2020-01-10 16:04:04",
  *                  "pivot": {
  *                    "permission_id": 3,
  *                    "user_id": 25
  *                  }
  *                }
  *              ]
  *           }
  */
const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const { permissions, roles, ...data } = request.only([
      'username',
      'email',
      'password',
      'permissions',
      'roles'
    ])
    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)

    await user.addresses().createMany(addresses, trx)

    await trx.commit()

    if (roles) {
      await user.roles().attach(roles)
    }

    if (permissions) {
      await user.permissions().attach(permissions)
    }

    await user.loadMany(['roles', 'permissions'])

    return user
  }
}

module.exports = UserController
