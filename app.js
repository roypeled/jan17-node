let express = require("express"),
    fs = require("fs");

let app = express();





app.get("/", (req, res) => {
    let messages = getMessages();

    let file = fs.readFileSync("./data.html", {encoding: 'utf-8'});
    file = file.replace("%%MESSAGES%%", messages.map(m => `<p>${m.user}: ${m.message}</p>`).join(""));
    file = file.replace("%%USER%%", req.query.user || "");
    res.send(file);
});


app.get("/addMessage", (req, res)=>{
    let messages = getMessages();

    let message = clean(req.query.message);
    let user = clean(req.query.user);
    messages.unshift({message, user});

    saveMessages(messages);

    res.redirect(`/?user=${req.query.user}`);
});








app.listen(8080);





function clean(txt){
    return txt.replace("+", " ").replace("<", "&lt;");
}

function saveMessages(messages) {
    fs.writeFileSync("./messages.json", JSON.stringify(messages));
}

function getMessages(){
    let msgs = fs.readFileSync("./messages.json", {encoding: 'utf-8'});
    if(!msgs)
        return [];
    return JSON.parse(msgs);
}


