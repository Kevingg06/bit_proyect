const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Aquí puedes validar las credenciales contra una base de datos o cualquier otra lógica de autenticación
  if (username === 'admin69@gmail.com' && password === 'password') {
    const token = jwt.sign({ username }, 'secretkey' );
    res.json({ token});
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(5500, () => {
  console.log('Server is running on port 5500');
});