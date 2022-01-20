const express               =  require('express'),
      app                   =  express(),
      mongoose              =  require("mongoose"),
      passport              =  require("passport"),
      bodyParser            =  require("body-parser"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      User                  =  require("./models/user");
      path                  =  require("path");

mongoose.connect("mongodb://localhost/auth_demo");

app.use(require("express-session") ({
    secret:"Any normal Word",
    resave: false,
    saveUninitialized: false
}));

passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("views"));

app.get("/home", isLoggedIn, (req,res) =>{
    res.sendFile(path.join(__dirname ,"views/components/index.html"));
})

app.get('/scheme1', (req, res) => {
    res.sendFile(path.join(__dirname ,"views/components/scheme1.html"));
})

app.get("/", (req,res) =>{
    res.render("user.ejs")
})

app.post("/", passport.authenticate("local",{
    successRedirect:"/home",
    failureRedirect:"/"
}), function (req,res) {
})

app.get("/register", (req,res) =>{
    res.render("register.ejs")
})

app.post("/register", (req,res) =>{
    User.register(new User({username: req.body.username,email: req.body.email}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/login");
        })    
    })
})

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, () => {
    console.log("Server Started At Port 3000");
});