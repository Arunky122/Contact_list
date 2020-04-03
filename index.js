const express=require('express');
const path=require('path');
const port=8000;

const db = require('./config/mongoose');

const Contact = require('./models/contact.js')

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));


var contactList=[
    {
        name:"arun",
        phone:"9088787"
    },
    {
        name:"kashina",
        phone:"9088789787"
    },
    {
        name:"vanshika",
        phone:"9087"
    }
]

app.get('/',function(req,res){

    Contact.find({ },function(err,contacts){
        if(err){
            console.log('error in fetching contacts from the db');
            return;
        }
        return res.render('home',
    {
        title:' My Contacts List',
        contact_list:contacts
    });
    });

    
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "HEYYYY"
    });
});


app.post('/create-contact',function(req,res){
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('********',newContact);
        return res.redirect('back');
    })

    
});

// FOR DELETING THE CONTACT

app.get('/delete-contact/',function(req,res){
    // GET THE ID FROM QUERY IN THE URL

    let id=req.query.id;
    //  find the contactin the database using id and delete

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleteing an objecft from database");
            return;
        }
        return res.redirect('back');
    });

    
});


app.listen(port,function(err){
    if(err){
        console.log(" Error swith the server",err);

    }

    console.log("yupp !!! my server is running on port : ", port);
});