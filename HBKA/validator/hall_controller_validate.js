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
    // hall_id:joi.string().required(),
    location:joi.string().required(),
    floor:joi.string().required(),
    hall_name:joi.string().required(),
    block:joi.string().required(),
    capacity:joi.string().required()

})


module.exports=schema;