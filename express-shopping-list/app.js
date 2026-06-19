const express = require ("express");

const items = require ("./fakeDb");


const app = express();

app.use(express.json());

app.use ((req, res, next) => {
    console.log ("Server received request: ", req.method, req.url);
    next();
});


app.get ("/items", (req, res, next) => {
    try {
        //console.log ("GET request on /items  logged");
        res.send(items);
    }
    catch (e) {
        next (e);
    }
});

app.get('/items/:name', (req, res, next) => {
    try {
        const name = req.params.name;
        //console.log ("get by name: ", name, items[0].name, items[0].name === name);
        res.json(items.find(item => item.name === name));
    }
    catch (e) {
        next (e);
    }
});

app.post ("/items", (req, res, next) => {
    try {
        //console.log("POST request ", req.body);
        addItem (req.body);
        res.status(201).json({"added":req.body});
    }
    catch (e) {
        next (e);
    }
})

app.patch ("/items/:name", (req, res, next) => {
    const name = req.params.name;
    let item = items.find(item => item.name === name);
    item.name = req.body.name;
    item.price = req.body.price;

    res.json({"updated": item});
});

app.delete ("/items/:name", (req, res, next) => {
    const name = req.params.name;
    const index = items.findIndex ((item) => item.name === name);
    items.splice(index, 1)

    res.json({message: "Deleted"});
})

app.use ((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;
    res.status(status).json({error: {message, status}});
});

app.listen (8080, () => {console.log ("Server is listening at port 3000")});

function addItem (item) {
    items.push(item);
}

