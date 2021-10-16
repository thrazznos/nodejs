//const { response } = require('express');
const { resolveSoa } = require('dns');
const express = require('express')
const app = express();
const Joi = require('joi');


//let morgan = require('morgan')
//let config = require('config');
//const c = require('config');

//don't show the log when it is test
//if(config.util.getEnv('NODE_ENV') !== 'test') {
    ////use morgan to log at command line
    //app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
//}


//middleware that enables response json parsing
app.use(express.json())

//app.get()
//app.put()
//app.post()
//app.delete()
//https://expressjs.com/en/4x/api.html#req

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'}
]

app.get('/', (req, resp) => {
    resp.send("Hello World Response!!!");
})

app.get('/api/courses', (req, resp) => {
    resp.send(courses)
})

//Route Parameters example
app.get('/api/posts/:year/:month', (req, resp) => {
    resp.send(req.params);
})

//GET with a parameter that searches an array
app.get('/api/courses/:id', (req, resp) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!req.params.id) { resp.status(500).send("Course Id Required")}
    else if(!course){ resp.status(404).send("Course not found")}
    resp.send(course)
})

app.post('/api/courses', (req, resp) => {
    const error = validateCourse(req.body)
    if(error) {
        resp.status(400).send(error.details[0].message)
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    resp.send(course);
})

app.put('/api/courses/:id', (req, resp) => {
    const error = validateCourse(req.body)
    if(error) {
        resp.status(400).send(error.details[0].message)
        return;
    }
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) resp.status(404).send("Course not found")

    course.name = req.body.name;
    resp.send(course);
})

//Query parameters example
//localhost:5000/api/queries?somevalue=1&othervalue=2
app.get('/api/queries', (req, resp) => {
    resp.send(req.query)
})


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const {error, value} = schema.validate(course)
    return error;
}

const port = process.env.port || 3000 //Pulls from $ENV:PORT if it exists

app.listen(port, () => console.log(`Listening on port ${port}....`))

module.exports = app; //For Testing