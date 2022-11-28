const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const app = express()

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))

app.get("/" , function(req,res){
   res.sendFile(__dirname+"/signup.html")
})

app.post("/" , function(req,res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;
console.log(firstName , lastName , email)


const data = {
    members:[
        {
            email_address : email,
            status: "subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
};

const jsondata = JSON.stringify(data)

const url = "https://us11.api.mailchimp.com/3.0/lists/38f7c4a64b";
const options = {
    method:"POST",
    auth:"madhu:502b1444b597a544ca6635cc44d5ff2a-us11"
}
const request = https.request(url,options,function(response){
    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html")
    }else{
        res.sendFile(__dirname+"/failure.html")
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
})

request.write(jsondata);
request.end()

})

app.post("/failure",(req,res)=>{
res.redirect("/")
})


app.listen(process.env.PORT || 3000,function(){
    console.log("Server started and running on port 3000")
})



// 502b1444b597a544ca6635cc44d5ff2a-us11

//38f7c4a64b