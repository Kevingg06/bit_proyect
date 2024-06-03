const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const {v4: uuidv4} = require('uuid');
const db = require('./config');

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

//Mostrar todo el contenido de la tabla usuarios.

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users'
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error obteniendo los usuarios');
        return;
      }
      res.json(results);
    });
  });

  // Crear un nuevo usuario
app.post('/users', (req, res)=>{
    const { username, role, createdAt, contactsNumber, age, phoneNumber, mail, subscription } = req.body;
    const userId = uuidv4(); //Genera un ID unico
    const query = 'INSERT INTO users (userId, username, role, createdAt, contactsNumber, age, phoneNumber, mail, subscription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(query, [userId, username, role, createdAt, contactsNumber, age, phoneNumber, mail, subscription],
    (err, results)=>{
        if (err){
            res.send('Error creando el usuario');
            console.error(err);
            res.status(500).send('Usuario creado');
            return;
        }
        res.status(201).send('Usuario creado')
    });
});

// Mostrar un usuario por su ID
app.get('/users:userId', (req, res)=>{
    const {userId} = req.params;
    const query = 'SELECT * FROM users WHERE userId = ?'
    db.query(query, [userId], (err, results)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error obteniendo el usuario');
            return;
        }
        res.json(results[0]);
    });
});

//Actualizar un usuario.

app.put('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { username, role, createdAt, contactsNumber, age, phoneNumber, mail, subscription } = req.body;
    const query = 'UPDATE users SET username = ?, role = ?, createdAt = ?, contactsNumber = ?, age = ?, phoneNumber = ?, mail = ?, subscription = ? WHERE userId = ?'
    db.query(query, [username, role, createdAt, contactsNumber, age, phoneNumber, mail, subscription, userId], 
      (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error actualizando el usuario');
        return;
      }
      res.send('Usuario actualizado');
    });
  });

  //Eliminar un usuario.

  app.delete('/users/:usersId', (req, res)=>{
    const {userId} = req.params;
    const query = 'DELETE FROM uses WHERE userId = ?'
    db.query(query, [userId], (err, result)=>{
        if (err){
            console.error(err);
            res.status(500).send('Error eliminando el usuario')
            return;
        }
        res.send('Usuario eliminado')
    });
  });

  // Tabla contactos

//Mostrar todo
  app.get('/contacts', (req, res)=>{
    const query = 'SELECT * FROM contact';
    db.query(query, (err, results)=>{
        if (err){
            console.error('err');
            res.status(500).send('Error obteniendo contactos');
            return;
        }
    });
  });

  app.get('/contacts/:id', (req, res)=>{
    const contactId = req.params.id;
    const query = 'SELECT * FROM contact WHERE contactId = ?';
    db.query(query, [contactId], (err, result)=>{
        if (err){
            console.error(err);
            res.status(500).send('Error obteniendo contacto');
            return;
        }
        if(result.length === 0){
            res.status(404).send('No encontrado')
            return;
        }
        res.status(200).json(result[0]);
    });
  });

app.put('/contacts/:id', (req, res)=>{
    const contactsId = req.params.id;
    const {user1Id, user2Id} = req.body;
    const query = 'UPDATE contact SET user1Id = ?, user2Id = ? WHERE contactId = ?';
    
    db.query(query, [user1Id, user2Id, contactsId], 
        (err, result)=>{
            if (err){
                console.error(err);
                res.status(500).send('Error actualizando el contacto');
                return;
            }
            if(result.affectedRows === 0){
                res.status(404).send('Contacto no encontrado');
                return;
            }
            res.status(200).send('Contacto actualizado');
        });
});

app.delete('/contacts/:id', (req,res)=>{
    const contactId = req.params.id;
    const query = 'DELETE FROM contact WHERE contacId = ?';

    db.query(query, [contactId], (err, result)=>{
        if (err){
            console.error('Error eliminando el contacto');
            res.status(500).send('Error eliminando contacto');
            return;
        }
        if (result.affectedRows === 0){
            res.status(404).send('Usuario no encontrado');
            return;
        }
        res.status(200).send('Contacto eliminado');
    });
});

app.get('/education', (req, res)=>{
    const query = 'SELECT * FROM education';
    db.query(query, (err,results)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error en obteniendo la educación');
        }
        res.status(200).json(results);
    });
});

app.get('/education:name', (req, res)=>{
    const name = req.params.name
    const query = 'SELECT * FROM education WHERE name = ?';
    db.query(query, [name], (err, result)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error al mostrar education');
            return;
        }
        res.status(200).json(result[0]);
    });
});

app.put('/educaytion/:name', (req, res)=>{
    const name = req.params.name;
    const {description, speciality} = req.body;
    const query = 'UPDATE education SET description = ?, speciality = ?, WHERE name = ?';

    db.query(query, [description, speciality, name], (err, result)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error actualizando la educacion');
            return;
        }
        if(result.affectedRows === 0){
            res.status(404).send('Educacion no encontrada');
            return;
        }
        res.status(200).send('Educacion actualizada');
    });
});

app.delete('/education/:name', (req, res)=>{
    const name = req.params.name;
    const query = 'DELETE FROM education where name = ?';

    db.query(query, [name], (err, result)=>{
        if (err){
            console.error(err);
            res.status(500).send('Error eliminando la educacion');
            return;
        }
        if (result.affectedRows === 0){
            res.status(404).send('No se pudo encontrar la educacion');
            return;
        }
        res.status(200).send('educacion eliminada correctamente')
    });
});

app.post('/chat', (req, res)=>{
    const {chatId, messageDate, content, emisor, receptor} = req.body;

    const query = 'INSERT INTO chat (chatId, messageDate, content, emisor, receptor'
    db.query(query, [chatId, messageDate, content, emisor, receptor], (err, result)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error insertando el chat')
            return;
        }
        res.status(201).send('Chat creado');
    });
});

app.get('/chat:id', (req, res)=>{
    const chatId = req.params.id
    const query = 'SELECT * FROM chat where chatId = ?'
    
    db.query(query, [chatId], (err, result)=>{
        if (err){
            console.error(err);
            res.status(500).send('Hubo problemas al intentar mostrar el chat');
            return;
        }
        if(result.length === 0){
            res.status(404).send('chat no encontrado');
            return;
        }
        res.status(200).json(result[0]);
    });
});

app.put('/chat/:id', (req, res)=>{
    const chatId = req.params.id
    const {messageDate, content, emisor, receptor} = req.body;
    const query = 'UPDATE chat SET messageDate = ?, content = ?, emisor = ?, receptor = ?';
    
    db.query(query, [messageDate, content, emisor, receptor, chatId],
    (err, result)=>{
        if (err){
            console.error(err)
            res.status(500).send('Error actualizando el chat');
            return;
        }
        if(result.affectedRows === 0){
            res.status(404).send('Usuario no encontrado');
        }
        res.status(200).json(result[0]);
    });
});

app.delete('/chat/:id', (req, res)=>{
    const chatId = req.params.id
    const query = 'DELETE FROM chat WHERE chatId = ?';

    db.query(query, [chatId], (err, result)=>{
        if (err){
            console.error(err);
            res.status(500).send('Error al eliminar el chat');
            return;
        }
        if (result.affectedRows === 0){
            res.status(404).send('No se encontró a ese usuario')
            return;
        }
        res.status(200).send('Chat eliminado');
    });
});

//company

app.get('/companies', (req, res) => {
    const query = 'SELECT * FROM company';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo las compañías');
            return;
        }
        res.json(results);
    });
});

app.get('/companies/:name', (req, res) => {
    const name = req.params.name;
    const query = 'SELECT * FROM company WHERE name = ?';
    db.query(query, [name], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo la compañía');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Compañía no encontrada');
            return;
        }
        res.json(result[0]);
    });
});

app.post('/companies', (req, res) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO company (name, description) VALUES (?, ?)';
    db.query(query, [name, description], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creando la compañía');
            return;
        }
        res.status(201).send('Compañía creada');
    });
});

app.put('/companies/:name', (req, res) => {
    const name = req.params.name;
    const { description } = req.body;
    const query = 'UPDATE company SET description = ? WHERE name = ?';
    db.query(query, {description, name}, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error actualizando la compañía');
            return;
        }
        if (resultaffectedRows === 0) {
            res.status(404).send('Compañía no encontradda');
            return;
        }
        res.status(200).send('Compañía actualizada');
    });
});

app.delete('/companies/:name', (req, res) => {
    const name = req.params.name;
    const query = 'DELETE FROM company WHERE name = ?';
    db.query(query, [name], (err, result) => {
        if (err) { 
            console.error(err);
            res.status(500).send('Error eliminando la compañía');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Compañía no encontrada');
            return;
        }
        res.status(200).send('Compañía eliminada');
    });
});

//jobHistory
app.get('/jobHistory', (req, res) => {
    const query = 'SELECT * FROM jobsHistory';
    db.query(query, (err, results) => {
        if (err) {
            console.error (err);
            res.status(500).send('Error obteniendo historiales laborales');
            return;
        }
        res.json(results);
    });
});

app.get('/kpbHistory/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT ¨FROM jobsHistory WHERE userId = ?';
    db.query(query, [userId], (erro, result) => {
        if (erro) {
            console.error(err);
            res.status(500).send('Error obteniendo historial laboral');
            return;
        }
        res.json(result);
    });
});

app.post('/hobHistory', (req, res => {
    const { userId, companyName, jobDescription, jobRole } = req.body; const query = 'INSERT INTO jobsHistory (userId, companyName, jobDescription, jodbRole) VALUES (?, ?, ?, ?)';
    db.query(query, [userId, companyName, jobDescription,jobRole], (err, result) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error creando historial laboral');
            return;
        }
        res.status(201).send('historial laboral creado');
    });
}));

app.put('/jobHistory(:userId/:companyname' , (req, res) => {
    const userId = req.params.userId;
    const companyName = req.params.companyname;
    const { jobDescription, jobRole } = req.body;
    const query = 'UPDATE jobsHistory SET jobDescription = ?, jobRole = ? WHERE userId = ? AND companyName = ?';
    db.query(query, [jobDescription, jobRole, userId, companyName], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error actualizando historial laboral');
            return;
        }
        if(result.affectedRows === 0) {
            res,statys(404).send('Historial laboral no encontrado');
            return;
        }
        res.status(200).send('Historial laboral actualizado');
    });
});

app.delete('/jobHistory/:userId/:companyName', (req, res) => {
    const userId = req.params.userId;
    const companyName = req.params.companyName;
    const query = 'DELETE FROM jobsHistory WHERE userId = ? AND company Name = ?';
    db.query(query, [userId, companyName], (err, result) => {
        if (err) {
            console. error(err);
            res.status(500).send('Error eliminando historial laboral');
            return;
        }
        if (result.affectedRows == 0) {
            res.status(404).send('Historial laboral no encontrado');
            return;
        }
        res.status(200).send('Historial laboral eliminado');
    });
});

//users_education

app.get('/users_education/:userId', (req, res) => {
    const userId = req.params.userId;
    constquery = 'SELECT * FROM users_education WHERE userId =?';
    db.query(query, [iserId], (err, results) => {
        if (err) {
            console.erro(err);
            res.status(500).send('Error obteniendo educaciones de usuario');
            return;
        }
        res.json(results);
    });
});

app.post('/users_education', (req, res) => {
    const { userId, educationName, description } = req.body;
    const id = uuidv4();
    const query = 'INSERT INTO users_education (id, userId, educationName, description values (?, ?, ?, ?)';
    db.query(query, [id, userId, educationName, descritpion], (err, result) => {
        if (err) {
            console.erro(err);
            res.status(500).send('Error creando educación de usuario');
            return;
        }
        res.status(201).send('Educación de usario creada');
    });
});

app.put('/users_education/:id', (req, res) => {
    const id = req.params.id;
    const { educationName, description } = req.body;
    const query = 'UPDATE users_education SET educationName = ?, description = = WHERE id = ?';
    db.query(query, [educationName, description, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).Send('Error actualizando educación de usuario')
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Educación de usuario no encontrada');
            return;
        }
        res.status(200).send('Educación de usuario actualizada');
    });
});

app.delete('/users_education/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM users_education WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error eliminando educación de usuario');
            return;
        }
        if (result.affectedRows == 0) {
            res.status(404).send('Educación de usuario no encontrada');
            return;
        }
        res.status(200).send('Educación de usuario eliminada');
    });
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
