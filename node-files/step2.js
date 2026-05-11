const fs = require ("fs");
const axios = require ("axios");

function cat (path) {
    
    fs.readFile (path, "utf-8", (err, data) => {
        if (err) {
            console.log ("Error: ", err.message);
        }
        else
            console.log (data);
    })
}

async function webCat (url) {
    try {
        const res =  await axios.get (url);
        console.log (res.data);
    }
    catch (err) {
        console.log ("Error: ", err.message);
    }

}

if (process.argv[2].startsWith ("http:/") || process.argv[2].startsWith("https:/"))
    webCat (process.argv[2]);
else
    cat (process.argv[2]);