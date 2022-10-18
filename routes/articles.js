const express = require('express');
const router = express.Router();
const Article = require('./../models/article');

router.get('/new', (req, res) => {
    res.render('new', {article: new Article()});
})

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('show', {article: article});
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('edit', {article: article});
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        article = await article.save();
        res.redirect(`articles/${article.id}`)
    }catch(e){
        res.render('new', {article: article});
    }
})


router.put('/:id',async (req, res) => {
    req.article = await Article.findById(req.params.id);
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try{
        article = await article.save();
        console.log("we are here");
        res.redirect(`/articles/${article.id}`);
    }catch(err){
        res.render('articles/edit',{article: article});
    }
})


router.delete('/:id', async(req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})



module.exports = router;