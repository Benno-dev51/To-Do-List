const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");

var agrega="";
var items=[];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"))
app.set('view engine','ejs')

app.get('/', (req, res) => {
  
  let today=new Date();
 
const options={

    weekday:"long",
    day:"numeric",
    month :"long",
  



}
let day=today.toLocaleDateString("en-US",options)




res.render("list",{kindDay:day,newItems:items});




})
app.post("/",(req,res)=>{

  agrega=req.body.item
  res.redirect("/")
  items.push(agrega)
 
   






})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})