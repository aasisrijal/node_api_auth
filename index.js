const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
//import routes
const authRouter = require('./routes/auth');

dotenv.config();


//connect to db
mongoose.connect( process.env.DB_CONNECT,
	{useNewUrlParser: true,
		useUnifiedTopology: true},
	 () => {
	console.log('connected to mongo atlas')
});

app.use(express.json());

//routes middlewre
app.use('/api/user', authRouter);

app.listen(3000, () => console.log('server up and running'));