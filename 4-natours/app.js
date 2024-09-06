const express = require('express');
const app = express();
//http method for the request
app.get('/', (req, res) => {
  res
    .status(200) //indicate a status to show for the message
    .json({ message: 'Hello form the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can not post on this endpoint'); 
});
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
