# Exercise #2 - Write the Node server to render the frontend code
In this exercise, you will write the Node server that serves the frontend code. 
The frontend code does not _yet_ persist the todos, 
as the backend code for that is not fully written in this exercise.

As discussed in the previous exercise, the db module here is fully written 
and tested, so even if you didn't finish the previous exercise, we've taken
care of you.

Now it's time to start writing the web app. This web app will serve the HTML
and client-side JavaScript for the TodoMVC app. This HTML and JavaScript
were copied as-is from 
[Dan Abramov's example code](https://github.com/reactjs/redux/tree/master/examples/todomvc) 
in the redux repo, with minor modifications. (Why React/Redux? Because we love
React and Redux and we think it's the future!)

## What you need to do
1. `$ cd 02-exercises/02-todomvc-client`
1. `$ npm install`. The `package.json` probably has all the packages you need,
   but if you want more, feel free to add them using `npm install --save`.
   This `npm install` will also "npm install" the client code. 
   If you need to change the client code (and you don't), 
   just run `npm run client-build` again to rebuild the `bundle.js`. 
1. `$ npm test`. You will see most tests fail. 
   These are tests for the code you will write. Some of them
   are written, and some you need to write yourself. There are three tests:
   * `render-component-spec.js`: the tests that raise the app and 
     check that it serves the HTML and JS correctly.
   * `db-spec.js`: you've already written that in the previous exercise, 
      so no need to do anything here. 
   * `e2e-spec.js`: the end to end tests that run the server as a command line
     and tests is using a headless browser (ZombieJS), 
     and so can also test the client-side cod. 
     These tests are fully written for you,
     but feel free to read them to understand how to write E2E tests.
1. Implement the missing functions and tests. 
   Each missing function has a comment describing exactly what to do. 
   Once `npm test` succeeds, you're done.
   The missing code and tests are in:
   * `server.js`: implementation of an express server that serves the HTML
     and client-side JS.
   * `test/render-component-spec.js`: implement the two tests
     needed to check the serving of the HTML and CSS.
1. If you want to try the app, just do `npm start`, and navigate to 
   http://localhost:3000/. Instead of `npm start`, you can also
   do `npm start:watch` to enable "hot reloading" of server code.     

## Done?
Continue to [the last exercise](../03-todomvc-server/README.md).   
