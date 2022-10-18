const express = require('express');
const bodyParser = require('body-parser');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost/blog');
// set view engine
app.set('view engine', 'ejs');


// use middlewares
// app.use(express.bodyParser());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/articles', articleRouter);

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: -1})
    res.render('index', {articles: articles});
})

app.listen(3000, ()=>{
    console.log('listening on port 3000...');
})