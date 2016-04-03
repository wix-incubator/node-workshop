"use strict"
const Promise = require('bluebird')
const path = require('path')

module.exports = (fileLocation) => {
  const userFilePath = userId => path.join(fileLocation, `${userId}-todo.json`)
  const readUserFile = Promise.coroutine(function*(userId) {
    /*
    ** `readUserFile` should read the user file (in userFilePath(userId)),
    ** and return the json inside it (already parsed, of course)
    ** Don't forget that the file may not exist, and if it does
    ** not, you should still return an empty list of todos
    */
  })
  
  const writeUserFile = Promise.coroutine(function*(userId, todos) {
    yield fs.writeFileAsync(userFilePath(userId), JSON.stringify(todos))
  })
  
  const findIndex = (todos, id) => todos.findIndex(element => element.id === id)
  
  return {
    addTodo: undefined
      /**
       * `addTodo(userId, text, id)` should read the file, add the todo at the end of the list
       * of todos, then write the file.
       * The todo should be in the structure {text, id}
       * Write it coroutine style
       */
    ,
    
    deleteTodo: undefined 
      /**
       * `deleteTodo(userId, id)` should read the file, remove the todo
       * with the id `id`, and write the file.
       * Write it coroutine style
       */
    ,
    
    markTodo(userId, id) {
    /**
     * `markTodo(userId, id)` should read the file, toggle the `checked` flag
     * of the todo with the id `id, and write the file.
     * Write it Promise style.
     */
    },
    
    listTodos(userId) {
      return readUserFile(userId)
    },
    
    renameTodo: undefined
    /**
     * `renameTodo(userId, text, id)` should read the file, change the `text` flag
     * of the todo with the id `id, and write the file.
     * Write it in whatever style you want
     */
  }
}
