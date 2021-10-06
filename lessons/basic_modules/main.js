//Exmaple of how to import a module and use its components

//We have the power to overwrite our imported modules, which is bad, so use const instead of var
const HelloWorldModule = require('./module.js')
console.log(HelloWorldModule.message)

//Bringing in the module this way, when it only exports a single function, allows us to call the object like a function
const conciseHelloModuleFunc = require('./concise_helloWorld.js')

conciseHelloModuleFunc()