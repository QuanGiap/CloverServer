require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors(
    {
        origin: '*',
    }
));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from Express on AWS Elastic Beanstalk!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});