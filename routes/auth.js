const router = require('express').Router();
const User = require('../models/user');
const { registerValidation, loginValidaation }= require('../validation')


//validation
const Joi = require('@hapi/joi');

const schema = Joi.object({
	name: Joi.string().min(6).required(),
	email: Joi.string().min(6).required().email(),
	password: Joi.string().min(6).required()
});


router.post('/register', async (req, res) => {
	//first validate the data
	// const { error } = schema.validate(req.body);
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if the user already exists
	const emailExists = await User.findOne({email: req.body.email})
	if(emailExists) return res.status(400).send('email already esits');

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	try{
		const savedUser = await user.save();
		res.send(savedUser);

	}catch(err){
		res.status(400).send(err);
	}
});

router.get('/hello', (req, res) => {
	res.send('register router');
});

module.exports = router;