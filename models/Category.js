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




global.Category = global.Category || mongoose.model('Category', CategorySchema);

export default global.Category;
