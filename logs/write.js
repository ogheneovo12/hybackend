const fs=require("fs");
const path = require("path")
const log =(str)=>{
    const date =new Date();
    const today = date.toLocaleString()
    const info = `${today}:\t\t\t ${str}\n`;
    fs.open(path.resolve(__dirname,"./logs.txt"), "a", (err, fd)=>{ 
        if(err){ 
            console.log(err.message); 
        }else{ 
            fs.write(fd, info, (err, bytes)=>{ 
                if(err){ 
                    console.log(err.message); 
                }else{ 
                    console.log(bytes +' bytes written to log'); 
                } 
            })         
        } 
    }) 
}

module.exports = log;

