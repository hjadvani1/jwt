const app = require('./app');

const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer')


// const upload = multer({
//     dest: 'upload',
//     limits:
//     {
//         fileSize: 1000000,
//     },
//     fileFilter(req, file, cb) {

//         console.log((file.originalname));
//         if(!file.originalname.endsWith('.jpg'))
//         return cb(new Error('file format is incorrect'))
//         cb(undefined, true)
//     }

// })

// app.post('/upload', upload.single('upload'), async (req, res) => {
//     res.send();
// })

app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log('working fine', process.env.PORT);
    }
    else {
        console.log('something is wrong');
    }
});