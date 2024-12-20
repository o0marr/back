
const express = require("express");

const app = express();

const {body, validationResult} = require('express-validator');

app.use(express.json());

let {courses}= require  ("./data/courses");


//get all courses
app.get("/api/courses", (req, res) => {
    res.json(courses);
});
// get single course
app.get("/api/courses/:courseId", (req, res) =>   {
    const courseId = +req.params.courseId;
    const course = courses.find((course)=> course.id === courseId );
    if (!course) {
        return res.status(404).json({msg: "course not found"});
    }  
    res.json(course);

}

);
//create a new course
app.post('/api/courses',
   [ body('title').
notEmpty().
withMessage("title is required").
isLength({min:2}).
withMessage("title is at least is 2 chars"),

body('price')
.notEmpty().
withMessage("title is required")

]
, (req, res) => {

    console.log(req.body);
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
    return res.status(400).json(errors.array());

   }

   const course ={id: courses.length +1, ...req.body};

   
    courses.push(course);

    res.status(201).json(course)
})

//Update course 
app.patch('/api/courses/:courseId',(req, res) => {
    const courseId = +req.params.courseId;
    let course =courses.find((course) => course.id === courseId);
    if (!course) {
        return res.status(404).json({msg: "course not found"});
    }  

    course = {...course, ...req.body};
    res.status(200).json(course);
})

//delete course
app.delete('/api/courses/:courseId',(req, res) => {
    const courseId = +req.params.courseId;
    courses = courses.filter((course)=> course.id != courseId);

    res.status(200).json({success:true})


})

app.listen(5000, ()=> { 
    console.log('listening on port : 5000 ');
    
} );
