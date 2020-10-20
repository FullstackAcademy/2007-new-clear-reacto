const router = require('express').Router()
const { Book, Author, Genre } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        res.send(await Book.findAll({
            include: [Author, Genre]
        }));
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.send(await Book.findByPk(req.params.id, {
            include: [Author, Genre]
        }));
    }
    catch (err) {
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try {
        const newAuthor = await Author.findOrCreateAuthor(req.body.authorFirstName, req.body.authorLastName)

        delete req.body.authorFirstName;
        delete req.body.authorLastName;

        const response = await Book.create({
            ...req.body,
            authorId: newAuthor.id
        });

        res.send(response);
    }
    catch(err) {
        next(err)
    }
})

router.put('/:bookId', async (req,res,next) => {
    try {
        const book = Book.findByPk(req.params.bookId);

        let keys = Object.keys(req.body)

        if (keys.includes('authorFirstName') || keys.includes('authorLastName')) {
            const newAuthor = await Author.findOrCreateAuthor(req.body.authorFirstName, req.body.authorLastName)
    
            delete req.body.authorFirstName;
            delete req.body.authorLastName;

            const newBody = {
                ...req.body,
                authorId: newAuthor.id
            }
        }
        else {
            const newBody = req.body
        }

        const response = await book.update(newBody);

        res.send(response);
    }
    catch(err) {
        next(err)
    }
})

router.delete('/:bookId', async (req,res,next) => {
    try {
        const findBook = await Book.findByPk(req.params.bookId);
        await findBook.destroy();
        res.sendStatus(204);
    }
    catch(err) {
        next(err);
    }
})



module.exports = router