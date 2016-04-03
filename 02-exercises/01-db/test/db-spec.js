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
      /**
       * This test should add a todo and check that listTodo returns it
       */
      expect(1).to.equal(2)
    }))
    
    it("adds second todo", Promise.coroutine(function*() {
      /**
       * This test should adds two todos and check that listTodo returns them
       */
      expect(1).to.equal(2)
    }))
    
    it("adds different todos to different users", Promise.coroutine(function*() {
      /**
       * This test should add a todo to two different users and check that 
       * listTodo returns them for each user 
       */
      expect(1).to.equal(2)      
    }))
    
    it("can add todos with the same text", Promise.coroutine(function*() {
      /**
       * This test should add two todos with the same text and check that 
       * listTodo returns them (unmerged, of course)
       */
      expect(1).to.equal(2)
    }))
  })
  
  describe("deleteTodo", function() {
    it("can delete the only existing todo", () =>
      /** 
       * This test creates a todo, deletes it, and checks that 
       * listTodo returns an empty list.
       * Write it Promise Style.
       * */
      expect(1).to.equal(2)
    )

    it("can delete only the first todo", () => 
      /** 
       * This test creates two todos, deletes the first, and checks that 
       * listTodo returns only the second.
       * Write it Promise Style.
       * */
      expect(1).to.equal(2)
    )

    it("can delete only the last todo", () => 
      /** 
       * This test creates two todos, deletes the last, and checks that 
       * listTodo returns only the first.
       * Write it Promise Style.
       * */
      expect(1).to.equal(2)
    )

    it("can delete only the middle todo", () => 
      /** 
       * This test creates three todos, deletes the middle one, and checks that 
       * listTodo returns the first and last.
       * Write it Promise Style.
       * */
      expect(1).to.equal(2)
    )
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