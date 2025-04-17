import Joi from "joi";

const createSchema = Joi.object({
    title : Joi.string().required(),
    body : Joi.string().required()
})

export default {createSchema}