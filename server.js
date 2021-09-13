const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Expert = require("./models/experts")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/expertDB",{useNewUrlParser: true})

app.route('/experts')
.get( (req,res)=>{
    Expert.find((err, expertList)=>{
        if (err) {res.send(err)}
        else {res.send(expertList)}
    })
})
.post( (req,res)=>{
    const expert = new Expert({
        _id : req.body.id,
        expert_name : req.body.name,
        address : req.body.address,
        mobile : req.body.mobile,
        password : req.body.password
    })
    expert.save((err) => {
        if (err) {res.send(err)}
        else res.send('Sucessfully added an expert!')
    })
})
.delete( (req,res)=> {
    Expert.deleteMany((err)=>{
        if (err) {res.send(err)}
        else {res.send('Successfully deleted all experts!')}
    })
})

app.route('/experts/:id')
.get( (req,res)=>{
    Expert.findOne({_id : req.params.id}, (err, foundExpert)=>{
        if (foundExpert) {res.send(foundExpert)}
        else {res.send('No matched expert found!')}
    })
})
.put( (req,res)=>{
    Expert.updateOne(
        {_id : req.params.id},
        {expert_name : req.body.name,
        address : req.body.address,
        mobile : req.body.mobile,
        password : req.body.password},
        (err)=>{
            if (err) {res.send(err)}
            else {res.send('Successfully update!')}
        }
    )
})
.patch( (req,res)=>{
    Expert.updateOne(
        {_id : req.params.id},
        {$set: req.body},
        (err)=>{
            if (err) {res.send(err)}
            else {res.send('Successfully updated!')}
        }
    )
})
.delete( (req,res)=> {
    Expert.deleteOne(
        {_id : req.params.id},
        (err)=>{
            if (err) {res.send(err)}
            else {res.send('Successfully deleted one expert!')}
        }
    )
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Server started on port 5000');
})
