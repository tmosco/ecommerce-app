import mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a course title'],
            unique: true,
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters']
        },

        description: {
            type: String,
            required: [true, 'Please add a description'],

        },
        price: {
            type: Number,
            trim: true,
            required: [true, 'Please add Price'],

        },
        quantity: {
            type: Number,
            required: [true, 'Please add quantity'],
        },
        sold: {
            type: Number,
            default:0
        },
        photo: {
            type: String,
            default: 'no-photo.jpg'
        },
        delivery: {
            required: false,
            type: Boolean
        },

        createdAt: {
            type: Date,
            default: Date.now
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: true
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }

    });

export default mongoose.models.product ||  mongoose.model('Product', ProductSchema);