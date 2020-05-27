 const fs=require("fs")
 const db = {
                host: process.env.dbHost || "localhost",
                user:process.env.dbUser  || "root",
                password:process.env.dbPassword ||  "",
                database:process.env.dbName || "hychurch",
                port:process.env.dbPort || 3306,
                multipleStatements: true
}

module.exports = db;
