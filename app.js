const express = require('express')
const app = express()
const port = 3000

app.set('view engine','ejs')

app.get('/', (req, res) => {
  
  let today=new Date();
 
const options={

    weekday:"long",
    day:"numeric",
    month :"long",
  



}
let day=today.toLocaleDateString("en-US",options)




res.render("list",{kindDay:day});




})
app.post("/",(req,res=>{

    res.write("<h1> SE MANDO</h1>")






}))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})