const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {

    if(file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

const userPosts = [
    /*{
        image: 'http://localhost:8080/images/reactHooks.png',
        group: 'web technologies',
        tag: '@danabramov',
        comment: 'react hooks'
    },
    {
        image: 'http://localhost:8080/images/telegram.png',
        group: 'mobile apps',
        tag: '@paveldurov',
        comment: 'telegram mobile'
    },
    {
        image: 'http://localhost:8080/images/facebook.png',
        group: 'social networks',
        tag: '@markzuckerberg',
        comment: 'facebook'
    }*/
];

app.get('/userPosts', async (req,res) => {
    return res.status(200).send({userPosts});
});

app.post('/userPost', async (req,res) => {
    if(!req.body) {
        return res.status(401).send({errorMsg:'post saving failed!'});
    }
    userPosts.push(req.body);
    return res.status(200).send({successfulMsg:'post text content saved!'});
});

app.post('/userPostImage', upload.single('file'), async (req,res) => {
    if(!req.file || typeof req.file === 'undefined') {
        console.log("here");
        return res.status(404).send({errorMsg:'no image found!'});
    }
    const image = 'http://'+req.headers.host+"/images/"+req.file.filename;
    userPosts[userPosts.length-1].image = image;
    return res.status(200).send({image, successfulMsg: 'post image saved!'});
});

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`server starts on ${PORT}th port`);
})