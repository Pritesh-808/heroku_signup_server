const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static('public')) // public is name of directory
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res) {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email_id;

  console.log(firstName, lastName, email);

  const data = {
    members:[
    {

      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
  }
  ]

  };
  const jsonData=JSON.stringify(data);

  const url =  "https://us7.api.mailchimp.com/3.0/lists/ed64788fed";

  const options={
     method:"POST",
     auth:"Pritesh:cf15d19228b5c85d53dc7dcb3ca734ae-us7"
   };

  const requestt=https.request(url,options,function(response){
    if(response.statusCode===200)
    res.sendFile(__dirname+"/success.html");
    else
    res.sendFile(__dirname+"/failure.html");
      response.on("data",function(data){
        console.log(JSON.parse(data));
      });
  });

  requestt.write(jsonData);
  requestt.end();
});


app.post("/failure",function(req,res){
    res.redirect("/");
});




app.listen(process.env.PORT||3000, function() {
  console.log("server is running");
});


//API KEY : cf15d19228b5c85d53dc7dcb3ca734ae-us7
//list id:ed64788fed
