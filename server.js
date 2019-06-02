var express=require('express')
var fs=require('fs')
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);
  
    // Pass to next layer of middleware
    next();
  });
  var server = app.listen(3003);

  app.post("/fileoperation", function(request, response) {
    var id=request.body.id;
    var fileName=request.body.fileName;
   
    if(id==1)
    {
        if(fileName==null)
        {
            response.send("File Name is required");
        }
        fs.writeFile(fileName,'Data saved',function(err){
            if(err) throw err;
            console.log('File saved')
            response.send('File saved')
        })
    }
    if(id==2)
    {
        fs.readFile('MyFile.txt',function(err,data){
            if(err) throw err;
            console.log('Reading File'+data)
            response.send("File Content : "+data);
        })
    }
});

app.get("/checkAPI",function(request,response){
    response.send({msg:'Connected'});
})