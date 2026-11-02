const mongoose = require ("mongoose");

const connectDatabase = async () => {
    try {
        const dbConnection = await mongoose.connect (`${process.env.MONGODB_URI}/${process.env.DB_NAME}`
            // {
            // useUnifiedTopology: true,
            // useNewUrlParser: true
            // }
        );
        // console.log ("connection=", connection);
        console.log (`Connected to : ${dbConnection.connection.name} Database is connected with ${dbConnection.connection.host} as host and 
                ${dbConnection.connection.port} as port`)
        console.log ("Mongoose connected to : ", mongoose.connection.name);
    }
    catch (error) {
        console.error (`Error : ${error.message}`)
        process.exit (1);
    }
}

module.exports = connectDatabase;
