const express = require ("express");
const dotenv = require ("dotenv");
const connectDatabase = require ("./database/db");
const cors = require ("cors");
const userRouter = require ("./routes/userRouter");
const dogRouter = require ("./routes/dogRouter");
const {auth} = require ("./middlewares/auth");
const cookieParser = require ("cookie-parser");

dotenv.config ();
const app = express();
connectDatabase ();

app.use (cors());
app.use (express.json ());
app.use (cookieParser ());

app.use ("/users", userRouter);
app.use ("/dogs", auth, dogRouter);



app.use((req, res) => {
    console.log ("Sorry, can't find that!", req.path);
    return res.status(404).json("Sorry, Can't find that API!");
  });

// app.listen (process.env.PORT, () => {
//     console.log ("Server is listening at port ", process.env.PORT);
// })

module.exports = app;
