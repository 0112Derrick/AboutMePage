import * as express from 'express';
import mysql, { Connection } from 'mysql';
import mssql from 'mssql'

class Server {
  private pool: mssql.ConnectionPool;

  dbConfig = {
    server: 'localhost',
    user: 'sa',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 1433,
    options: {
      enableArithAbort: true
    }
  }

  connection: Connection;

  constructor() {
    this.pool = new mssql.ConnectionPool(this.dbConfig);
    console.log('Server started.')
    this.testDB();
  }

  async testDB() {
    try {
      await this.pool.connect();
      console.log('Connection established');

      let insertQuery = 'Insert into Characters (character_id, character_name, class_id) Values (@id,@name,@classId)';

      let data = [1, 'Admin2', 1];

      const request = this.pool.request();

      Object.keys(data).forEach((key) => {
        request.input(key, mssql.VarChar, data[key]);
      });

      const result = await request.query(insertQuery);

      console.log('Data inserted successfully');

    } catch (err) {

      console.error("Error connecting to the DB");

    } finally {

      this.pool.close();
      console.log('Connection closed.');
    }

    //this.saveToDB(insertQuery, data);
  }

  //saveToDB(insertQuery: string, data: (string | number)[]) {
  // console.log("Establishing connection to DB.");
  // console.log(`${this.dbConfig.host}/${this.dbConfig.port} ${this.dbConfig.user} ${this.dbConfig.password} ${this.dbConfig.database}`)
  // this.connection = mysql.createConnection(this.dbConfig);
  // this.connection = mssql.connect(this.dbConfig)
  //   this.connection.connect((err) => {

  //     if (err) {
  //       console.error('Error connecting to the database: ', err.message);
  //       return;
  //     } else {
  //       console.log("Connection established.")
  //     }

  //     this.connection.query(insertQuery, data, (err, results) => {
  //       if (err) {
  //         console.error('Error executing the SQL statement: ', err.message);
  //       } else {
  //         console.log('Data inserted successfully!');
  //       }
  //     });
  //     this.connection.end();
  //   });
  // }
  // }
}
const server = new Server();