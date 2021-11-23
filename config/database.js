const mongoose = require('mongoose');

const { MONGO_URI } = process.env;


exports.connect = () => {
    mongoose.connect(MONGO_URI,
        {
            useNewUrlParser: true,
            // useCreateIndex: true
        }).then(()=>{
            console.log('db connected');
        }).catch(error=>
        {
            console.log('something is wrong ');
            console.error(error);
        })
        mongoose.set('debug',true);
}
