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
  static async getYouth(id) {
    try {
      const con = await mysql.createConnection(db);
      const [rows, fields] = await con.execute(
        `SELECT * FROM hydob where id=?`,
        [id]
      );
      console.log(rows[0]);
      return rows[0];
    } catch (err) {
      console.log(err);
    }
  }
  static async getAllYouths(id) {
    try {
      const con = await mysql.createConnection(db);
      const [rows, fields] = await con.query(`SELECT * FROM hydob`);
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
}

module.exports = controller;
