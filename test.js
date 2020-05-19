const con = require("./db.connect")
const moment = require("moment")
moment.suppressDeprecationWarnings = true;
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


// con.query("SELECT * FROM hydob",(err,result)=>{
//         if(err)console.log(err);    
//           const celebrants =  result.filter(youth=>{
//            const {Date_of_Birth}= youth;
//            const today = new Date();
//            const birthday = Date_of_Birth.split("/")
//            const  day =  birthday[0];
//            const month = birthday[1]
//            const currentMonth = today.getMonth() + 1;
//            const currentDate = today.getDate();
//            if(currentMonth == month && day >= currentDate ){
//                return true;
//            }

//          })
//          thiswk = celebrants.filter(({Date_of_Birth})=>{
//             const today = new Date();
//             const birthday = Date_of_Birth.split("/")
//             const  day =  birthday[0];
//             const month = birthday[1]
//             const currentMonth = today.getMonth() + 1;
//             const currentDate = today.getDate();
//             if( day <= 23 ){
//                 return true;
//             }
   
//          })
//          console.log(thiswk);
// })
// console.log("john   james".split(" ").join(""))

const today= new Date();
 let getDay = new Date(`5/23/${today.getFullYear()}`).getDay();
// console.log(getDay);
//start date = entereddate - currentday;
//end   date = entreddate + (6-currentDay);

function getWeekLength(day,month){
    const getDesiredweekDay = new Date(`${month}/${day}/${new Date().getFullYear()}`).getDay();
    const weekStart = parseInt(day) - getDesiredweekDay;
    const weekEnding = parseInt(day) + (6 - getDesiredweekDay);
    console.log({weekStart,weekEnding})
    return {weekStart,weekEnding}
}
getWeekLength("17","5")