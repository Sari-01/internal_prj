const joi = require('joi');

// const Schema =joi
// .object()
// .pattern(/./,
//   joi.alternatives().conditional(
//     joi.number(),
//     {
//       then: joi.number().min(0),
//       otherwise: joi.string()
//     }
//   )
// )
const schema = joi.object({
    email_id: joi.string().email().lowercase().required(),
    password: joi.string().min(6).max(16).required(),
    // lastActivityTimestamp:joi.required()

})


module.exports = schema;