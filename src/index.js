const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");


const templatePath = path.join(__dirname, "../template");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.static(path.join(__dirname, "../public")));


// View Engine Setup
app.set("view engine", "hbs");
app.set("views", templatePath);

// Routes
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});


app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    try {
        // Check if user already exists
        const existingUser = await collection.findOne({ name: data.name });

        if (existingUser) {
            // User exists, send message or redirect
            res.send("User already exists. Please login or use another name.");
        } else {
            // Insert new user
            await collection.insertOne(data);
            res.render("Home"); // Make sure Home.hbs exists
        }
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).send("Internal Server Error");
    }
});




app.post("/login", async (req, res) => { 
    try{
        const check =await collection.findOne({name:req.body.name})

        if(check.password === req.body.password){

            res.render("Home")
        }else{
            res.send("Wrong Password")
        }
    }
    catch{

        res.send("Wrong detailed")
    }
    
});



app.listen(3000, () => {
    console.log("Port has connected");
});
