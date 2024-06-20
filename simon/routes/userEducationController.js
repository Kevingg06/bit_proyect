// userEducationController.js
const db = require('../config');

exports.getUserEducationByUserId = (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM users_education WHERE userId = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo educación de usuario');
            return;
        }
        res.json(results);
    });
};

exports.createUserEducation = (req, res) => {
    const { userId, educationName, description } = req.body;
    const id = uuidv4();
    const query = 'INSERT INTO users_education (id, userId, educationName, description) VALUES (?, ?, ?, ?)';
    db.query(query, [id, userId, educationName, description], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creando educación de usuario');
            return;
        }
        res.status(201).send('Educación de usuario creada');
    });
};

exports.updateUserEducation = (req, res) => {
    const id = req.params.id;
    const { educationName, description } = req.body;
    const query = 'UPDATE users_education SET educationName = ?, description = ? WHERE id = ?';
    db.query(query, [educationName, description, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error actualizando educación de usuario');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Educación de usuario no encontrada');
            return;
        }
        res.status(200).send('Educación de usuario actualizada');
    });
};

exports.deleteUserEducation = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM users_education WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error eliminando educación de usuario');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Educación de usuario no encontrada');
            return;
        }
        res.status(200).send('Educación de usuario eliminada');
    });
};

module.exports = router;
