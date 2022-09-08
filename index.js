const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const sql = require('msnodesqlv8');
const {createPool} = require('mysql');
// const connectionString = "root@localhost:3306";
// server=localhost;uid=root;password=Prafulmane@123;database=giva
// root@localhost:3306
const pool = createPool({
  host:"localhost",
  user: "root",
  password: "root123",
  database: "giva",
  connectionLimit: 10
})
//console.log(pool);



app.get('/:cityname', (req, res)=>{
  const string = req.params.cityname;
  const query = "select * from usstates WHERE state = "+string;
  // const list = sql.query(connectionString, query, (err, rows)=>{
  //   console.log(rows);
  //   res.send(rows);
  // })
  pool.getConnection((err, conn)=>{
    if(err)
    {
      console.log(err);
      return;
    }
    conn.query(query, (err, rows, fields)=>{
      console.log(rows);
      res.json(rows);
    })
  })

  //res.send(query);
})

// sql.query(connectionstring, query, (err, rows)=>{
//   console.log(rows);
// })


app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
