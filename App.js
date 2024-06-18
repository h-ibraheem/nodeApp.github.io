const express = require("express");
const mongoose = require("mongoose");
const customerRouter = require('./routes/customerRoutes')
const categoryRouter = require('./routes/categoryRouters')
const itemRouter = require('./routes/itemRouters')

// express app
const app = express();

// connect to mangoDB
const dbURI ="mongodb+srv://Hussam:Hussam1234@nodetuts.2yn7oqj.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts";
mongoose.connect(dbURI)
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

// Rest of your Express app setup

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// register view Engin
app.set("view engine", "ejs");

// middleware & static File
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
  res.render('index', {title: 'MrDragon App'})
})

//------- Router -------------
 
app.use('/customer', customerRouter)
app.use('/category', categoryRouter)
app.use('/item', itemRouter)



app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
