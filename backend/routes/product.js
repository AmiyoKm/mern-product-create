import express from "express";

const router = express.Router();
import {getAllProducts , getProduct , createProduct , updateProduct , deleteProduct} from '../controller/product.js'


router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)


export default router