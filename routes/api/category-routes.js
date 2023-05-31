const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
 try {
  const categoryData = await Category.findAll({include: [{model:Product}]});
  res.status(200),json(categoryData);
 } catch (err) {
  res.status(500).json(err)
 }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model:Product}]
    });
res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body,{category_name:req.body.category_name})
  .then((updatedCategory) => res.status(200).json(updatedCategory))
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedCategory) => res.json(updatedCategory))
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });     
        res.status(200).json(categoryData);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;
