import express  from "express";
import {deleteProductById, getProductById, getProductData, postProductData, updateProductById} from "../controller/product-controller.js"

const productRoute= express.Router();

productRoute.post("/postProduct", postProductData),
productRoute.get("/getProduct",getProductData),
productRoute.get("/getProduct/:id",getProductById),
productRoute.put("/updateProduct/:id",updateProductById),
productRoute.delete("/deleteProduct/:id",deleteProductById)


export default productRoute;