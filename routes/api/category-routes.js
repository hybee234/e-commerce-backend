const router = require('express').Router();
const { Category, Product } = require('../../models');

// http://localhost:3001/api/categories

// GET all Categories and associated Products
router.get('/', async (req, res) => {
    try {
    const getAllCategory = await Category.findAll({
        include: [{ model: Product }]        
    });    
    res.status(200).json(getAllCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});


// GET ONE Category by ID + associated products
router.get('/:id', async (req, res) => {
    try {
        const getOneCategory = await Category.findByPk(req.params.id, {
            include: [{ model: Product }],
        });

        if (!getOneCategory) {
            res.status(404).json({
                status: "404: ID Not found",
                message: "Category with this ID doesn't exist, please double check and try again" });
            return;
        }
        res.status(200).json(getOneCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});


// POST new Category
router.post('/', async (req, res) => {
    try {
        const postNewCategory = await Category.create(req.body);
        res.status(200).json(postNewCategory);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT - Update category by ID
router.put('/:id', async (req, res) => {
    try {
        const putCategory = await Category.update( 
            {
                category_name: req.body.category_name,        
            },
            {
                where: {  
                    id: req.params.id,
                },
            }        
        )
        console.log (putCategory)
        if (putCategory[0] === 0) {              // Category.update returns an array, index 0 is the number of rows affected, zero means nothing qualifies
            res.status(404).json({
                status: "404: ID Not found",
                message: "Category with this ID doesn't exist, please double check and try again" });
            return;
        }
        res.json(`Category ID ${req.params.id} updated to ${req.body.category_name}`);
    } catch (err) {
        res.status(500).json(err);
    }        
});

//DELETE Category by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleteCategory = await Category.destroy({ where: { id: req.params.id, },})

        console.log(deleteCategory)
        if (!deleteCategory) {
            res.status(404).json({
                status: "404: ID Not found",
                message: "Category with this ID doesn't exist, please double check and try again" });
            return;
        }
        res.json(`Category ID ${req.params.id} has been deleted`);
    } catch (err) {
        res.status(500).json(err);
    }        
});

module.exports = router;
