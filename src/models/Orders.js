const {Schema, model} = require('mongoose');
const NoteSchema = new Schema({
    producto: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    user:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports= model('Order', NoteSchema);