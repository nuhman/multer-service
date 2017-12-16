const express = require('express');
const bodyparser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
    //res.sendFile(__dirname + '\\index.html');
    //res.render("index.ejs", {name: 'nuhman'});
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/fileupload', upload.single('filetoupload'), function (req, res, next) {        
    console.log(req.file);    
    res.json({
        "size in bytes": req.file.size        
    })
  });

app.get("/action", (req, res) => {
    //res.sendFile(__dirname + '\\index.html');
    var param = urldecode(req.params.date);
    param = param.trim();    
    res.send("notjasd");
});

// Respond not found to all the wrong routes
app.use(function(req, res, next){
    res.status(404);
    res.sendFile(process.cwd() + '/views/404.html');
});

// Error Middleware
app.use(function(err, req, res, next) {
    if(err) {
    res.status(err.status || 500)
        .type('txt')
        .send(err.message || 'SERVER ERROR');
    }  
});


app.listen(process.env.PORT || 3000, function () {
    console.log('the Node.js listening ...');
});
console.log('May Node be with you');


function urldecode(str) {
    return decodeURIComponent((str+'').replace(/\+/g, '%20'));
 }