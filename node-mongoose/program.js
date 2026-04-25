const connect = require("./db");


const runDatabaseQueries = async () => {
  
  const db = await connect();
  const movies = db.collection('movies');
  const users = db.collection('users');
  const comments = db.collection('comments');


  // Run this query, should get top 5 best rated movies on IMDB
  const topMovies = await movies.find({ "imdb.rating": { $gt: 8.0 } })
    .project({ title: 1, year: 1, "imdb.rating": 1 })
    .sort({ "imdb.rating": -1 })
    .limit(5)
    .toArray();

  console.log('Top Rated Movies:', topMovies);

    //Create
    users.insertOne ( {name: "Subhash Bose", email: "subhash.bose@gmail.com"} );

    //Read
    movies.find ({directors: "Christopher Nolan"});
    movies.find ({genres: "Action"}).sort({year:-1});
    movies.find({"imdb.rating": {$gt:8}}, {title:1, imdb:1, _id: 0});
    movies.find({cast: {$all: ["Tom Hanks", "Tim Allen"]}});
    movies.find({cast: ["Tom Hanks", "Tim Allen"]});
    movies.find({$and: [{genres: "Comedy"}, {directors: "Steven Spielberg"}]});

    //Update
    movies.updateOne({title: "The Matrix"}, {$set: {available_on: "Sflix"}});
    movies.updateOne({title: "The Matrix"}, {$inc: {metacritic: 1}});
    movies.updateMany({ year: 1997 }, {$push: {genres: "Gen Z"}});
    movies.updateMany ({ "imdb.rating": {$lt: 5}}, {$inc:{"imdb.rating": 1}})

    //Delete
    const commentId = comments.findOne()._id;
    comments.deleteOne({_id: commentId});

    const movieId = movies.findOne ({title: "The Matrix"}, {_id: 1})._id;
    comments.deleteMany({movie_id: movieId});

    movies.deleteMany ({"genres": {$exists: false}});

    //Aggregate
    movies.aggregate ([ 
              { $group: { _id: "$year", count: {$sum: 1} }
              },
              { $project: { _id: 0, year: "$_id", count: 1 }
              },
              { $sort: {year:1}
              }
              ]);

    movies.aggregate ([
            { $unwind: "$directors"
            },
            { $group: { _id: "$directors", avg_rating: {$avg: "$imdb.rating"} }
            },
            { $project: { director: "$_id", avg_rating: 1, _id: 0 }
            },
            { $sort: {avg_rating: -1 }
            }
          ]);

  console.log('Top Rated Movies:', topMovies);

  process.exit(0);
};


runDatabaseQueries();