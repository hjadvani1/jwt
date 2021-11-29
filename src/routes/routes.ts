import { product1, upload } from "../controllers/product.controller";
import auth from "../middleware/autho";
import { Request, Response, Router } from "express";
import { register, login, profile } from "../controllers/user.controller";



const router: Router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/profile', profile)
router.post('/addproduct', auth, upload.single("product_image"), product1.addproduct)
router.get('/getproduct', auth, product1.getproduct)
router.post('/getproductbytype', auth, product1.getproductbytype)
router.post('/addimage/:product_name', auth, product1.addimage)
// router.get('/uploads/BG.PNG',(req,res)=>
// {
//     res.send('hello');
// })
// router.get('/hello',product1.addclass)

// router.get('/', check)


export default router;

