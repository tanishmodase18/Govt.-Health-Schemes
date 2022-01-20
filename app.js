const express =  require('express'),
      app     =  express(),
      path    =  require("path");

      
app.use(express.static("views"));

app.get("/home", (req,res) =>{
    res.sendFile(path.join(__dirname ,"views/components/index.html"));
})

app.get('/scheme1', (req, res) => {
    res.sendFile(path.join(__dirname ,"views/components/scheme1.html"));
})

app.get("/", (req,res) =>{
    res.render("user.ejs")
})

app.get("/register", (req,res) =>{
    res.render("register.ejs")
})

app.listen(3000, () => {
    console.log("Server Started At Port 3000");
});