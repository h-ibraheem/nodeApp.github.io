const express = require('express');
const mongoose = require('mongoose');
const Unit = require('./models/unit');

// express app
const app = express();

// connect to mongoDB
const dbURI="mongodb+srv://Hussam:Hussam1234@nodetuts.2yn7oqj.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts";
mongoose.connect(dbURI)
    .then(()=> console.log('Database connected ... '))
    .catch((err)=> console.log('Database connection error', err))

// config port
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`server running on port ${port}`));

// middelware and statc file
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

// view engine
app.set('view engine', 'ejs');

//Route Api
app.get('/unites', (req, res)=>{
    Unit.find().sort({name: 1})
        .then((result)=>{
            res.render('unitList', {title: 'Unit List', unit: result});
        })
        .catch((err)=> {
            console.log(err);
        })
})

app.get('/units/details/:id', (req, res)=>{
    const id = req.params.id;
    Unit.findById(id)
        .then((result)=>{
            res.render('unitDetails', {title: 'unit details', unit:result})
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/units/addUnit', (req, res)=>{
    res.render('addUnit', {title: 'Add New Unit'});
})

app.post('/units', (req, res)=>{
    const unit = new Unit(req.body)
    unit.save()
        .then((result)=>{
            res.render('/units');
        })
        .catch((err)=>{
            console.log(er);
        })
})

app.delete('/unite/:id', (req, res)=>{
    const id = req.params.id;
    Unit.findByIdAndDelete(id)
        .then(()=>{
            res.json({redirect: '/units'});
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.use((req, res)=>{
    res.status(404).render('404', {title: '404'});
})