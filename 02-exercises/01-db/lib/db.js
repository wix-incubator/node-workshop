"use strict"
const path = require('path')

module.exports = (fileLocation) => {
  const userFilePath = userId => path.join(fileLocation, `${userId}-todo.json`)
  const readUserFile = (userId, cb) => {
    /*
    ** `readUserFile` should read the user file (in userFilePath(userId)),
    ** and return the json inside it (already parsed, of course) using 
    ** a callback. Don't forget that the file may not exist, and if it does
    ** not, you should still call the callback with an empty list of todos
    */
  }
  
  const writeUserFile = (userId, todos, cb) =>
    fs.writeFile(userFilePath(userId), JSON.stringify(todos), cb)
  
  const findIndex = (todos, id) => todos.findIndex(element => element.id === id)
  
  return {
    addTodo: undefined
      /**
       * `addTodo(userId, text, id, cb)` should read the file, 
       * add the todo at the end of the list
       * of todos, then write the file.
       * The todo should be in the structure {text, id}.
       * Write it using callbacks.
       */
    ,
    
    deleteTodo: undefined 
      /**
       * `deleteTodo(userId, id, cb)` should read the file, remove the todo
       * with the id `id`, and write the file.
       * Write it using callbacks.
       */
    ,
    
    markTodo(userId, id, cb) {
    /**
     * `markTodo(userId, id, cb)` should read the file, toggle the `checked` flag
     * of the todo with the id `id, and write the file.
       * Write it using callbacks.
     */
    },
    
    listTodos(userId, cb) {
      return readUserFile(userId, cb)
    },
    
    renameTodo(userId, text, id, cb) {
      readUserFile(userId, (err, todos) => {
        if (err)
          return cb(err)
          
        todos[findIndex(todos, id)].text = text
        
        writeUserFile(userId, todos, cb)
      })
    }
  }
}
