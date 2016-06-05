# Exercises
The exercises are the real reason you are in this workshop. The talks we give at the
beginning? Bah, Humbug! These exercises are what will turn you into a
real NodeJS programmer.

There are three exercises, in which we will gradually build a TodoMVC app.
Yes, I know, you're fed up with TodoMVC, but, hey, it's well known, and not
by chance did it succeed as a "canonical app". Obviously, you don't need to 
concern yourself with the client part (which we will give to you) - 
you will write only the server code of this web app.

The exercises are built so that each exercise takes about an hour. If you are
done sooner, feel free to continue on to the next exercise, or use the time
for a well deserved break from coding! On the other hand, if you did 
not finish in time, fear not! The next exercise starts from scratch, but with
the code of the previous exercise already built in. So even if you did 50% of
the exercise, you can continue in the next hour with the next exercise without
any problem.

The full "solutions" of the exercises are in 
[03-solved-exercises](../03-solved-exercises/README.md), but 
try not to look at them, OK? Yes, you can copy from them, but in that case,
you're just cheating yourself, so what's the point? Peeking at them, on the 
other hand, is all right, especially if the instructor is busy and can't
help you.

## The Exercises
* [*Warmup exercise*](01-db-warmup/README.md): In this exercise, 
  you will be writing one function in the database module (that will be used
  by the server to store and manipulate the todos), and make one test succeed.
* [*Write the db module*](02-db/README.md): In this exercise, 
  you will be writing the rest of database module that will be used
  by the server to store and manipulate the todos.
* [*Serve the front-end code*](02-todomvc-client/README.md): 
  In this exercise, you will write the Node server
  that serves the frontend code. The frontend code does not _yet_ persist the 
  todos, as the backend code for that is not fully written in this exercise.
* [*Enable persistence of todos*](03-todomvc-server/README.md): 
  In this exercise, you will write the Ajax
  handlers that will enable persistence of the todos, 
  thus completing the web app.
  
*Important*: If you have network problems during `npm install`, 
you should run `$ npm config set cache-min 99999`.
This will force npm to use the network as little as possible, and if you 
already did the setup instructions, then you should have all the modules 
you need in the cache.

Don't forget at the end of the workshop to do `$ npm config delete cache-min`  

## Done Reading This?
So start with the [first exercise](01-db-warmup/README.md)!   
