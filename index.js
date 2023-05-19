const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const companyRouter = require('./routes/company.router')

app.use("/api/company", companyRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})