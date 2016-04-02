"use strict"
const Promise = require('bluebird')
const fs = require('fs')
Promise.promisifyAll(fs)
const path = require('path')
const _ = require('lodash')

module.exports = (fileLocation) => {
  const userFilePath = userId => path.join(fileLocation, `${userId}-todo.json`)
  const readUserFile = Promise.coroutine(function*(userId) {
    try {
      const content = yield fs.readFileAsync(
        userFilePath(userId))
        
      return JSON.parse(content)
    }
    catch (e) {
      if (e.code === 'ENOENT')
        return [];
      throw e;
    }          
  })
  
  const writeUserFile = Promise.coroutine(function*(userId, todos) {
    yield fs.writeFileAsync(userFilePath(userId), JSON.stringify(todos))
  })
  
  const findIndex = (todos, id) => todos.findIndex(element => element.id === id)
  
  return {
    addTodo: Promise.coroutine(function*(userId, text, id) {
      const todos = yield readUserFile(userId)
      
      yield writeUserFile(userId, todos.concat({text, id})) 
    }),
    
    deleteTodo: Promise.coroutine(function*(userId, id) {
      const todos = yield readUserFile(userId)
      todos.splice(findIndex(todos, id), 1)
      yield writeUserFile(userId, todos) 
    }),
    
    markTodo(userId, isChecked, id) {
      return readUserFile(userId)
        .then(todos => {
          todos[findIndex(todos, id)].checked = isChecked
          return todos 
        }).then(todos => 
          writeUserFile(userId, todos))
    },
    
    listTodos(userId) {
      return readUserFile(userId)
    },
    
    renameTodo: Promise.coroutine(function*(userId, text, id) {
      const todos = yield readUserFile(userId)
      
      todos[findIndex(todos, id)].text = text
      
      yield writeUserFile(userId, todos)       
    })
  }
}
