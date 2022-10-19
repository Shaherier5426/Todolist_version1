const express = require("express");
const bP = require("body-parser");
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
app.use(bP.json());
app.use(bP.urlencoded({
    extended: true
}));

let counter;
let dflist=[];
var items = [];
let workItems = [];
app.use(express.static("public"));

app.get("/:name", function (req, res) {
   const name1 = req.params.name

});


mongoose.connect("mongodb+srv://shaherier5426-admin:Khansaad2@cluster0.lppo7nd.mongodb.net/todolistdb",{useNewUrlParser: true});
const todoitemScheme = new mongoose.Schema({
    name: String,
    });
const item = mongoose.model("item", todoitemScheme) 

const todoListScheme = new mongoose.Schema({
    name: String,
    items: [todoitemScheme]
    });
const List = mongoose.model("List", todoListScheme) 




var today = new Date();
var options = {
    weekday: "long",
    day:"numeric",
    month:"long"
};

var day = today.toLocaleDateString("en-us", options);


app.get("/", function (req, res){

List.find({},function(err, results)
{
  
if(err){
onsole.log("error in find")
console.log(err);
}
else{
    console.log(results.length)
    if(results.length === 0){
        const String1 ={
            name: "WELCOME to your Todolist"
        }
        const String2 ={
            name: "Hit the + buttom to add a new item."
        }
        const String3 ={
            name: "<-- Hit this to delete an item."
        }
         dflist = [String1, String2, String3];
        
            List.insertMany(dflist,function(err){
                if (err){
                    console.log("error in insert");
                    console.log(err);
                    
                }else{
                    console.log("Succ insert defalt items")
                counter = counter +3
                }
            
            });
     res.redirect("/");
   
    }
    else{
console.log(results.length);


res.render("list", { worktitle: day,item: results, msg : "none"});}

}
});
});



app.get("/about", (req,res)=>{

res.render("about");

});


app.post("/", function (req, res) {
     
        const item = new List({name: req.body.newItem});
        item.save();
        counter = counter +1;
      
    res.redirect("/");
});



app.post("/delete", function(req, res){
    const itemToBeDeleted = req.body.checkbox;
    
 List.findByIdAndRemove(itemToBeDeleted, (err)=>{
    if(err){
    console.log(err);}
    res.redirect("/");
    counter = counter -1
});


});

function delete_defList (){
    List.deleteOne({name:'WELCOME to your Todolist'},(err)=>{console.log("done")})
    List.deleteOne({name:'Hit the + buttom to add a new item.'},(err)=>{console.log("done")})
    List.deleteOne({name: '<-- Hit this to delete an item.'},(err)=>{console.log("done")})
}
          

   
console.log(counter)


let port = process.env.PORT;
if (port==null || port ==""){
port == 3000;
}


app.listen(port || 3000, function () {

    console.log("The server has started");

});

        