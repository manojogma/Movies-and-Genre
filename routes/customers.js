const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../model/customer");

//Get All Customers
router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});

//Create a Customer
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.send(customer);
});

//Get a Customer by name
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }
  const customer = await Customer.findById(id);

  if (!customer)
    return res.status(404).send("The customer with the given ID is not found.");
  res.send(customer);
});

//Update a Customer
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  const customer = await Customer.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    {
      new: true,
    }
  );

  if (!customer)
    return res.status(404).send("The customer with the given ID is not found.");
  res.send(customer);
});

//Delete a customer
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer)
    return res.status(404).send("The customer with the given ID is not found.");

  res.send(customer);
});

module.exports = router;
