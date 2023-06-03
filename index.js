const express = require("express")
const app = express()

require('dotenv').config()

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const companyRouter = require('./routes/company.router')

app.use("/api/company", companyRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})