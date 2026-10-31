const express = require('express');

const app = express();
const PORT = 8080;

// parsing the JSON data
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("This is an demo api with GET method");
});

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status:'Success',
        message: 'API is running!'
    });
});
app.get('/api/students/:id', (req, res) => {
    const ID = req.params.id;

    res.status(200).json({
        status: 'Success',
        message: 'ID received successfully!',
        id: ID
    });
});


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});