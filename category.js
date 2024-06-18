const express = require('express');
const mongoose = require('mongoose');
const Category = require('./models/category')

// express app
const app = express(); 

// connect to mongoDB
const dbURI = "mongodb+srv://Hussam:Hussam1234@nodetuts.2yn7oqj.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts"
mongoose.connect(dbURI)
    .then(()=> console.log('Database connecrted ...'))
    .catch((err)=> console.log('Database connection error', err))

// config PORT
const port = process.env.PORT || 3000 ;
app.listen(port, ()=> console.log(`server running on port ${port}`));

//middelware & static file 
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

// view engine
app.set('view engine', 'ejs');

// Route API 
app.get('/categoies', (req, res)=>{
    Category.find().sort({name: 1})
        .then((result)=>{
            res.render('categoryList', {title: 'Category List', category : result})
        })
        .catch((err)=> {
            console.log(err);
        })
})

app.get('/categories/categoryDetails/:id', (req, res)=>{
    const id = req.params.id;
    Category.findById(id)
        .then((result)=>{
            res.render('categorydetails', {title:'Category details', category : result})
        })
        .catch((err)=> {
            console.log(err)
        })
})

app.get('/categories/addCategory', (req, res)=>{
    res.render('addCategory', {title: 'Add New Category'});
})

app.post('/categories', (req, res)=>{
    const category = new Category(req.body);
    category.save()
        .then((result)=>{
            res.redirect('/categories')
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.delete('/categories/:id', (req, res)=>{
    const id = req.params.id;
    Category.findByIdAndDelete(id)
        .then((result)=>{
            res.json({redirect:'/categories'});
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.use((req, res)=>{
    res.status(404).render('404', {title: '404'})
})