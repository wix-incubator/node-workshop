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
      yield db.addTodo('aUser', 'hi')
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi'}])
    }))
    
    it("adds second todo", Promise.coroutine(function*() {
      yield db.addTodo('aUser', 'hi')
      yield db.addTodo('aUser', 'bye')
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi'}, {text: 'bye'}])
    }))
    
    it("adds different todos to different users", Promise.coroutine(function*() {
      yield db.addTodo('aUser', 'hi')
      yield db.addTodo('bUser', 'bye')
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi'}])
      expect(yield db.listTodos('bUser')).to.deep.equal([{text: 'bye'}])
    }))
    
    it("can add todos with the same text", Promise.coroutine(function*() {
      yield db.addTodo('aUser', 'hi')
      yield db.addTodo('aUser', 'hi')
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi'}, {text: 'hi'}])
    }))
  })
  
  describe("deleteTodo", function() {
    it("can delete the only existing todo", () => 
      db.addTodo('aUser', 'hi')
      .then(() => db.deleteTodo('aUser', 0))
      .then(() => db.listTodos('aUser'))
      .then((todos) => expect(todos).to.be.empty))

    it("can delete only the first todo", () => 
      db.addTodo('aUser', 'hi')
      .then(() => db.addTodo('aUser', 'bye'))
      .then(() => db.deleteTodo('aUser', 0))
      .then(() => db.listTodos('aUser'))
      .then((todos) => expect(todos).to.deep.equal([{text: 'bye'}])))

    it("can delete only the last todo", () => 
      db.addTodo('aUser', 'hi')
      .then(() => db.addTodo('aUser', 'bye'))
      .then(() => db.deleteTodo('aUser', 1))
      .then(() => db.listTodos('aUser'))
      .then((todos) => expect(todos).to.deep.equal([{text: 'hi'}])))

    it("can delete only the middle todo", () => 
      db.addTodo('aUser', 'hi')
      .then(() => db.addTodo('aUser', 'middle'))
      .then(() => db.addTodo('aUser', 'bye'))
      .then(() => db.deleteTodo('aUser', 1))
      .then(() => db.listTodos('aUser'))
      .then((todos) => expect(todos).to.deep.equal([{text: 'hi'}, {text: 'bye'}])))
  })
  
  describe("markTodo", function() {
    beforeEach(() => 
      db.addTodo('aUser', 'hi')
    )
    it("should check an unchecked item", Promise.coroutine(function*() {
      yield db.markTodo('aUser', 0, true)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi', checked: true}])
    }))
    
    it("should check a checked item", Promise.coroutine(function*() {
      yield db.markTodo('aUser', 0, true)
      yield db.markTodo('aUser', 0, true)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi', checked: true}])
    }))
    
    it("should uncheck a checked item", Promise.coroutine(function*() {
      yield db.markTodo('aUser', 0, true)
      yield db.markTodo('aUser', 0, false)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi', checked: false}])
    }))
    
    it("should uncheck an unchecked item", Promise.coroutine(function*() {
      yield db.markTodo('aUser', 0, false)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi', checked: false}])
    }))
    
    it("shouldn't touch other items", Promise.coroutine(function*() {
      yield db.addTodo('aUser', 'bye')
      yield db.markTodo('aUser', 1, true)
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'hi'}, {text: 'bye', checked: true}])
    }))
  })
  
  describe("renameTodo", function() {
    beforeEach(() => 
      db.addTodo('aUser', 'hi')
    )
    it("should rename an unchecked item", Promise.coroutine(function*() {
      yield db.renameTodo('aUser', 0, 'bye')
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'bye'}])
    })) 
    
    it("shouldn't touch other items", Promise.coroutine(function*() {
      yield db.addTodo('aUser', 'bye')
      yield db.renameTodo('aUser', 0, 'aye')
      
      expect(yield db.listTodos('aUser')).to.deep.equal([{text: 'aye'}, {text: 'bye'}])
    }))
  })
  
  describe("listTodo", function() {
    it("should list an empty list from the beginning", Promise.coroutine(function*() {
      expect(yield db.listTodos('aUser')).to.deep.equal([])
    }))
  })
})