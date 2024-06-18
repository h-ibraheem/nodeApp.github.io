const Item = require('../models/item')

const itemIndex = (req, res)=>{
    Item.find()
    .sort({createdAt:-1})
    .then((result)=>{
        res.render('item/index', {title:'All Item', item: result});
    })
    .catch((err)=>{
        console.log(err);
    })
    
}

const itemCreate = (req, res)=>{
    res.render('item/create', {title: 'Add New Item'});
}

const itemSave =(req, res)=>{
    const item = Item(req.body);
    item.save()
    .then(()=>{
        res.redirect('/item');
    })
    .catch((err)=>{
        console.log(err);
    })
}

const itemDetails =(req, res)=>{
    const id = req.params.id;
    Item.findById(id)
    .then((result)=>{
        res.render('item/details', {title: 'Item Details', item: result});
    })
    .catch((err)=>{
        console.log(err);
    })
}

const itemDelete = (req, res)=>{
    const id = req.params.id;
    Item.findByIdAndDelete(id)
    .then(()=>{
        res.json({redirect :'/item'});
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = {
    itemIndex,
    itemCreate,
    itemSave,
    itemDetails,
    itemDelete,
}