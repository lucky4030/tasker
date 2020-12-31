const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const { loginUser , signUpUser , uploadProfilePhoto , getUserDetail , updateUserDetails } = require('./APIs/users');
const { getAllTodos , postOneTodo , deleteTodo , editTodo, getOneTodo } = require('./APIs/todos');

// when we call todos api we get all todo json 
app.get('/todos' , auth , getAllTodos );
//call to read one todo // under construction -> possibility of errors
app.get('/todo/:todoId',auth , getOneTodo );
// call this api to add an todo item to list  
app.post('/todo' , auth , postOneTodo );
// call this api to update a todo item of list
app.put('/todo/:todoId' , auth , editTodo );
// call this api to delete a todo item from ist
app.delete('/todo/:todoId' , auth , deleteTodo );

// call this api to login into app
app.post('/login', loginUser);
// call this api to add mew user 
app.post('/signup' , signUpUser );
// call api to upload photo // currently not working 
app.post('/user/image' , auth , uploadProfilePhoto );
// call api to get user detail
app.get('/user', auth , getUserDetail );
// call api to update user detail
app.post('/user' , auth , updateUserDetails );

exports.api = functions.https.onRequest(app);