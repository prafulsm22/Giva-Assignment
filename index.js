const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const sql = require('msnodesqlv8');
const {createPool} = require('mysql');

const pool = createPool({
  host:"localhost",
  user: "root",
  password: "root123",
  database: "giva",
  connectionLimit: 10
})

// You can baiscally search for localhost3000/{statename} to access all the data 

app.get('/:cityname', (req, res)=>{
  const string = req.params.cityname;
  const query = "select * from usstates WHERE state = "+"'"+string+"'";

  pool.getConnection((err, conn)=>{
    if(err)
    {
      console.log(err);
      return;
    }
    conn.query(query, (err, rows)=>{
      console.log(rows);
      res.json(rows);
    })
  })
})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
