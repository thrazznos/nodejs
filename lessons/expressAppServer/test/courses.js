// RESOURCES:
// https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai
// https://www.chaijs.com/plugins/chai-http/
// https://devhints.io/chai
// https://stackoverflow.com/questions/43320699/chai-response-body-is-always-empty


// TO RUN: npm test

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http')

//let server = require('../index') //Brings in the server code for chaiRequest to use
const server = 'http://localhost:3000'; //Uses a local running server

let should = chai.should(); 

chai.use(chaiHttp)


describe('Courses API', () => {
    describe('Get Request', () => {
        it('should return 200 status for valid course get', (done) => {
            chai.request(server)
            .get('/api/courses/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('id').eql(1)
                res.body.should.have.property('name').eql('course1')
                done();
            })
        })
        it('should return 404 if the course doesn\'t exist', (done) => {
            chai.request(server)
            .get('/api/courses/10')
            .end((err, res) => {    
                res.should.have.status(404);
                expect(res).to.be.html;
                res.text.should.be.eql('Course not found') //must use text field for content type text/html
                done();
            })
        })
        it('should return 404 if no course number', (done) => {
            chai.request(server)
            .get('/api/courses/')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
        })
    })
    describe('Post Request', () => {
        it('can create a new course', (done) => {
            let course = {
                name: "Test Course"
            }

            chai.request(server)
            .post('/api/courses')
            .send(course)
            .end((err, res) => {
                //res.text.should.be.eql('Hello')
                res.should.have.status(200)
                res.body.should.have.property('name').eql('Test Course')
                res.body.should.have.property('id')
                done();
            })
        })
        it('requires a name property for course', (done) => {
            let course = {
                NOTname: "somename"
            }
            chai.request(server)
            .post('/api/courses')
            .send(course)
            .end((err, res) => {
                res.should.have.status(400)
                res.text.length.should.not.be.eql(0)
                done();
            })
        })
        it('requires course with name > 3 characters', (done) => {
            let course = {
                name: "Te"
            }
            chai.request(server)
            .post('/api/courses')
            .send(course)
            .end((err, res) => {
                res.should.have.status(400)
                res.text.length.should.not.be.eql(0)
                done();
            })
        })
    })
})