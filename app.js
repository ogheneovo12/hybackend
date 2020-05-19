const express = require("express")
const app = express();
const bodyparser = require("body-parser")
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/Schema")
const cors = require("cors");

app.use(cors())

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
   }))
app.get("/",(req,res)=>{
    res.end("HEY boy")
})
app.use(express.static("public"))






app.listen(5000,()=>console.log("servers started at port 5000"))