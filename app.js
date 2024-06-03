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

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});