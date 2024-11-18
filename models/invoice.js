const mongoose = require('mongoose')

const InvoiceItemSchema = new mongoose.Schema({
 description: { type: String, required: true },
 quantity: { type: Number, required: true, min: 1 },
 price: { type: Number, required: true, min: 1 },
 amount: {
   type: Number,
   required: true,
   validate: {
     validator: function() {
       return this.amount == this.quantity * this.price;
     },
     message: "Amount must equal to Quantity x Price"
   }
 }
})

const InvoiceBillSundrySchema = new mongoose.Schema({
 description: { type: String, required: true },
 amount: { type: Number, required: true, min: 0 }
})

const InvoiceSchema = new mongoose.Schema({
 invoiceNumber: { type: String, unique: true, required: true },
 business_name:  { type : mongoose.Types.ObjectId , required: true, ref : "business"},
 totalAmount: {
   type: Number,
   required: true,
   default: 0,
   validate: {
     validator: function() {
       const itemsTotal = this.invoiceItems.reduce((sum, item) => sum + item.amount, 0);
       const sundryTotal = this.invoiceBillSundry.reduce((sum, sundry) => sum + sundry.amount, 0);
       return this.totalAmount == itemsTotal + sundryTotal;
     },
     message: "TotalAmount must equal sum of Invoice Items and Invoice Bill Sundry"
   }
 },
 invoiceItems: { type: [InvoiceItemSchema], required: true },
 invoiceBillSundry: { type: [InvoiceBillSundrySchema], default: [] },
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('invoice', InvoiceSchema)

