const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlemgth: 50
    }
});

router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


const Genre = mongoose.model('Genre', genreSchema);

  //Get All Genres
 router.get("/", async (req, res) => {
  const genre = await Genre.find().sort('name');
    res.send(genre);
  });
  
  //Create a Genre
  router.post("/", async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let genre = new Genre ({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
  });
  
  //Get a Genre by name
  router.get("/:id", async (req, res) => {
    const genre = await Genre.findById(req.params.id);
  
    if (!genre)
      return res.status(404).send("The genre with the given ID is not found.");
    res.send(genre);
  });
  
  //Update a Genre
  router.put("/:id", async (req, res) => {  
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name},{
      new:true
    });
    
    if (!genre)
      return res.status(404).send("The genre with the given ID is not found.");
    res.send(genre);
  });
  
  //Delete a genre
  router.delete("/:id", async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre)
      return res.status(404).send("The genre with the given ID is not found.");

    res.send(genre);
  });
  
  //Validation
  function validateGenre(genre) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
    return schema.validate(genre);
  }

  module.exports = router;