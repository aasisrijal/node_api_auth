
const Joi = require('@hapi/joi');


//register validaation
const registerValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	});

	return schema.validate(data);

	
};


//login validaation
const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	});

	return schema.validate(data);

	
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

