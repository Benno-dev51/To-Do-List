const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const mongoose=require("mongoose")

var agrega;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"))
app.set('view engine','ejs')
mongoose.connect("mongodb://127.0.0.1:27017/todoListDB")


const itemsSchema={
  name:String,
}



const  Items=mongoose.model("item",itemsSchema)
const item1= new Items({

  name:"Programming"
})

const item2=new Items({
  name :"Eat"
})
const item3=new Items({
  name:"Study"
})
const defaulItems=[item1,item2,item3]

const insertItems=async()=>{
try {
  await Items.insertMany(defaulItems);
  console.log("Éxito");
} catch (error) {
  console.log("Error", error);
}
}
insertItems()


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