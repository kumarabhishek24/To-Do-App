var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//connect to database
mongoose.connect('mongodb://jeetesh:jeetesh@ds133311.mlab.com:33311/todo',{useMongoClient : true});

//check the connection
mongoose.connection.once('open',function(){
  console.log('connection has been made');
}).on('error',function(error){
  console.log('connection has error :' + error);
});

//create schema
var todoSchema = new mongoose.Schema({
  item : String
});

var Todo = mongoose.model('Todo',todoSchema);



//var data = [{item : 'get milk'}, {item : 'walk dog'} , {item : 'coding'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo',function(req,res){
  //get data from mongodb
  Todo.find({}).then(function(data){

    res.render('todo' , {todos : data });
  })


});

app.post('/todo', urlencodedParser ,function(req,res){

  //get the data from veiw and push it in mongodb

    var newTodo = Todo(req.body).save().then(function(data){
      res.json(data);
    });

});

app.delete('/todo/:item',function(req,res){
  //delete the data requested
  Todo.findOneAndRemove({item : req.params.item.replace(/\-/g,' ')}).then(function(data){
    res.json(data);
  });

});

};
