import { addproduct, getproduct, getproductbytype } from "../controllers/product.controller";
import auth from "../middleware/autho";
import { Router } from "express";
import { register, login, profile } from "../controllers/user.controller";

const router: Router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/profile', profile)
router.post('/addproduct', auth, addproduct)
router.post('/getproduct', auth, getproduct)
router.post('/getproductbytype', auth, getproductbytype)


export default router;