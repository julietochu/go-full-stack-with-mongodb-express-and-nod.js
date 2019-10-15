const express = require('express')
const mongoose = require('mongoose');

const Recipe = require("./models/recipe")
const app = express()

mongoose.connect('mongodb+srv://ochu-juliet_24:6may2017@cluster0-x8azh.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log("successfully connected to mongoDB")
    })
    .catch((error) => {
        console.log(error);
    })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/api/recipes', (req, res, next) => {
    Recipe.find().then(recipies => {
        res.status(200).json(recipies);
    })
});
app.get('/api/recipes/:recipeId', (req, res) => {
    Recipe.findOne({ _id: req.params.recipeId }).then(recipe => {
        res.status(200).json(recipe);
    })
})
app.put('/api/recipes/:recipeId', (req, res) => {
    Recipe.findOne({ _id: req.params.recipeId }).then(recipe => {
        res.status(200).json(recipe);
     })
 })
 app.delete('/api/recipes/:recipeId', (req, res) => {
    Recipe.findOne({ _id: req.params.recipeId }).then(recipe => {
        res.status(200).json(recipe);
     })

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.json({ message: 'Your request was successful' });
//     next();
// })
app.post("/api/recipes", (req, res) => {
    console.log(req.body)
    //  const {title, description, imageUrl, price, userId} = req.body;
    //  const thing = newThing({title, description, imageUrl, price, userid});
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
    });
    recipe.save()
        .then(() => {
            res.status(201)
            res.json({ message: 'recipe saved successfully' })
        })
        .catch((error) => {
            res.status(400)
            res.json({
                error
            })
        });

})
module.exports = app

