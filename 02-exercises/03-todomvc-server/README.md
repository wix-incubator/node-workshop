# Exercise #3 - Persistent TodoMVC is done 
In this exercise, you will add to the server code by writing the Ajax handlers 
that will enable persistence of the todos, thus completing the web app.
  
As discussed in the previous exercises, the db module here is fully written 
and tested, so even if you didn't finish the previous exercise, we've taken
care of you. Same goes for the server - it's written so that it already serves
the client-side HTML and JS. 

In this exercise, you will extend the server you wrote in the previous exercise
so that it handles the Ajax calls that the front-end code invokes to persist
the todos.

Once this is done, you will have a fully functional Todo app, and refreshing
the page will not reset the todos - they will persist.

## What you need to do
1. `$ cd 02-exercises/03-todomvc-server`
1. `$ npm install`. The `package.json` probably has all the packages you need,
   but if you want more, feel free to add them using `npm install --save`.
   This `npm install` will also "npm install" the client code. 
   If you need to change the client code (and you don't), 
   just run `npm run client-build` again to rebuild the `bundle.js`. 
1. Implement the missing functions and tests. 
   Each missing function has a comment describing exactly what to do. 
   Once `npm test` succeeds, you're done.
   The missing code and tests are in:
   * `server.js`: implementation of the ajax controllers needed by the client.
   * `test/db-component-spec.js`: implement the tests that 
      check the ajax controllers.
1. `$ npm test`. You will see some tests fail. 
   These are tests for the code you will write. Besides
   the same tests that were in exercise #2 (modified for persistence), you will
   also have to write the tests in 
   * `db-component-spec.js`: the tests that raise the app and 
     check that the ajax controllers function properly.
1. If you want to try the app, just do `npm start`, and navigate to 
   http://localhost:3000/. Instead of `npm start`, you can also
   do `npm run start:watch` to enable "hot reloading" of server code.     

## Done?
Congratulations. You're a NodeJS developer, and on your way to become
a NodeJS Ninja Rockstar!
