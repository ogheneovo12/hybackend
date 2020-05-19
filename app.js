const express = require("express")
const http = require("http")
const app = express();
const bodyparser = require("body-parser")
const PORT = process.env.PORT || 5000
// const graphqlHTTP = require("express-graphql");
//const schema = require("./graphql/Schema")
//const cors = require("cors");

// app.use(cors())

// app.use(bodyparser.urlencoded({extended:true}))
// app.use(bodyparser.json())

app.get("/",(req,res)=>{
    res.send("HEY boy")
})
// app.use("/graphql",graphqlHTTP({
//     schema,
//     graphiql:true
// }))
const server = http.createServer(app);
server.listen(PORT)