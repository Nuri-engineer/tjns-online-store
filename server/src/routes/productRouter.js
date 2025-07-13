const productRouter = require('express').Router();
const ProductController = require('../controllers/ProductController');
const upload = require('../middlewares/multer');

productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/category/:id', ProductController.getAllProductsByCategoryId);
productRouter.get('/:id', ProductController.getProductById);

productRouter.post('/', upload.array('images'), ProductController.createProduct);
productRouter.put('/:id', upload.array('images'), ProductController.updatePost);
productRouter.delete('/:id', ProductController.deletePost);

module.exports = productRouter;
