import mongoose from "mongoose";


mongoose.connect("mongodb://localhost/testdb", {


}).then(() => {
    console.log('connceted');
}
).catch(err => {
    console.log(err.message);
})

mongoose.set('debug', true)