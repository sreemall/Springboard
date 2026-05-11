const fs = require ("fs");

function cat (path) {
    
    fs.readFile (path, "utf-8", (err, data) => {
        if (err) {
            console.log (`${err}`);
        }
        else
            console.log (data);
    })
}

cat (process.argv[2])
