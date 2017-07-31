let express = require("express");
let bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.urlencoded({extended: true}));

const rootPage = `
<form action="/welcome" method="post">
    <input name="name" placeholder="Your Name"/>
    <input type="submit"/>
</form>
`;

const welcomePage = `
Hello %%NAME%%!
<a href="/">Return</a>
`;

app.get("/", (req, res, next) => {
    console.log("entered website");
    next();
});

app.get("/", (req, res, next) => {
    res.send(rootPage);
});


app.post("/welcome", (req, res)=>{
    let {name} = req.body;
    res.send( welcomePage.replace("%%NAME%%", name) );
});

app.listen(8080);
