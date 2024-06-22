// educationController.js
const db = require('../config');

exports.getAllEducation = (req, res) => {
    const query = 'SELECT * FROM education';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo la educación');
            return;
        }
        res.json(results);
    });
};

exports.getEducationByName = (req, res) => {
    const name = req.params.name;
    const query = 'SELECT * FROM education WHERE name = ?';
    db.query(query, [name], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo la educación');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Educación no encontrada');
            return;
        }
        res.json(result[0]);
    });
};

exports.createEducation = (req, res) => {
    const { name, description, speciality } = req.body;
    const query = 'INSERT INTO education (name, description, speciality) VALUES (?, ?, ?)';
    db.query(query, [name, description, speciality], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creando la educación');
            return;
        }
        res.status(201).send('Educación creada');
    });
};

exports.updateEducation = (req, res) => {
    const name = req.params.name;
    const { description, speciality } = req.body;
    const query = 'UPDATE education SET description = ?, speciality = ? WHERE name = ?';
    db.query(query, [description, speciality, name], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error actualizando la educación');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Educación no encontrada');
            return;
        }
        res.status(200).send('Educación actualizada');
    });
};

exports.deleteEducation = (req, res) => {
    const name = req.params.name;
    const query = 'DELETE FROM education WHERE name = ?';
    db.query(query, [name], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error eliminando la educación');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Educación no encontrada');
            return;
        }
        res.status(200).send('Educación eliminada');
    });
};

