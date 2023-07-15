const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const _ = require('lodash');
const mongoose=require("mongoose")


var agrega="";

mongoose.connect("mongodb+srv://benitolopez5133:TJemZwb8bz3xEzh2@cluster0.55f8vf9.mongodb.net/todoListDB");

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

const listSchema={

    name:String,
    items:[itemsSchema]

}
const List =mongoose.model("list",listSchema)

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
    
      res.render("list",{listTitle:"Today",newItems:itemseach});
    
   
  } catch (error) {
    console.log("Hubo un error al buscar las items:", error);
  }
  
};

findItem();


})

app.post("/", async (req, res) => {
  const itemName = req.body.new_item;
  const listName = req.body.list;

  if (listName === "Today") {
    const item = new Items({
      name: itemName,
    });

    item.save();
    res.redirect("/");
  } else {
    try {
      const foundList = await List.findOne({ name: listName });
      const newItem = new Items({
        name: itemName,
      });
      foundList.items.push(newItem);
      await foundList.save();
      res.redirect("/" + listName);
    } catch (err) {
      // Manejo de errores
      console.error(err);
    }
  }
});


app.post("/delete", async (req, res) => {
  const itemId = req.body.ready;
  const listName = req.body.listName;

  if (listName === "Today") {
    try {
      await Items.deleteOne({ _id: itemId });
      console.log("Se eliminó el registro de la base de datos correctamente.");
      return res.redirect("/");
    } catch (error) {
      console.log("Hubo un error al eliminar el registro:", error);
      return res.redirect("/");
    }
  } else {
    try {
      await List.findOneAndUpdate(
        { name: listName },
        { $pull: { items: { _id: itemId } } }
      );
      console.log("Se eliminó el registro de la base de datos correctamente.");
      return res.redirect("/" + listName);
    } catch (error) {
      console.log("Hubo un error al eliminar el registro:", error);
      return res.redirect("/" + listName);
    }
  }
});


app.get('/:customListName', (req, res) =>{
  const customListName =_.capitalize( req.params.customListName);
  console.log(customListName);

const foundDuplicate=async()=>{
  try {
    // Verificar si el nombre ya existe en la base de datos
    const foundList = await List.findOne({ name: customListName });

    if (foundList) {
      // El nombre ya existe, realizar las acciones necesarias
      res.render("list",{listTitle:foundList.name, newItems:foundList.items})
      // ...
    } else {
      // El nombre no existe, crear un nuevo documento
      const list = new List({
        name: customListName,
        items: defaulItems,
      });
      await list.save();
      res.redirect("/"+customListName)
      console.log('Nuevo documento guardado en la base de datos');
    }
  } catch (error) {
    console.log(error);
  }
}
foundDuplicate()
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})