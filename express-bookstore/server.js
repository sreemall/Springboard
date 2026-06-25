/** Server for bookstore. */


const app = require("./app");

console.log("9999  in server.js")
app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
