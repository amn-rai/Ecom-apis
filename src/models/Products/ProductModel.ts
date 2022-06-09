import mongoose from 'mongoose';

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String
    },
    productimg: {
        type: String
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'categories'
    },
    subcategory: {
        type: mongoose.Types.ObjectId
    },
    price: {
        type: Number,
        trim: true
    },
    discount: {
        type: Number,
        default: 0
    },
    store: {
        type: mongoose.Types.ObjectId,
        ref: 'stores'
    },
    offer: {
        type: String
    },
    createdAt: {
        type: String
    },
    tax: {
        type: Number,
        default: 5
    },
    availability: {
        type: Boolean
    },
    // we will count qunatity on the basis of that check availability of product
    qunatity: {
        type: Number,
        trim: true
    },
    viewOnly: {
        type: Number,
        default: 0
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

productSchema.virtual('allreviews', {
    ref: 'reviewsModel',
    localField: '_id',
    foreignField: 'product'
});

var virtual = productSchema.virtual('avgrating');
virtual.get(function () {
    if (!this.allreviews || this.allreviews.length === 0) return 0;
    let totalReviews = this.allreviews.length;
    let rating = 0;
    this.allreviews.forEach(review => {
        rating = rating + review.rating;
    });
    let avrageRate = rating / totalReviews;
    return avrageRate;
});
const user = mongoose.model('products', productSchema);
export default user;
