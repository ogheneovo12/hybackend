const express = require("express")
const controller = require("./graphql/controller")
const bodyparser = require("body-parser")
const graphqlHTTP = require("express-graphql");
var exphbs  = require('express-handlebars');
const {newSchema,root} = require("./graphql/Schema")
const cors = require("cors");
const cron = require("node-cron");
const config = {
    gmail:{
        user:"ukuanovweogheneovo@gmail.com",
        pass:"Benj@_1999!"
    }
}
const mailer = require("./mailer")(config);
const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use("/graphql",graphqlHTTP({
    schema: newSchema,
    rootValue: root,
    graphiql: true,
   }))


app.use(express.static("public"))
app.get("/hdb", async(req, res)=>{
    const celebrants = await controller.getWeekBirthday();
    res.render('birthday', {layout: false,
        celebrants,
        period:"week"
    });
})

//day cron job
cron.schedule("59 23 * * *",async ()=>{
    const celebrants = await controller.getTodayBirthday();
    if(celebrants){
        const context = {  celebrants, period:"today"}
        mailer.send("coder4christ@gmail.com","testing","birthday",context,res)
    }  
})
//week cron job
cron.schedule("0 0 * * sun",async ()=>{
    const celebrants = await controller.getWeekBirthday();
    const context = {  celebrants, period:"week"}
    mailer.send("coder4christ@gmail.com","testing","birthday",context)
})

app.get("/send", async(req, res)=>{
    res.render("user",{layout:false})
    // const celebrants = await controller.getWeekBirthday();
    // const context = {  celebrants, period:"week"}
    // mailer.send("coder4christ@gmail.com,olaniyan.deji@gmail.com","testing","birthday",context,res)
    // res.end("json")
})

app.listen(PORT,()=>console.log("servers started at port 5000"))