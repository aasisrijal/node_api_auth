const router = require('express').Router();
const verify = require('../verifytoken');

router.get('/', verify, (req, res) => {
	res.json({
		posts: {
			title: 'easy way to learn nodejs',
			author: 'john cena'
		},
		user: {
			data: req.user
		}
	});
});

module.exports = router;
