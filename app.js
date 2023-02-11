const express = require("express");
const request = require("request");
const bodyParse = require("body-parser")
const https = require("https")
const client = require("@mailchimp/mailchimp_marketing");
const { response } = require("express");
const port = 8000;

const app = express();

client.setConfig({apiKey: "cc26818f0cf0ef1032203bd2d7e0d5c4-us21",  server: "us21",});

app.use(express.static("public"));
app.use(bodyParse.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signUp.html");
})


// app.post("/", function(req, res){
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;

//     const data = {
//         members: [
//             {
//                 email_address: email,
//                 status: "subscribed",
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//             }
//         ]
//     };

//     const jsonData = JSON.stringify(data);

//     const url = "https://us21.api.mailchimp.com/3.0/lists/7c67c43213"

//     const options = {
//         methos: "POST",
//         auth: "pratik1:cc26818f0cf0ef1032203bd2d7e0d5c4-us21" 
//     }
    
//     const request = https.request(url, options, function(response){
//         response.on("data", function(data){
//             console.log(JSON.parse(data));
//         })
//     })

//     request.write(jsonData);
//     request.end();

// })

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    }

    const run = async () => {
        const response = await client.lists.addListMember("7c67c43213", {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
              FNAME: subscribingUser.firstName,
              LNAME: subscribingUser.lastName
          }
        });
        console.log(response); // (optional) 
      };

      run();

      if(response.statusCode == 200){
        res.sendFile(__dirname+"/success.html")
      }
      else{
        res.sendFile(__dirname+"/failure.html")
        
      }

});

app.post("/failure", function(req, res){
    return res.redirect("/");
})


app.listen(process.env.PORT || port, function(err){
    if(err){
        console.log("Error while running the server "+ err);
    }
    else{
        console.log("The server is up and running on port: "+ port);
    }

})

//API key =  cc26818f0cf0ef1032203bd2d7e0d5c4-us21

//  List or audience id =  7c67c43213