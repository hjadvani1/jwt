import { product1 } from "../controllers/product.controller";
import auth from "../middleware/autho";
import { Request, Response, Router } from "express";
import { register, login, profile } from "../controllers/user.controller";
import multer from 'multer';
const image = multer({

    fileFilter(req: Request, file: any, next: any) {
        if (!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/)) {
            return next(new Error('this is not a correct format of the file'))
        }
        next(undefined, true)
    }
})


const router: Router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/profile', profile)
router.post('/addproduct', image.single('image'), auth, product1.addproduct)
router.get('/getproduct', auth, product1.getproduct)
router.post('/getproductbytype', auth, product1.getproductbytype)
router.post('/addimage/:product_name', image.single('image'), auth, product1.addimage)
// router.get('/hello',product1.addclass)

// router.get('/', check)


export default router;

