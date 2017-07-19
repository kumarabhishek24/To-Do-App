var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//setting the view engine
app.set('view engine','ejs');

//use static files
app.use(express.static('./public'));

//fire controller
todoController(app);

//listen to port
app.listen(3000);
console.log('Server Running at port 3000');
