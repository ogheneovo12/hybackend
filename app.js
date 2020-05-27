const express = require("express")
const app = express();
const bodyparser = require("body-parser")
const graphqlHTTP = require("express-graphql");
const {newSchema,root} = require("./graphql/Schema")
const cors = require("cors");
app.use(cors())
const PORT = process.env.PORT || 5000
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use("/graphql",graphqlHTTP({
    schema: newSchema,
    rootValue: root,
    graphiql: true,
   }))
app.use(express.static("public"))

app.listen(PORT,()=>console.log("servers started at port 5000"))