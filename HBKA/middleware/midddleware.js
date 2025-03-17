const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    _id:
    {
        type: String, required: true
    },

    sequenceValue:
    {
        type: Number, default: 0
    },
});

const Counter = mongoose.model('Counter', CounterSchema);

const autoIncrement = function (modelName, field) {
    return function (next) {
        const doc = this;
        Counter.findByIdAndUpdate(
            modelName,
            { $inc: { sequenceValue: 1 } },
            { upsert: true, new: true },
            function (error, counter) {
                if (error) return next(error);
                doc[field] = counter.sequenceValue;
                next();
            }
        );
    };
};

module.exports = autoIncrement;