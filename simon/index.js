const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const {v4: uuidv4} = require('uuid');
const db = require('./config');

const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const educationRoutes = require('./routes/educationRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobHistoryRoutes = require('./routes/jobHistoryRoutes');
const userEducationRoutes = require('./routes/userEducationRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Conexion a la db

db.connect((err)=>{
    if(err){
        console.error('Error conectando a la base de datos', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);
app.use('/education', educationRoutes);
app.use('/companies', companyRoutes);
app.use('/jobHistory', jobHistoryRoutes);
app.use('/users_education', userEducationRoutes);