const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const uuid = require('uuid'); // import uuid library
const port = 3000;
const date = require(__dirname + "/modules/date.js")
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.listen(port, function () {
    console.log("listning on port " + port)
});

//fisrt connect to the database
mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

//create a schema for the todo list items(table/collection)
const list = new mongoose.Schema({
    title: String,
    date_created: String,
    items_lists: []
})

//declare a model(rows inside a table)
const list_item = mongoose.model("list_item", list)


app.get('/home', (req, res) => {
    const string_date = date.getDateTitle();

    list_item.find({})
        .then(function(items){
            res.render('home', { _date: string_date , _lists: items});

        }).catch(function(error){
            console.log(error)
        })
});

app.get("/home/:param", (req, res) => {

    const dateString = date.getDate();

    let temp_title = req.params.param
    list_item.find({ title: temp_title })
        .then(function (items) {
            console.log(items[0])
            res.render('todolist', { _list: items[0], _date: dateString })
        }).catch(function (error) {

            console.log(error); // log any errors to the console
        });
});

///--------POST METHODS-------------/////////
app.post('/add_list', async (req, res) => {
    const dateString = date.getDate();
    const listTitle = req.body.list_name.toLowerCase();

    // Check if a list with the given title already exists in the database
    const existingList = await list_item.findOne({ title: listTitle });
    if (existingList) {
        return res.status(400).send(`A list with the title "${listTitle}" already exists.`);
    }

    // If the list doesn't exist, create a new one
    const newList = new list_item({
        title: listTitle,
        date_created: dateString,
        items_lists: []
    });

    try {
        const savedList = await newList.save();
        console.log(savedList);
        res.redirect("/home");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error saving todo item.");
    }
});



app.post('/edit_delete_list',(req,res)=>{
    if(req.body.edited_name){
        //edit the name of the list
        let index_edit = req.body.old_name;
        let newTitle = req.body.edited_name.toLowerCase();
        list_item.updateOne({ title: index_edit }, { $set: { title: newTitle } })
            .then(function (result) {
                res.redirect("/home");
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).send("Error updating todo item.");
            });

    }else if(req.body.delete_list){
        console.log(req.body.delete_list)
        //delete the list
        let index = req.body.delete_list;
        list_item.deleteOne({ title: index })
            .then(function (result) {
                console.log(result);
                res.redirect("/home");
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).send("Error deleting todo item.");
            });
    }else{
        res.redirect("/home");
    }
})


app.post('/add_item/:id', (req, res) => {
    let new_item = req.body.new_i;
    let new_description = req.body.new_d;
    let list_id = req.params.id;

    const new_todo_item = {
        _id: uuid.v4(), // generate unique ID
        title: new_item,
        description: new_description
    }

    list_item.findById(list_id)
        .then(function (list) {
            list.items_lists.push(new_todo_item);
            list.save()
                .then(function () {
                    res.redirect(`/home/${list.title}`);
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).send("Error saving todo item.");
                });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send("Error finding list.");
        });
});


app.post('/delete_item/:listId/:itemId', (req, res) => {
    let listId = req.params.listId;
    let itemId = req.params.itemId;

    list_item.findByIdAndUpdate(listId, { $pull: { items_lists: { _id: itemId } } }, { new: true })
        .then(function (updatedList) {
            res.redirect(`/home/${updatedList.title}`);
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send("Error deleting todo item.");
        });
});

