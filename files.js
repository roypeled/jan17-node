let express = require("express");
let serveIndex = require("serve-index");

let app = express();


app.use("/public", serveIndex(__dirname+'/assets', {'icons': true}));
app.use("/public", express.static(__dirname+'/assets', {'icons': true}));

app.listen(8080);
