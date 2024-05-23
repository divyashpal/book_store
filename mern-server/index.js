const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')
const stripe = require("stripe")("sk_test_51Ox301SJZ7HGVRik2prd19IDLE7lgiFrb8rzJl6Sqe1o6ipMeypIUaLjnlNzYSd1ZgGJRSB52ly3FCea0eSgwuns005pewmhzK")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//middleware
app.use(cors());
app.use(express.json());

const SECRET_KEY = "your_secret_key";

//password - Bookstore0001


//Endpoint to create a payment intent
app.post("/create-checkout-session", async (req, res) => {
    const products = req.body.products;
    
    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.bookTitle
            },
            unit_amount:product.price * 100,
        },
        quantity:product.quantity
    }));
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:5173/sucess",
        cancel_url:"http://localhost:5173/cancel"
    });

    res.json({id:session.id})
})

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
        const userCollection = client.db("BookInventory").collection("users");
        const bookCollections = client.db("BookInventory").collection("books");
        const cartCollection = client.db("BookInventory").collection("cart"); // New collection for the cart

        // Admin Registration route
        app.post('/register', async (req, res) => {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = {
                username,
                password: hashedPassword
            };

            try {
                const result = await userCollection.insertOne(user);
                res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
            } catch (error) {
                res.status(500).json({ message: "Error registering user", error });
            }
        });

        // Login route
        app.post('/login', async (req, res) => {
            const { username, password } = req.body;

            try {
                const user = await userCollection.findOne({ username });

                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return res.status(401).json({ message: "Invalid password" });
                }

                const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

                res.status(200).json({ message: "Login successful", token });
            } catch (error) {
                res.status(500).json({ message: "Error logging in", error });
                console.log(error);
            }
        });

        // Middleware to protect routes
        function authenticateToken(req, res, next) {
            const token = req.headers['authorization'];

            if (!token) {
                return res.status(401).json({ message: "Access token required" });
            }

            jwt.verify(token, SECRET_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid token" });
                }

                req.user = user;
                next();
            });
        }

        // Example of a protected route
        app.get('/protected', authenticateToken, (req, res) => {
            res.status(200).json({ message: "This is a protected route" });
        });

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

            // Add quantity property to the book object with an initial value of 1
            const itemToAdd = { ...book, quantity: 1 };

            // Add book to the cart collection
            const result = await cartCollection.insertOne(itemToAdd);
            res.send(result);
        });

        // Get all items from the cart
        app.get("/cart", async (req, res) => {
            const items = await cartCollection.find().toArray();
            res.send(items);
        });

        
        app.put("/change-quantity/:id", async (req, res) => {
            const bookId = req.params.id;
            const { quantityChange } = req.body;

            // Ensure quantityChange is a valid number
            if (typeof quantityChange !== "number") {
                return res.status(400).json({ message: "Invalid quantity change" });
            }

            try {
                // Find the item in the cart
                const item = await cartCollection.findOne({ _id: new ObjectId(bookId) });
                if (!item) {
                    return res.status(404).json({ message: "Item not found in the cart" });
                }

                // Update the quantity of the item
                const updatedQuantity = item.quantity + quantityChange;
                if (updatedQuantity < 1) {
                    // If the updated quantity is less than 1, remove the item from the cart
                    await cartCollection.deleteOne({ _id: new ObjectId(bookId) });
                    return res.status(200).json({ message: "Item removed from cart" }); // Return a JSON object here
                } else {
                    // Otherwise, update the quantity and total price of the item
                    const updatedTotalPrice = item.price * updatedQuantity;
                    const result = await cartCollection.findOneAndUpdate(
                        { _id: new ObjectId(bookId) },
                        { $set: { quantity: updatedQuantity, totalPrice: updatedTotalPrice } },
                        { returnOriginal: false }
                    );
                    //console.log(result);
                    return res.status(200).json(result); // Return a JSON object here
                }
            } catch (error) {
                console.error("Error changing quantity:", error);
                return res.status(500).json({ message: "Failed to change quantity" }); // Return a JSON object here
            }
        });

        // Remove item from cart
        app.delete("/remove-from-cart/:id", async (req, res) => {
            const bookId = req.params.id;
            const result = await cartCollection.deleteOne({ _id: new ObjectId(bookId) });

            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Book not found in the cart" });
            }
            res.json({ message: "Book removed from cart" });
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