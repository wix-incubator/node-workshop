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

  const addTodo = (text, id) => 
    fetch(`http://localhost:${serverPort}/api/todos/${id}?text=${text}`, 
        {method: 'POST'})
    .then((response) => response.ok ? 
      response.text() : 
      Promise.reject(new Error("cannot add"))) 

  const listTodo = () => 
    fetch(`http://localhost:${serverPort}/api/todos`)
    .then((response) => response.ok ? 
      response.json() : 
      Promise.reject(new Error("cannot list")))
      
  const deleteTodo = (id) =>  
    fetch(`http://localhost:${serverPort}/api/todos/${id}`, {method: 'DELETE'})
    .then((response) => response.ok ? 
      response.text() : 
      Promise.reject(new Error("cannot delete")))
      
  const markTodo = (id) =>  
    fetch(`http://localhost:${serverPort}/api/todos/${id}/complete`, {method: 'PUT'})
    .then((response) => response.ok ? 
      response.text() : 
      Promise.reject(new Error("cannot delete")))
      
  const renameTodo = (text, id) =>  
    fetch(`http://localhost:${serverPort}/api/todos/${id}?text=${text}`, 
        {method: 'PUT'})
    .then((response) => response.ok ? 
      response.text() : 
      Promise.reject(new Error("cannot delete")))
  
  it("adds todo correctly", () =>
    addTodo('hi', 3)
      .then(() => listTodo())
      .then((todos) => expect(todos).to.deep.equal([{text: 'hi', id: 3}]))
  )
  
  it("deletes todo correctly", () =>
    addTodo('hi', 3)
      .then(() => deleteTodo(3))
      .then(() => listTodo())
      .then((todos) => expect(todos).to.deep.equal([]))
  )
  
  it("marks todo correctly", () =>
    addTodo('hi', 3)
      .then(() => markTodo(3))
      .then(() => listTodo())
      .then((todos) => 
        expect(todos).to.deep.equal([{text: 'hi', id: 3, checked: true}]))
  )
  
  it("rename todo correctly", () =>
    addTodo('hi', 3)
      .then(() => renameTodo('bye', 3))
      .then(() => listTodo())
      .then((todos) => 
        expect(todos).to.deep.equal([{text: 'bye', id: 3}]))
  )
})