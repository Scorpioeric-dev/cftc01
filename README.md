# Instructions
## Installation

npm i to install dependencies.


## Usage


To run create an env file with PORT and SESSION_SECRET VARIABLES or define the variables in the server.js file.

Example of env file variables.

```javaScript
SESSION_SECRET = 'ANY RANDOM STRING'
PORT = INSERT PORT NUMBER HERE
```

# Steps

1. Run Nodemon to start the server.
2. Input JSON and hit the register endpoint * Emails are unique *
```javaScript
 {
        "email": "dj74445@test.com",
        "password": "test1",
        "phone": 8444123213
    }
```
You are able to create up to 3 different users who get their own unique events when hitting the login endpoint.

3. Input JSON and hit the login endpoint, hit it multiple times to create multiple login events. You can login with three users at once and they will all get their unique user session with unique events.
```javaScript
 {
        "email": "dj74445@test.com",
        "password": "test1"
    }
```
4. Hit the get session endpoint to receive all the data that satisfies the use cases listed in the challenge. 
