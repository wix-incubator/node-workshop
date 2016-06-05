# Exercise #2 - Write the Node server to render the frontend code
In this exercise, you will finish writing the Node server that serves 
the frontend code. The frontend code does not _yet_ persist the todos, 
as the backend code for that is not fully written in this exercise.

You will also rewrite the `db` module to use promises (well, at least a small
part of it).

Now it's time to start writing the web app. This web app will serve the HTML
and client-side JavaScript for the TodoMVC app. This HTML and JavaScript
were copied as-is from 
[Dan Abramov's example code](https://github.com/reactjs/redux/tree/master/examples/todomvc) 
in the redux repo, with minor modifications. (Why React/Redux? Because we love
React and Redux!)

## What you need to do
1. `$ cd 02-exercises/03-todomvc-client`
1. `$ npm install`. The `package.json` has all the packages you need.
   This `npm install` will also build the client code. 
1. Implement the missing functions and tests. 
   Each missing function has a comment describing exactly what to do. 
   Once `npm test` succeeds, you're done.
   The missing code and tests are in:
   * `lib/db.js`: the db code, modified to use Promises.
   * `server.js`: implementation of an express server that serves the HTML
     and client-side JS.
   * `test/render-component-spec.js`: one test is already
     implemented. Implement the other one.
1. If you want to try the app, just do `npm start`, and navigate to 
   http://localhost:3000/. Instead of `npm start`, you can also
   do `npm run start:watch` to enable "hot reloading" of server code.     

## Done?
Continue to [the last exercise](../04-todomvc-server/README.md).   
