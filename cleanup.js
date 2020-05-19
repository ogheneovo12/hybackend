function seperatePhone(hy){
    let sql = "";
     hy.forEach(youth=>{
      const telephone = youth.Telephone_2.split(" ").filter(phone=>phone);
      console.log(telephone)
      sql +=`UPDATE hymaindb SET Telephone_1=${telephone[0]}, Telephone_2 =${telephone[1]} WHERE id=${youth.id};`
     })
     return sql;
}
function addZero(hy){
    let sql = "";
     hy.forEach(youth=>{
     const {Telephone_1,Telephone_2}=youth
    if(Telephone_1 && !Telephone_1.startsWith("0")){
        sql +=`UPDATE hymaindb SET Telephone_1='0${Telephone_1}' WHERE id=${youth.id};` 
    }
   if(Telephone_2 && !Telephone_2.startsWith("0")){
       sql +=`UPDATE hymaindb SET Telephone_2='0${Telephone_2}' WHERE id=${youth.id};`
   }
     
})
     return sql;
}
app.get("/",(req,res)=>{
    con.query("SELECT * FROM hymaindb",(err,result)=>{
        if(err)return res.json(err);
        const twophone = result.filter(youth=>youth.Telephone_2.split(" ").filter(phone=>phone).length >=2 && !youth.Telephone_1)
       
        const sql = seperatePhone(twophone);
        con.query(sql,(err,result)=>{
            if(err)return res.json(err);
            res.json(result.flat());
        })
        
    })
})
app.get("/phone",(req,res)=>{
    con.query("SELECT * FROM hymaindb",(err,result)=>{
        if(err)return res.json(err);
        const sql = addZero(result);
        // return res.json(sql)
        con.query(sql,(err,result)=>{
            if(err)return res.json(err);
            res.json(result.flat());
        })
        
    })
})

// app.get("/dob",(req,res)=>{
//     con.query("SELECT * FROM hymaindbcopy",(err,result)=>{
//         if(err)return res.json(err);
//         const sql = formatDate(result);
//         // return res.json(sql)
//         con.query(sql,(err,result)=>{
//             if(err)return res.json(err);
//             res.json(result.flat());
//         })
        
//     })
// })
//212 132 8th aug
function formatDate(hy){
    let sql = "";
    hy.forEach(youth=>{
     const { Date_of_Birth } =youth;
     const newDOB = parseDate(Date_of_Birth);
     console.log(newDOB)
     sql +=`UPDATE hymaindbcopy SET Date_of_Birth='${newDOB}' WHERE id=${youth.id};`
    })
    return sql;
 }

 function parseDate(date){
    let formatted = ""
    const newDate = date.replace(/(\d+)(st|nd|rd|th)/, "$1");
    if(newDate.split(" ").length ==3 ){
        formatted = moment(newDate).format('DD/MM/YYYY');
       // console.log(now)
        return formatted
    }
    formatted = moment(newDate).format('DD/MM');  
    return formatted;
}