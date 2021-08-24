

const mailchimp = require("@mailchimp/mailchimp_marketing");


const express= require("express");
const bodyParser= require("body-parser");
const request = require("request");

const app= express();

app.use("/", express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended: true}))



app.get("/",function(req,res){

res.sendFile(__dirname + "/signup.html");


});


mailchimp.setConfig({
//*****************************ENTER YOUR API KEY HERE******************************
 apiKey: "d12b16056abda1592865cf725dd4fb0d-us5",
//*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
 server: "us5"
});

app.post("/",function(req,res){

  const firstName = req.body.Fname;
  const secondName = req.body.Lname;
  const email = req.body.email;

  const listId = "4455086806";

  const subscribingUser = {
   firstName: firstName,
   lastName: secondName,
   email: email

};

app.post("/failure", function(req,res){

res.redirect("/");

});

async function run() {
const response = await mailchimp.lists.addListMember(listId, {
email_address: subscribingUser.email,
status: "subscribed",
merge_fields: {
FNAME: subscribingUser.firstName,
LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
res.sendFile(__dirname + "/sucess.html")
console.log(
`Successfully added contact as an audience member. The contact's id is ${
response.id
}.`
);
}
//Running the function and catching the errors (if any)
// ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
run().catch(e => res.sendFile(__dirname + "/failure.html"));
});


app.listen(process.env.PORT || 4000,function(req,res){
  console.log("Server started at 4000");
});





//
// list id
// 4455086806


// api id
// // d12b16056abda1592865cf725dd4fb0d-us5
