### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  Callbacks.
  Promises.
  Async/await.
  Event Listeners.

- What is a Promise?
    A promise represents a value that may not be available yet but will be resolved in the future. 

<!-- -------------------- -->
- What are the differences between an async function and a regular function?
Refular Function:
  - A regular function returns a value immediately and executes synchronously, which means that it blocks the event loop until it is finished.
  - Errors are typically handled using try/catch blocks.
  - They are executed in a linear, top-to-bottom order.

Async Function: 
  - Returns a promise that resolves with the returned value or rejects with an error.
  - Executes asynchronously, which means that it allows the event loop to continue running while it performs its work in the background.
  - Errors are typically handled using try/catch blocks or by attaching a catch method to the returned promise.
  - Async functions use promises and the await keyword.
<!-- ------------------------ -->
- What is the difference between Node.js and Express.js?
  Express is a web application framework for Node that provides a set of features and tools for building web applications and APIs.
  Node is a runtime environment for running JavaScript code outside of a web browser.

- What is the error-first callback pattern?
    In and error-first callback pattern the error object is always the first argument passed to the callback function, and if there is no error, the first argument is null or undefined.

- What is middleware?
    It executes between a client and a server.
    Express middleware functions are functions that take three arguments: the request object (req), the response object (res), and a next function. 

- What does the `next` function do?
    It is a callback function that is passed to middleware functions to pass control to the next middleware function in the chain.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

  The getUsers() function makes three separate HTTP requests to the GitHub API, and each request is executed sequentially using the await keyword. This means that the function will take a long time to execute, as each request must wait for the previous request to complete before it can be executed.
  Requests should be executed concurrently using a Promise.all() or other asynchronous method to avoid blocking.
  The names of the elie, joel, and matt variables are not very descriptive and may be confusing to developers who are not familiar with the code. Better names could be used to make the code more readable and easier to understand.
  If one of the API requests fails, the function will throw an error and the remaining requests will not be executed.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
here is an example of how the code could be improved

```js
async function getUsers() {
  try {
    const [user1, user2, user3] = await Promise.all([
      $.getJSON('https://api.github.com/users/elie'),
      $.getJSON('https://api.github.com/users/joelburton'),
      $.getJSON('https://api.github.com/users/mmmaaatttttt')
    ]);

    return [user1, user2, user3];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch users');
  }
}