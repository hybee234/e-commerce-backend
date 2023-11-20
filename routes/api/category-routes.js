const router = require('express').Router();
const { Category, Product } = require('../../models');

// http://localhost:3001/api/categories

// GET all Categories and associated Products
router.get('/', async (req, res) => {
// find all categories
// be sure to include its associated Products 
    try {
    const categoryData = await Category.findAll({
        include: [{ model: Product }]        
    });    
    res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// GET ONE Category by ID + associated products
router.get('/:id', async (req, res) => {
    try {
    const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
    });

    if (!categoryData) {
        res.status(404).json({ message: 'No caategory found with that id!' });
        return;
    }
    res.status(200).json(categoryData);
    } catch (err) {
    res.status(500).json(err);
    }
});


// POST new Category
router.post('/', async (req, res) => {
try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT - update category by 'id' value
router.put('/:id', async (req, res) => {

Category.update( 
    {
        category_name: req.body.category_name,        
    },
    {
        where: {  
            id: req.params.id,
    },
    }
)
    .then(() => { 
                
    res.json(`Category ID ${req.params.id} updated to ${req.body.category_name}`);
    })
    .catch((err) => res.json(err));
});


router.delete('/:id', async (req, res) => {
// delete a category by its `id` value

Category.destroy({
    where: {
        id: req.params.id,
    },
})
    .then(() => {        
        res.json(`Category ID ${req.params.id} has been deleted`);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
