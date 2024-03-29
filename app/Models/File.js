'use strict'

const Model = use('Model')
const Env = use('Env')

class File extends Model {
  static get computed () {
    return ['url']
  }

  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/FILES/${id}`
  }
}

module.exports = File
