"use strict"
const Promise = require('bluebird')
const fs = require('fs')
Promise.promisifyAll(fs)
const path = require('path')
const _ = require('lodash')

module.exports = (fileLocation) => {
  const userFilePath = userId => path.join(fileLocation, `${userId}-todo.json`)
  const readUserFile = (userId) => 
    fs.readFileAsync(userFilePath(userId))
      .then((content) => JSON.parse(content))
      .catch((err) => err.code == 'ENOENT' ? [] : Promise.reject(err))
  
  const writeUserFile = (userId, todos) => 
    fs.writeFileAsync(userFilePath(userId), JSON.stringify(todos))
  
  const findIndex = (todos, id) => todos.findIndex(element => element.id === id)
  
  return {
    addTodo(userId, text, id) {
      return readUserFile(userId)
        .then((todos) => writeUserFile(userId, todos.concat({text, id})))
    },
    
    deleteTodo(userId, id) {
      return readUserFile(userId)
        .then((todos) => {
          todos.splice(findIndex(todos, id), 1)
          return writeUserFile(userId, todos)          
        })
    },
    
    markTodo(userId, id) {
      return readUserFile(userId)
        .then(todos => {
          const todo = todos[findIndex(todos, id)]
          todo.checked = !todo.checked
          return writeUserFile(userId, todos)
        })
    },
    
    listTodos(userId) {
      return readUserFile(userId)
    },
    
    renameTodo(userId, text, id) {
      return readUserFile(userId)
        .then(todos => {
          todos[findIndex(todos, id)].text = text
          return writeUserFile(userId, todos)
        })
    }
  }
}
