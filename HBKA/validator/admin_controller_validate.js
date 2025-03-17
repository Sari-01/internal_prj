const joi=require('joi');

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
const schema=joi.object({
    name:joi.string().alphanum().min(3).required(),
    emp_id:joi.string().min(6).max(16).required(),
    location:joi.string().required(),
    designation:joi.string().required(),
    bu:joi.string().required(),
    email_id:joi.string().email().lowercase().required(),
    role:joi.string().valid('User','Admin').required()

})


module.exports=schema;