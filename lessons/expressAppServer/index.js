//const { response } = require('express');
const express = require('express')
const app = express();

//middleware that enables response json parsing
//app.use(express.json)

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

app.get('/api/staticcourses', (req, resp) => {
    resp.send([1, 2, 3])
})

//Route Parameters example
app.get('/api/posts/:year/:month', (req, resp) => {
    resp.send(req.params);
})

//GET with a parameter that searches an array
app.get('/api/courses/:id', (req, resp) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){ resp.status(404).send("Course not found")}
    resp.send(course)
})

app.post('/api/course', (req, resp) => {
    if(!body.name) {resp.status(500).send("Course name missing")}
    else {
        const course = {
            id: courses.length + 1,
            name: req.body.name
        }
        courses.push(course);
        resp.send(course);
    }
})

//Query parameters example
//localhost:5000/api/queries?somevalue=1&othervalue=2
app.get('/api/queries', (req, resp) => {
    resp.send(req.query)
})

const port = process.env.port || 3000 //Pulls from $ENV:PORT if it exists

app.listen(port, () => console.log(`Listening on port ${port}....`))