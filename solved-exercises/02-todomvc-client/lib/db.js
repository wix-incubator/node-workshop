"use strict"
const Promise = require('bluebird')
const fs = require('fs')
Promise.promisifyAll(fs)
const path = require('path')

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
  
  return {
    addTodo: Promise.coroutine(function*(userId, text) {
      const todos = yield readUserFile(userId)
      
      yield writeUserFile(userId, todos.concat({text})) 
    }),
    
    deleteTodo: Promise.coroutine(function*(userId, index) {
      const todos = yield readUserFile(userId)
      todos.splice(index, 1)
      yield writeUserFile(userId, todos) 
    }),
    
    markTodo(userId, index, isChecked) {
      return readUserFile(userId)
        .then(todos => {
          todos[index].checked = isChecked
          return todos 
        }).then(todos => 
          writeUserFile(userId, todos))
    },
    
    listTodos(userId) {
      return readUserFile(userId)
    },
    
    renameTodo: Promise.coroutine(function*(userId, index, text) {
      const todos = yield readUserFile(userId)
      
      todos[index].text = text
      
      yield writeUserFile(userId, todos)       
    })
  }
}
