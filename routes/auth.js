const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { registerValidation, loginValidation } = require('../validation');




router.post('/register', async (req, res) => {
	//first validate the data
	// const { error } = schema.validate(req.body);
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if the user already exists
	const emailExists = await User.findOne({email: req.body.email})
	if(emailExists) return res.status(400).send('email already esits');

	//hash passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	//create new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});
	try{
		const savedUser = await user.save();
		// res.send(savedUser);
		res.send({ user: user._id });

	}catch(err){
		res.status(400).send(err);
	}
});


//login
router.post('/login', async (req, res) => {
	//validate the data entered by user
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if the email exists
	const user = await User.findOne({email: req.body.email})
	if(!user) return res.status(400).send('email or password does not exists');

	//pasword is correct or not
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if(!validPass) return res.status(400).send('invalid password');

	//create and assign a toke
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(token);
	res.send('logged in');
});

module.exports = router;