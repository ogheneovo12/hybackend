const mysql = require("mysql2/promise");
const db = require("../db.connect");
function generateDate(youth) {
  const { Date_of_Birth } = youth;
  const birthday = Date_of_Birth.split("/");
  const date = birthday[0];
  const month = birthday[1];
  return { date, month };
}
function getWeekLength(day, month) {
  const getDesiredweekDay = new Date(
    `${month}/${day}/${new Date().getFullYear()}`
  ).getDay();
  const weekStart = parseInt(day) - getDesiredweekDay;
  const weekEnding = parseInt(day) + (6 - getDesiredweekDay);
  return { weekStart, weekEnding };
}
class controller {
  static async addYouth(args){
    try {
  const newYouth =[
    args.Name || "",
    args.Email || "",
    args.Date_of_Birth || "",
    args.Date_of_Birth || "",
    args.Telephone_1 || "",
    args.Telephone_2 || "",
    args.Gender || "",
    args.Occupation || "",
    args.Place_of_Work || "",
    args.Course || "",
    args.State_of_Origin || "",
    args.Next_of_kin || "",
    args.Address || "",
    args.Dept || "",
    args.HFellowship || "",
    args.Marital_Status||""
  ]
    const con = await mysql.createConnection(db);
    const [rows, fields] = await con.execute(
    `insert into hytest (Name, Email, Telephone_1,Telephone_2,
      Membership_Status,Date_of_Birth,Gender,Occupation,
      Place_of_Work,Course,State_of_Origin,Next_of_Kin,Address,
      Dept,Hfellowship,Marital_Status
      ) Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    newYouth
  );
  return args;
  console.log(rows);
} catch (err) {
  console.log(err);
}
}
  static async getYouth(id) {
    try {
      const con = await mysql.createConnection(db);
      const [rows, fields] = await con.execute(
        `SELECT * FROM hydob where id=? and status ="active"`,
        [id]
      );
      if(!rows[0]){
        throw new Error(`no Youth with  id ${id}`)
      }
      return rows[0];
    } catch (err) {
      throw err
    }
  }
  static async getAllYouths(id) {
    try {
      const con = await mysql.createConnection(db);
      const [rows, fields] = await con.query(`SELECT * FROM hytest where status="active"`);
      return rows;
    } catch (err) {
      console.log(err);
    }
  }
  static async getMonthBirthday(options) {
    try {
      const today = new Date();
      const con = await mysql.createConnection(db);
      const [rows, fields] = await con.query(`SELECT * FROM hydob`);
      const celebrants = rows.filter((youth) => {
        const { date, month } = generateDate(youth);
        //desired month equals current month unless specified otherwise in option
        const desiredMonth = options
          ? options.month
            ? options.month
            : today.getMonth() + 1
          : today.getMonth() + 1;
        if (options && options.type == "all") {
          if (desiredMonth == month) {
            //to get all birthdays current month
            return true;
          }
        }
        //since all was not specified get birthdays celebrants for the remaining part of the month
        const currentDate = today.getDate();
        if (desiredMonth == month && date >= currentDate) {
          return true;
        }
      });
      //  console.log(celebrants)
      return celebrants;
    } catch (err) {
      console.log(err);
    }
  }
  static async getWeekBirthday(options) {
    try {
      const today = new Date();
      const con = await mysql.createConnection(db);
      const [rows, fields] = await con.query(`SELECT * FROM hydob`);
      const celebrants = rows.filter((youth) => {
        const { date, month } = generateDate(youth);
        //desired week equals current week period unless specified otherwise in option
        const desiredMonth = options
          ? options.month
            ? options.month
            : today.getMonth() + 1
          : today.getMonth() + 1;
        const desiredDay = options
          ? options.day
            ? options.day
            : today.getDate()
          : today.getDate();
        const { weekStart, weekEnding } = getWeekLength(
          desiredDay,
          desiredMonth
        );
        if (options && options.type == "all") {
          if (
            desiredMonth == month &&
            date >= weekStart &&
            date <= weekEnding
          ) {
            //to get all birthdays in current week
            return true;
          }
        }
        //since all was not specified get birthdays celebrants for the remaining part of the week
        if (
          desiredMonth == month &&
          date >= desiredDay &&
          date <= weekEnding
        ) {
          return true;
        }
      });
      //  console.log(celebrants)
      return celebrants;
    } catch (err) {
      console.log(err);
    }
  }
  static async getDayBirthday(options) {
    try {
      const today = new Date();
      const con = await mysql.createConnection(db);
      const [rows, fields] = await con.query(`SELECT * FROM hydob`);
      const celebrants = rows.filter((youth) => {
        const { date, month } = generateDate(youth);
        //desired week equals current day  unless specified otherwise in option
        const desiredMonth = options
          ? options.month
            ? options.month
            : today.getMonth() + 1
          : today.getMonth() + 1;
        const desiredDay = options
          ? options.day
            ? options.day
            : today.getDate()
          : today.getDate();
      
        if (desiredMonth == month && desiredDay == date) {
          return true;
        }
      });
      //  console.log(celebrants)
      return celebrants;
    } catch (err) {
      console.log(err);
    }
  }
  static async updateYouth(id,input){
    const con = await mysql.createConnection(db);
    input = JSON.parse(JSON.stringify(input));
    let columns = ``;
     for(let key in input){
        if(input.hasOwnProperty(key)){
          columns +=`${key} = '${input[key]}',`
        }
     }
     columns = columns.slice(0,columns.length-1) ;
     const [rows, fields] = await con.query(`update hytest set ${columns} where id = '${id}';
      SELECT * FROM hytest where id = ${id}`);
      if(rows[0].affectedRows < 1){
        throw Error(`no youth with id ${id}`)
      }
     return rows[1][0];
  }
  static async deleteYouth(id){
    const con = await mysql.createConnection(db);
    const [rows]=await con.query(`UPDATE hytest set status ='inactive' where id =${id}`)
    if(rows.affectedRows < 1){
      throw new Error("delete was not succesfull")
    }
    return {id,message:"deleted user succesfully",success:true}
  }
}

module.exports = controller;
