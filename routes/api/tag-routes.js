const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// http://localhost:3001/api/tags

// GET all Tags and associated Products
router.get('/', async (req, res) => {
    try {        
        const getAllTag = await Tag.findAll({
            attributes: ['id', 'tag_name'],
            include: [{ model: Product}]        
        });    
        res.status(200).json(getAllTag);
        } catch (err) {
            res.status(500).json(err);
        }
});

// GET ONE Tag by ID + associated products
router.get('/:id', async (req, res) => {
    try {
        const getOneTag = await Tag.findByPk(req.params.id, {
            include: [{ model: Product }],
        });

        if (!getOneTag) {
            res.status(404).json({
                status: "404: ID Not found",
                message: "Tag with this ID doesn't exist, please double check and try again" });
            return;
        }
        res.status(200).json(getOneTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST new Tag
router.post('/', async (req, res) => {
    try {
        const postNewTag = await Tag.create(req.body);
        res.status(200).json(postNewTag);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT - Update Tag by ID
router.put('/:id', async (req, res) => {
    try {
        const putTag = await Tag.update( 
            {
                tag_name: req.body.tag_name,        
            },
            {
                where: {  
                    id: req.params.id,
                },
            }        
        )
        console.log (putTag[0])
        if (putTag[0] === 0) {              // Category.update returns an array, index 0 is the number of rows affected, zero means nothing qualifies
            res.status(404).json({
                status: "404: ID Not found or no change",
                message: "Tag with this ID doesn't exist (or no values have changed), please double check and try again" });
            return;
        }
        res.json(`Tag ID ${req.params.id} updated to ${req.body.tag_name}`);
    } catch (err) {
        res.status(500).json(err);
    }        
});

// DELETE Tag by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleteTag = await Tag.destroy({ where: { id: req.params.id, },})

        console.log(deleteTag)
        if (!deleteTag) {
            res.status(404).json({
                status: "404: ID Not found",
                message: "Tag with this ID doesn't exist, please double check and try again" });
            return;
        }
        res.json(`Tag ID ${req.params.id} has been deleted`);
    } catch (err) {
        res.status(500).json(err);
    }        
});

module.exports = router;
