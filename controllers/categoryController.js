const Category = require('../models/category')


const categoryIndex = (req, res)=>{
    Category.find().sort({name: 1})
    .then((result)=>{
        res.render('category/index', {title : 'Category List', category: result});
    })
    .catch((err)=>{
        res.status(404).render('404', {title : 'not found .', errmsg :'category not found'});
    })
};


const categoryDetails = (req, res)=>{
    const id = req.params.id;
    Category.findById(id)
        .then((result)=>{
            res.render('category/details', {title: 'Category Details', category: result});
        })
        .catch((err)=>{
            res.status(404).render('404', {title :'Not Found', errmsg:' category Not Found', err});
        })
}

const categoryCreate = (req, res)=>{
    res.render('category/create', {title: 'Create New Category'})
}

const categorySave = (req, res) =>{
    const category = new Category(req.body);
    category.save()
        .then(()=>{
            res.redirect('category/');
        })
        .catch((err)=>{
            res.status(404).render('404', {title:'Error', errmsg:'Can\'t save the record'});
        })
}

const categoryDelete = (req, res)=>{
    const id = req.params.id;
    Category.findByIdAndDelete(id)
        .then(()=>{
            res.json({redirect: '/category/'});
        })
        .catch((err)=>{
            res.status(404).render('404', {title:'Error', errmsg:'Can\'t save the record', err});
        })
}


module.exports={
    categoryIndex, 
    categoryDetails, 
    categoryCreate, 
    categorySave, 
    categoryDelete,
}