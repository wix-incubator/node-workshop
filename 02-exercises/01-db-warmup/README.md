# Exercise #1 - Warming up by writing a small part of the db module
In this exercise, you will be writing oen function (`addTodo`) in the database 
module that will be used by the server to store and manipulate the todos.

Given the nature of the workshop, we will be using a simple file to store the
data, and won't be giving any thought whatsoever to concurrency: 
the addTodo function in the module will read the file, add a todo to 
the arrays of todos, and then write it back.

(This would _never_ pass in real code, but it's OK for a
workshop. Also, error handling is completely ignored and errors will be passed
on to the caller.)

This module uses the classic "factory" pattern of many JS modules,
in order to avoid any use of classes (e.g. avoid the use of `new` and `this`).
In this pattern, what is exported by the module is just a function,
that when called, creates an object with the functions needed.

This factory function accepts one parameter - the folder for the "database
files" - and returns an object with the methods that comprise the module.

All database functions receive a `userId` as the first parameter. This is 
so that each user will get their own todos. This is implemented as a separate
file for each user, named by the `userId`.

The db module in this exercise will use callbacks for async calling.

## What you need to do
1. `$ cd 02-exercises/01-db-warmup`
1. `$ npm install`. The `package.json` probably has all the packages you need,
   but if you want more, feel free to add them using `npm install --save`.
1. `$ npm test`. You will see only one test running, because
   it is defined as `it.only`. 
1. You should write the code for `addTodo` in `lib/db.js` to make the single 
   test pass. 
     
## Done?
Continue to [next exercise](../02-db/README.md).   

