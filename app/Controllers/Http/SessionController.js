'use strict'

class SessionController {
/**
  * @swagger
  *  /sessions:
  *  get:
  *    tags:
  *     - Session
  *    description: Make load in session and get token
  *    produces:
  *      - application/json
  *    parameters:
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
  *
  *    responses:
  *      200:
  *        description: return user's token
  *        example:
  *           {
  *             "type": "bearer",
  *             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1Nzg3MjAwODR9.s5gV5ksDf8Gvz4mEe2krzLewsA23dOeBfZf70W7KvJg",
  *             "refreshToken": null
  *           }
  */
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
