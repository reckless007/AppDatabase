const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../modle/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// Get Data List
router.get('/' , (req,res) => 
Gig.findAll() 
.then(gigs => {
    
    res.render('gigs',{
        gigs
    });
})
.catch(err => console.log(err))
);
// Display add data form
router.get('/add',(req,res) => res.render('add'));
//Add a Data
router.post('/add',(req,res) =>{
 let {Title,Subject,Budget} = req.body;


let error = [];

//Validation
if(!Title)
{
    error.push({ text:'Please add the title' });
}
if(!Subject)
{
    error.push({ text:'Please add the Subject' });
}
if(!Budget)
{
    error.push({ text:'Please add the Price' });
}

//check fo error
if(error.length > 0)
{
res.render('add',{
  error,
  Title,
  Subject,
  Budget
});
}else{
//Insert into table
    Gig.create({
        Title,
        Subject,
        Budget
    })
    .then(gig => res.redirect('/gigs'))
    .catch(err => console.log(err));
 }
});


//Search for books
router.get('/search',(req,res) => {
  let { term } = req.query;

  // To Lower case
  term = term.toLowerCase();

  Gig.findAll({ where: { Subject: { [Op.like]: '%' + term + '%'} } })
    .then(gigs => res.render('gigs', {gigs}))
    .catch( err => console.log(err));
});

module.exports = router;