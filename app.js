const express = require('express');
const app = express();

const port = process.argv[2] || process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log('hello from port ' + port);
    res.send({
        msg: 'Hello from port ' + port
    });
});

app.listen(port, () => {
    console.log(`App is listening at port ` + port);
});