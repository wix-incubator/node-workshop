"use strict"
const Promise = require('bluebird')
const expect = require('chai').expect
const app = require('../server')
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

describe("db server", function() {
  const serverPort = 3001
  let server
  
  before(done => {
    server = app.listen(serverPort, done)
  })
  
  after(done => {
    server.close(done)
  })
  beforeEach((done) => 
    fs.unlink(path.join(__dirname, '../data/user-todo.json'), err => 
      !err || err.code === 'ENOENT' ? done() : done(err)))
  
  it("adds todo correctly", Promise.coroutine(function*() {
    /**
     * Add a todo using the add todo controller (see server.js).
     * Then use the list todo controller to verify that it was added
     */
    expect(1).to.equal(2)
  }))
  
  it("deletes todo correctly", Promise.coroutine(function*() {
    /**
     * Add a todo using the add todo controller (see server.js).
     * Then delete it.
     * Then use the list todo controller to verify that it was deleted
     */
    expect(1).to.equal(2)
  }))
  
  it("marks todo correctly", Promise.coroutine(function*() {
    /**
     * Add a todo using the add todo controller (see server.js).
     * Then mark it as complete
     * Then use the list todo controller to verify that it was marked
     */
    expect(1).to.equal(2)
  }))
  
  it("rename todo correctly", Promise.coroutine(function*() {
    /**
     * Add a todo using the add todo controller (see server.js).
     * Then rename it
     * Then use the list todo controller to verify that it was renamed
     */
    expect(1).to.equal(2)
  }))
})