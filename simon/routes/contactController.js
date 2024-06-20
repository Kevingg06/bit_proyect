// contactController.js
const db = require('../config');

exports.getAllContacts = (req, res) => {
    const query = 'SELECT * FROM contact';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo contactos');
            return;
        }
        res.json(results);
    });
};

exports.getContactById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM contact WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo contacto');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Contacto no encontrado');
            return;
        }
        res.json(result[0]);
    });
};

exports.createContact = (req, res) => {
    const { user1Id, user2Id } = req.body;
    const query = 'INSERT INTO contact (user1Id, user2Id) VALUES (?, ?)';
    db.query(query, [user1Id, user2Id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creando el contacto');
            return;
        }
        res.status(201).send('Contacto creado');
    });
};

exports.updateContact = (req, res) => {
    const id = req.params.id;
    const { user1Id, user2Id } = req.body;
    const query = 'UPDATE contact SET user1Id = ?, user2Id = ? WHERE id = ?';
    db.query(query, [user1Id, user2Id, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error actualizando el contacto');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Contacto no encontrado');
            return;
        }
        res.status(200).send('Contacto actualizado');
    });
};

exports.deleteContact = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM contact WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error eliminando el contacto');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Contacto no encontrado');
            return;
        }
        res.status(200).send('Contacto eliminado');
    });
};

module.exports = router;