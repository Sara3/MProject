var connect = require('connect');
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen(3000, function(){
  console.log('Server running on 3000...');

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbase = db.db("myDatabase")
  console.log("Database created!");

  dbase.createCollection("gists", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");



    //Post gist
    function postGist() {
      var gistObj = {sub: "file name", desc: "file description"}
      dbase.collection("gists").insertOne(gistObj, function(err, res) {
        if (err) throw err; 
        console.log("1 document inserted")
      })
    }




    //Get gist 
    function getGist() {
      dbase.collection("gists").find({}).toArray(function(err, res){
        if(err) throw err
        console.log("--------------------")
        console.log(res)
        console.log("--------------------")
      })
    }




    //Update gist 
    function updateGist() {
      var myquery = { desc: "file description" };
      var newvalues = { $set: {desc: "new file description"} };
      dbase.collection("gists").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
      })
    }

    //Delete gist
    function deleteGist() {
      dbase.collection("gists").deleteOne({desc: "new file description"}, function(err, obj) {
        if (err) throw err
        console.log("1 doc deleted")
      })
    }

    
    




    db.close();   //close method has also been moved to client obj
  });
}); 







});