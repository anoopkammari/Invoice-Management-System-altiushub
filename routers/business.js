const express = require("express")
const router = express.Router()
const Business = require('../models/business')

//display all business
router.get('/' , async(req, res) => {
   try{
        const business = await Business.find()
        res.json(business)
   }
   catch(err){
    res.status(404).send({message: "Couldnot fetch the data", error : error.err })
   }
})

//find a bussiness by id
router.get('/:id', async(req, res) => {
    try{
         const business = await Business.findById(req.params.id)
         res.json(business)
    }
    catch(err){
    res.status(404).send({message: "Business not found", error : error.err })
    }
 })


//update any business details
router.patch('/:id'  ,  async(req, res)=>{

    try{
       const business = await Business.findById(req.params.id)

       business.business_name = req.body.business_name
       business.business_description = req.body.business_description

       const business1 = await business.save()
       res.json(business1)
   
    }catch(err){
       res.status(401).send('Business details could not be updated'.err)
    }
   })

module.exports = router