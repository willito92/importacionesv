const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI;



mongoose.connect(MONGODB_URI, {
useUnifiedTopology: true,
useNewUrlParser: true,
useCreateIndex:true
})
.then(db => console.log('database is connected'))
.catch(err => console.log(err));