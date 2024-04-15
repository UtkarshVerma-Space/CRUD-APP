const express = require("express")
const app = express()
const ejs = require("ejs")
// Requiring Mongoose
const mongoose = require("mongoose")




// Connecting and Creating Database
mongoose.connect("mongodb://localhost:27017/MyUsersDB")


// Schema for DB
const Schema = ({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
})

const allUsers = mongoose.model("User",Schema);


// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))

// To Access CSS AND JS FOR EJS
app.use(express.static('public'))



// Form Page / Main Page
app.get('/', (req, res) => {
    res.render('index');
});




// Getting All The Users form Mongo DB HTML
app.get('/allUsers', (req, res) => {
    res.render('allusers');
});
// Getting All The Users form Mongo DB API
app.get('/api/allUsers', async(req, res) => {
        const users = await allUsers.find();
        res.json(users)
});









// Creating new User and displaying 
app.post("/", async (req,res)=>{
    const first_name = req.body.first_name;
    const last_name = req.body.last_name
    const email = req.body.email;

    await allUsers.create({
        first_name:first_name,
        last_name:last_name,
        email:email
    })

    res.render('created', { first_name: first_name,last_name:last_name, email:email });
})



// Delete user
app.get('/delete', (req, res) => {
    res.render('delete');
});


// Creating new User and displaying 
app.post("/delete", async (req,res)=>{
    const deleteduser =await allUsers.findByIdAndDelete(req.body.id)
    const whodeleted = `User with Fname: ${deleteduser.first_name} deleted.`
    res.render('delete');
})




// Listning on Port
app.listen(3000)