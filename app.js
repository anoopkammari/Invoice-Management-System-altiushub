
const express = require("express")
const mongoose = require("mongoose")
const app = express()

require('dotenv').config()
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const con = mongoose.connection

con.on('open', function(){
    console.log("Database is connected")
})

app.use(express.json())

app.listen(4545, ()=> {
    console.log('Server started')
})



//connecting to business router
const businessrouter = require('./routers/business')
app.use('/business', businessrouter)
//connecting to invoice router
const invoicerouter = require('./routers/invoice')
app.use('/invoice', invoicerouter)



