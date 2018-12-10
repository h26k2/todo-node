
const mongoose = require("mongoose");
const connection = require("./connection");
const todo = require("../models/todoModel");
const mongodb = require("mongodb");
const completedTodo = require("../models/completedTodoModel");

connection(mongoose);

const requests = (app) => {

    app.get('/',(req,res)=>{

        todo.find({},{todo : 1},(err,currentData)=>{
            
            if(err) throw err;

            completedTodo.find({},{todo : 1},(err,completedData)=>{

                if(err) throw err;

                let data = {
                    current : currentData,
                    completed : completedData
                }

                res.render('home',{data : data});

            }); 
            
        });

    });

    app.post('/',(req,res)=>{


        let task = todo({
            todo : req.body.todo
        }).save((err,data)=>{
            if(err) throw err;
            res.json(data);
        });


    });


    app.delete('/:todoType',(req,res)=>{

        let id = mongodb.ObjectID(`${req.body.objId}`);

        if(req.params.todoType === 'completed'){

            completedTodo.deleteOne({_id : id},(err,data)=>{

                if(err) throw err;

                res.json(data);

            });

        }

        else if(req.params.todoType === 'current'){

            todo.deleteOne({_id : id},(err,data)=>{

                if(err) throw err;

                res.json(data);

            });

        }

    });

    app.put('/:todoType',(req,res)=>{

        if(req.query.cbFunction === 'completed'){

        

            if(req.params.todoType === 'current'){

                let id = mongodb.ObjectID(`${req.body.objId}`);

                todo.findOneAndDelete({_id : id},(err,data)=>{
                    
                    if(err) throw err;

                    let task = completedTodo({
                        todo : data.todo
                    }).save((err,returnedData)=>{
                        if(err) throw err;
                        res.json(returnedData);
                    })

                })

            }

            else if(req.params.todoType === 'completed'){

                let id = mongodb.ObjectID(`${req.body.objId}`);

                completedTodo.findOneAndDelete({_id : id},(err,data)=>{
                    if(err) throw err;
                    let task = todo({
                        todo : data.todo
                    }).save((err,returnedData)=>{
                        if(err) throw err;
                        res.json(returnedData);
                    })
                })


            }
        }

        else if(req.query.cbFunction === 'edit'){

            let id = mongodb.ObjectID(`${req.params.todoType}`);
            let task = req.body.todo;

            todo.findOneAndUpdate({_id : id} ,{todo : task} ,(err,data)=>{
                if(err) throw err;
                res.json(data);
            })


        }

    });

    
}

module.exports = requests;