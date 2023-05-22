import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("sample_mflix");

       if (req.method === "POST") {
           // Extract the movie data from the request body
           const { title, plot, year } = req.body;

           // Create a new movie object
           const newMovie = {
               title,
               plot,
               year
           };

           // Insert the new movie into the collection
           const result = await db.collection("movies").insertOne(newMovie);

           res.status(201).json({ message: "Movie added successfully", movieId: result.insertedId });
       } else {
           // Retrieve the movies from the collection
           const movies = await db
               .collection("movies")
               .find({})
               .sort({ metacritic: -1 })
               .limit(10)
               .toArray();

           res.json(movies);
       }
   } catch (e) {
       console.error(e);
       res.status(500).json({ error: "An error occurred" });
   }
};