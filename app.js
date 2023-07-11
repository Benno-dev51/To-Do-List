const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const mongoose=require("mongoose")

var agrega="";

mongoose.connect('mongodb://127.0.0.1:27017/todoListDB');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"))
app.set('view engine','ejs')



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
  const count = await Items.countDocuments();
    if (count === 0) {

  await Items.insertMany(defaulItems);
  console.log("Éxito");
} 
else{
  console.log("Items ya existentes")
}
}

catch (error) {
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





const findItem = async () => {
  try {
  
    const itemseach = await Items.find();
    
      res.render("list",{kindDay:day,newItems:itemseach});
    
    
    
   
  } catch (error) {
    console.log("Hubo un error al buscar las items:", error);
  }
  
};

findItem();


})
app.post("/",(req,res)=>{


  const itemName=req.body.new_item;

  const item=new Items({
    name:itemName,
  })
 
   item.save()

  res.redirect("/")

})

app.post("/delette",(req,res)=>{

const checked=req.body.listo==="on" ? "Esta checkeado":"no Esta checkeado"

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})