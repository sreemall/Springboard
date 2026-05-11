const fs = require ("fs");
const axios = require ("axios");

function cat (path, outFile) {
    fs.readFile (path, "utf-8", (err, data) => {
        if (err) {
            console.log ("Error: ", err.message);
        }
        else {
            if (outFile != "")
                fs.writeFile (outFile, data, "utf-8", (err) => {
                                                        if (err)
                                                            console.log ("Error: ", err.message);
                                                    });
            else
                console.log (data);
        }
    })
}

async function webCat (url, outFile) {
    try {
        const res =  await axios.get (url);
        if (outFile != "")
            fs.writeFile (outFile, res.data, (err) => {
                                                    if (err)
                                                        console.log ("Error: ", err.message);
                                                    });
        
        else                                            
            console.log (res.data);
    }
    catch (err) {
        console.log ("Error: ", err.message);
    }

}

let outputFile = "";
let url = "";
let inputFile = "";
const args = process.argv;

for (let i=2; i<args.length; i++) {
    if (args[i].startsWith ("--out")) {
        outputFile = args[++i];
    }
    else if (args[i].startsWith ("http:/") || args[i].startsWith("https:/"))
        url = args[i];
        
    else
        inputFile = args[i];
}

//console.log ("outfile ", outputFile, "inputFile=", inputFile, "url=", url);
if (url != "")
    webCat (url, outputFile);  
else if (inputFile != "")
    cat (inputFile, outputFile);

