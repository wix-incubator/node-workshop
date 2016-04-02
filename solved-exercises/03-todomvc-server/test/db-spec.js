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
    it("adds first todo", Promise.coroutine(function*() {
      yield db.addTodo('aUser', 'hi', 7)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi', id: 7}])
    }))
    
    it("adds second todo", Promise.coroutine(function*() {
      yield db.addTodo('aUser', 'hi', 3)
      yield db.addTodo('aUser', 'bye', 2)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi', id: 3}, {text: 'bye', id: 2}])
    }))
    
    it("adds different todos to different users", Promise.coroutine(function*() {
      yield db.addTodo('aUser', 'hi', 3)
      yield db.addTodo('bUser', 'bye', 2)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi', id: 3}])
      expect(yield db.listTodos('bUser')).to.deep.equal([{text: 'bye', id: 2}])
    }))
    
    it("can add todos with the same text", Promise.coroutine(function*() {
      yield db.addTodo('aUser', 'hi', 2)
      yield db.addTodo('aUser', 'hi', 3)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi', id: 2}, {text: 'hi', id: 3}])
    }))
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
    it("should check an unchecked item", Promise.coroutine(function*() {
      yield db.markTodo('aUser', 0)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi', checked: true, id: 0}])
    }))
        
    it("should uncheck a checked item", Promise.coroutine(function*() {
      yield db.markTodo('aUser', 0)
      yield db.markTodo('aUser', 0)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi', checked: false, id: 0}])
    }))
    
    it("shouldn't touch other items", Promise.coroutine(function*() {
      yield db.addTodo('aUser', 'bye', 1)
      yield db.markTodo('aUser', 1)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi', id: 0}, {text: 'bye', checked: true, id: 1}])
    }))
  })
  
  describe("renameTodo", function() {
    beforeEach(() => 
      db.addTodo('aUser', 'hi', 0)
    )
    it("should rename an unchecked item", Promise.coroutine(function*() {
      yield db.renameTodo('aUser', 'bye', 0)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'bye', id: 0}])
    })) 
    
    it("shouldn't touch other items", Promise.coroutine(function*() {
      yield db.addTodo('aUser', 'bye', 1)
      yield db.renameTodo('aUser', 'aye', 0)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'aye', id: 0}, {text: 'bye', id: 1}])
    }))
  })
  
  describe("listTodo", function() {
    it("should list an empty list from the beginning", Promise.coroutine(function*() {
      expect(yield db.listTodos('aUser')).to.deep.equal([])
    }))
  })
})