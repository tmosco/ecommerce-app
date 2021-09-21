const mongoose = require('mongoose');




const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add name'],
        unique:true,
        maxlength: 32
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});




export default mongoose.models.category || mongoose.model('Category', CategorySchema);
