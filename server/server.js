const express = require('express');
const app = express();

app.get("/", (req, res) => {
	console.log(req);
	res.send("Hoi");
});

app.listen(3000, () => console.log('App listening on port 3000!'));