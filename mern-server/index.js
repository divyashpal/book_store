const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')


//middleware
app.use(cors());
app.use(express.json());

//password - Bookstore0001


app.get('/', (req, res) => {
    res.send('Hello')
})

//mongodb configuration

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-store:Bookstore0001@cluster0.dofheg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // create a collection of documents
        const bookCollections = client.db("BookInventory").collection("books");
        const cartCollection = client.db("BookInventory").collection("cart"); // New collection for the cart


        //insert a book 
        app.post("/upload-book", async (req, res) => {
            const data = req.body;
            const result = await bookCollections.insertOne(data);
            res.send(result);
        })

        // Add item to cart
        app.post("/add-to-cart/:id", async (req, res) => {
            const bookId = req.params.id;
            const book = await bookCollections.findOne({ _id: new ObjectId(bookId) });

            if (!book) {
                return res.status(404).send("Book not found");
            }

            // Add book to the cart collection
            const result = await cartCollection.insertOne(book);
            res.send(result);
        });

        // Get all items from the cart
        app.get("/cart", async (req, res) => {
            const items = await cartCollection.find().toArray();
            res.send(items);
        });

        // Remove item from cart
        app.delete("/remove-from-cart/:id", async (req, res) => {
            const bookId = req.params.id;
            const result = await cartCollection.deleteOne({ _id: new ObjectId(bookId) });

            if (result.deletedCount === 0) {
                return res.status(404).json({error: "Book not found in the cart"});
            }

            res.json({message: "Book removed from cart"});
        });

        //get all books from database
        // app.get("/all-books", async (req, res) => {
        //     const books = bookCollections.find();
        //     const result = await books.toArray();
        //     res.send(result);
        // })

        //update a book data : path or update methods
        app.patch("/book/:id", async (req, res) => {
            const id = req.params.id;
            //console.log(id);
            const updateBookData = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upset: true };

            const updateDoc = {
                $set: {
                    ...updateBookData
                }
            }
            //update
            const result = await bookCollections.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        //delete a book data
        app.delete("/book/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await bookCollections.deleteOne(filter);
            res.send(result);
        })

        //find by category
        app.get("/all-books", async (req, res) => {
            let query = {};
            if (req.query?.category) {
                query = { category: req.query.category }
            }
            const result = await bookCollections.find(query).toArray();
            res.send(result);
        })

        // to get single book data
        app.get("/book/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await bookCollections.findOne(filter);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`App listening of port ${port}`)
})