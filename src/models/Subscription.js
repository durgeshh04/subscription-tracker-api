import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },

    price: {
        type: String,
        required: [true, 'Subscription price is required'],
        trim: true,
        min: [0, 'price must be greater than 0']
    },

    currency: {
        type: String,
        required: [true, 'Subscription currency is required'],
        enum: ['USD', 'EUR', 'INR'],
        default: 'INR',
    },

    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },

    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true,
    },

    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        required: true,
    },

    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past'
        }
    },

    renewalDate: {
        type: Date,
        validate: {
            validator: (value) => value > this.startDate,
            message: 'Renewal date must be after the start date',
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, { timestamps: true });

const subscription = mongoose.model('Subscription', subscriptionSchema);
export default subscription;