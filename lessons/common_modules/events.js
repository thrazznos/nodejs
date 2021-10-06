const EventEmitter = require('events') //This module returns a class
const emitter = new EventEmitter(); //An instance of the class

emitter.on('messageLogged', function(arg) {    //Registration of the fired event
    console.log(arg.message);
})

emitter.emit('messageLogged', {message: 'Custom Message'}) //Trigger the event