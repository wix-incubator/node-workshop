"use strict"
const Promise = require('bluebird')
const expect = require('chai').expect
const dbFactory = require('../lib/db')
const tmp = require('tmp')

describe("db", function() {
  let db
  beforeEach(done => {
    tmp.dir((err, path) => {
      db = dbFactory(path)
      done()     
    })
  })
  
  describe("addTodo", function() {
    it("adds first todo", () =>
      db.addTodo('aUser', 'hi', 7)
        .then(() => db.listTodos('aUser'))
        .then((todos) => expect(todos).to.deep.equal([{text: 'hi', id: 7}]))
    )
    
    it("adds second todo", () => 
      db.addTodo('aUser', 'hi', 3)
        .then(() => db.addTodo('aUser', 'bye', 2))
        .then(() => db.listTodos('aUser'))
        .then((todos) => 
          expect(todos).to.deep.equal(
            [{text: 'hi', id: 3}, {text: 'bye', id: 2}]))
    )
    
    it("adds different todos to different users", () =>
      db.addTodo('aUser', 'hi', 3)
        .then(() => db.addTodo('bUser', 'bye', 2))
        .then(() => Promise.all([db.listTodos('aUser'), db.listTodos('bUser')]))
        .then(([todosA, todosB]) => {
          expect(todosA).to.deep.equal(
            [{text: 'hi', id: 3}])
          expect(todosB).to.deep.equal(
            [{text: 'bye', id: 2}])
        })
    )
    
    it("can add todos with the same text", () =>
      db.addTodo('aUser', 'hi', 2)
        .then(() => db.addTodo('aUser', 'hi', 3))
        .then(() => db.listTodos('aUser'))
        .then((todos) => 
          expect(todos).to.deep.equal(
            [{text: 'hi', id: 2}, {text: 'hi', id: 3}]))
    )
  })
  
  describe("deleteTodo", function() {
    it("can delete the only existing todo", () => 
      db.addTodo('aUser', 'hi', 7)
        .then(() => db.deleteTodo('aUser', 7))
        .then(() => db.listTodos('aUser'))
        .then((todos) => expect(todos).to.be.empty))

    it("can delete only the first todo", () => 
      db.addTodo('aUser', 'hi', 2)
        .then(() => db.addTodo('aUser', 'bye', 3))
        .then(() => db.deleteTodo('aUser', 2))
        .then(() => db.listTodos('aUser'))
        .then((todos) => expect(todos).to.deep.equal([{text: 'bye', id: 3}])))

    it("can delete only the last todo", () => 
      db.addTodo('aUser', 'hi', 2)
        .then(() => db.addTodo('aUser', 'bye', 3))
        .then(() => db.deleteTodo('aUser', 3))
        .then(() => db.listTodos('aUser'))
        .then((todos) => expect(todos).to.deep.equal([{text: 'hi', id: 2}])))

    it("can delete only the middle todo", () => 
      db.addTodo('aUser', 'hi', 2)
        .then(() => db.addTodo('aUser', 'middle', 17))
        .then(() => db.addTodo('aUser', 'bye', 3))
        .then(() => db.deleteTodo('aUser', 17))
        .then(() => db.listTodos('aUser'))
        .then((todos) => expect(todos).to.deep.equal([{text: 'hi', id: 2}, {text: 'bye', id: 3}])))
  })
  
  describe("markTodo", function() {
    beforeEach(() => 
      db.addTodo('aUser', 'hi', 0)
    )
    
    it("should check an unchecked item", () =>
      db.markTodo('aUser', 0)
        .then(() => db.listTodos('aUser'))
        .then((todos) =>
          expect(todos).to.deep.equal([{text: 'hi', checked: true, id: 0}]))
    )
        
    it("should uncheck a checked item", () =>
      db.markTodo('aUser', 0)
        .then(() => db.markTodo('aUser', 0))
        .then(() => db.listTodos('aUser'))
        .then((todos) =>
          expect(todos).to.deep.equal([{text: 'hi', checked: false, id: 0}]))
    )
    
    it("shouldn't touch other items", () =>
      db.addTodo('aUser', 'bye', 1)
        .then(() => db.markTodo('aUser', 1))
        .then(() => db.listTodos('aUser'))
        .then((todos) =>
          expect(todos).to.deep.equal(
            [{text: 'hi', id: 0}, {text: 'bye', checked: true, id: 1}]))
    )
  })
  
  describe("renameTodo", function() {
    beforeEach(() => 
      db.addTodo('aUser', 'hi', 0)
    )
    
    it("should rename an unchecked item", () =>
      db.renameTodo('aUser', 'bye', 0)
        .then(() => db.listTodos('aUser'))
        .then((todos) =>
          expect(todos).to.deep.equal([{text: 'bye', id: 0}]))
    ) 
    
    it("shouldn't touch other items", () =>
      db.addTodo('aUser', 'bye', 1)
        .then(() => db.renameTodo('aUser', 'aye', 0))
        .then(() => db.listTodos('aUser'))
        .then((todos) =>
          expect(todos).to.deep.equal(
            [{text: 'aye', id: 0}, {text: 'bye', id: 1}]))
    )
  })
  
  describe("listTodo", function() {
    it("should list an empty list from the beginning", () =>
      db.listTodos('aUser')
        .then((todos) => expect(todos).to.deep.equal([]))
    )
  })
})