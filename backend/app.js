//Loading modules and setting up app
const express = require("express");
const app = express();

const portNumber = process.argv[2];



//Run the app
app.listen(portNumber);
console.log("Running app at localhost: " + portNumber);