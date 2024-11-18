const express = require('express')
const Invoice = require('../models/invoice')
const router = express.Router()

// Create a new invoice
router.post('/invoices', async (req, res) => {
 try {
   const invoice = new Invoice(req.body)
   await invoice.save()
   res.status(201).json(invoice)
 } catch (error) {
   res.status(400).json({ error: error.message })
 }
});

// Retrieve a specific invoice by ID
router.get('/invoices/:id', async (req, res) => {
 try {
   const invoice = await Invoice.findById(req.params.id)
   if (!invoice) {
     return res.status(404).json({ error: 'Invoice not found' })
   }
   res.json(invoice)
 } catch (error) {
   res.status(400).json({ error: error.message })
 }
})

// List all invoices 
router.get('/' , async(req, res) => {
    try{
         const invoice = await Invoice.find()
         res.json(invoice)
    }
    catch(err){
     res.status(404).send({message: "Couldnot fetch the data", error : error.err })
    }
 })

// Update an existing invoice
router.patch('/invoices/:id', async (req, res) => {
 try {
   const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
     new: true,
     runValidators: true
   });
   if (!invoice) {
     return res.status(404).json({ error: 'Invoice not found' })
   }
   res.json(invoice)
 } catch (error) {
   res.status(400).json({ error: error.message })
 }
})

// Delete an invoice
router.delete('/invoices/:id', async (req, res) => {
 try {
   const invoice = await Invoice.findByIdAndDelete(req.params.id)
   if (!invoice) {
     return res.status(404).json({ error: 'Invoice not found' })
   }
   res.json({ message: 'Invoice deleted successfully' })
 } catch (error) {
   res.status(400).json({ error: error.message })
 }
})
module.exports = router