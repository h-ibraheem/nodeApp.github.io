const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/item')

// express app
const app = express();

//config port
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`server running on port : ${port}`));

// connect to mongoDB
const dbURI = "mongodb+srv://Hussam:Hussam1234@nodetuts.2yn7oqj.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts"
mongoose.connect(dbURI)
    .then(()=> console.log('Database connected ... '))
    .catch((err)=> console.log('Database connection error', err));

//middelware & staticFile
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// view engine
app.set('view engine', 'ejs');

//Route API
app.get('/items', (req, res)=>{
    Item.find().sort({name: 1})
        .then((result)=>{
            res.render('allItems', {title: 'Item List', item: result})
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/items/itemDeatails/:id', (req, res)=>{
    const id = req.params.id;
    Item.findById(id)
        .then((result)=>{
            res.render('ityemDetails', {title: 'item Details', item: result})
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/items/additem', (req, res)=>{
    res.render('addItem', {title:' Add New Item'});
})

app.post('/items', (req, res)=>{
    const item = new Item(req.body);
    item.save()
        .then(()=>{
            res.redirect('/items')
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.delete('/items/:id', (req, res)=>{
    const id = req.params.id;
    Item.findByIdAndDelete(id)
        .then((result)=>{
            res.json({redirect: '/items'})
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.use((req, res)=>{
    res.status(404).render('404', {title: '404'});
})