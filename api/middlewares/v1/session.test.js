const test = require('ava')
const request = require('supertest')
const { sequelize } = require('../../models')
const session = require('./session')
const app = require('../../mockApp')({ session })

let uuid

test.before(t => sequelize.sync({ force: true }))

test.serial('POST /session/uuid', t => {
  return request(app)
    .post('/session/uuid')
    .send({
      displayName: 'Somebody'
    })
    .then(response => {
      t.is(typeof response.body.uuid, 'string')
      t.is(typeof response.body.token, 'string')
      uuid = response.body.uuid
    })
})

test.serial.skip('POST /session with uuid', t => {
  return request(app)
    .post('/session')
    .send({
      uuid
    })
    .then(response => {
      t.is(typeof response.body.token, 'string')
    })
})
