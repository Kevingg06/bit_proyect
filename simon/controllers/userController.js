const db = require('../config');

exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo usuarios');
            return;
        }
        res.json(results);
    });
};

exports.getUserById = (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM users WHERE userId = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo usuario');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Usuario no encontrado');
            return;
        }
        res.json(result[0]);
    });
};

exports.createUser = (req, res) => {
    const { username, role, createdAt, contactsNumber, age, phoneNumber, mail, subscription } = req.body;
    const query = 'INSERT INTO users (username, role, createdAt, contactsNumber, age, phoneNumber, mail, subscription) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [username, role, createdAt, contactsNumber, age, phoneNumber, mail, subscription], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creando usuario');
            return;
        }
        res.status(201).send('Usuario creado');
    });
};

exports.updateUser = (req, res) => {
    const userId = req.params.userId;
    const { username, role, createdAt, contactsNumber, age, phoneNumber, mail, subscription } = req.body;
    const query = 'UPDATE users SET username = ?, role = ?, createdAt = ?, contactsNumber = ?, age = ?, phoneNumber = ?, mail = ?, subscription = ? WHERE userId = ?';
    db.query(query, [username, role, createdAt, contactsNumber, age, phoneNumber, mail, subscription, userId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error actualizando usuario');
            return;
        }
        res.status(200).send('Usuario actualizado');
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.userId;
    const query = 'DELETE FROM users WHERE userId = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error eliminando usuario');
            return;
        }
        res.status(200).send('Usuario eliminado');
    });
};
