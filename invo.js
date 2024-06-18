const express = require('express');
const mongoose = require('mongoose');
const Invo = require('./models/invo');

// express app
const app = express(); 

// connect to mongoDB
const dbURI = "mongodb+srv://Hussam:Hussam1234@nodetuts.2yn7oqj.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts"
mongoose.connect(dbURI)
    .then(()=> console.log('Database connected ...'))
    .catch((err)=> console.log('Database connection error ...', err))

// config PORT

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`server running on port : ${port}`));

//middelWare & staticFile
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// view engine
app.set('view engine', 'ejs');

// Route API 
app.get('/invos', (req, res)=>{
    Invo.find().sort({ createdAt: -1})
        .then((result)=>{
            res.render('allInvo', {title:'Invoices List', invo: result});
        })
        .catch((err)=> console.log(err));
})

app.get('/invos/invoDet/:id', (req, res)=>{
    const id = req.params.id;
    Invo.findById(id)
    .then((result)=>{
        res.render('invoDetails', {title: 'invoic Deatails', invo: result});
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/invos/addInvo', (req, res)=>{
    res.redirect('addInvo', {title: 'New Invoices'})
})

app.post('/invos', (req, res)=>{
    const invo = new Invo(req.body);
    invo.save()
        .then((result)=>{
            res.redirect('/invos')
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.delete('/invos/:id', (req, res)=>{
    const id = req.params.id;
    Invo.findByIdAndDelete(id)
        .then((result)=>{
            res.json({redirect: '/invos'});
        })
        .catch((err)=>{
            console.log(err);
        })
});

app.use((req, res)=>{
    res.status(404).render('404', {title: '404'});
})
