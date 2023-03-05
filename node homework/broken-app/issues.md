# Broken App Issues
- line 2
    axios needs to be imported using require for it to work in this code.
    
- line 7
    results is an array of promises that need to be resolved using Promise.all before mapping over the response data.

- line 12
    The response should use res.json() instead of res.send(JSON.stringify()).

- line 13
    The catch block needs to have an argument to reference the caught error. For example, you could use catch(err) to reference the error.