# Exercise #1 - Write the db module
In this exercise, you will be writing the database module that will be used
by the server to store and manipulate the todos.

Given the nature of the workshop, we will be using a simple file to store the
data, and won't be giving any thought whatsoever to concurrency: 
each function in the module will read the file, manipulate the todos,
and then write it.

(This would _never_ pass in real code, but it's OK for a
workshop. Also, error handling is completely ignored and errors will be passed
on to the caller.)

This module also uses the classic "factory" pattern of many JS modules,
in order to avoid any use of classes (e.g. avoid the use of `new` and `this`).
In this pattern, what is exported by the module is just a function,
that when called, creates an object with the functions needed.

This factory function accepts one parameter - the folder for the "database
files" and returns an object with the methods that will be needed 
in the future.

All database functions receive a `userId` as the first parameter. This is 
so that each user will get their own todos. This is implemented as a separate
file for each user, named by the `userId`.

## What you need to do
1. `$ cd 02-exercises/01-db`
1. `$ npm install`. The `package.json` probably has all the packages you need,
   but if you want more, feel free to add them using `npm install --save`.
1. `$ npm test`. You will see most tests fail. 
   These are tests for the code you will write. Some of them
   are written, and some you need to write yourself. 
1. Implement the missing functions and tests. Each missing function has a comment
   describing exactly what to do. Once `npm test` succeeds, you're done.
   The missign code and tests are in:
   * `lib/db.js`
   * `test/db-spec.js`
   * I would suggest writing the code piecemeal-wise. Start by writing `addTodo`
     and writing the tests for `addTodo`, and fixing them till they succeed. 
     Once you have that, the rest of the code will be easy peasy.   

