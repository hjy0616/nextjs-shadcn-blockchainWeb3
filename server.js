const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/web3users', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
  address: String,
  name: String
});

app.post('/api/users', async (req, res) => {
  const { address, name } = req.body;
  const user = new User({ address, name });
  await user.save();
  res.json(user);
});

app.get('/api/users/:address', async (req, res) => {
  const user = await User.findOne({ address: req.params.address });
  res.json(user);
});

app.listen(3001, () => console.log('Server running on port 3001'));