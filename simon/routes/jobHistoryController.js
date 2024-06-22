// jobHistoryController.js
const db = require('../config');

exports.getAllJobHistory = (req, res) => {
    const query = 'SELECT * FROM jobsHistory';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo historiales laborales');
            return;
        }
        res.json(results);
    });
};

exports.getJobHistoryByUserId = (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM jobsHistory WHERE userId = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo historial laboral');
            return;
        }
        res.json(result);
    });
};

exports.createJobHistory = (req, res) => {
    const { userId, companyName, jobDescription, jobRole } = req.body;
    const query = 'INSERT INTO jobsHistory (userId, companyName, jobDescription, jobRole) VALUES (?, ?, ?, ?)';
    db.query(query, [userId, companyName, jobDescription, jobRole], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creando historial laboral');
            return;
        }
        res.status(201).send('Historial laboral creado');
    });
};

exports.updateJobHistory = (req, res) => {
    const userId = req.params.userId;
    const companyName = req.params.companyName;
    const { jobDescription, jobRole } = req.body;
    const query = 'UPDATE jobsHistory SET jobDescription = ?, jobRole = ? WHERE userId = ? AND companyName = ?';
    db.query(query, [jobDescription, jobRole, userId, companyName], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error actualizando historial laboral');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Historial laboral no encontrado');
            return;
        }
        res.status(200).send('Historial laboral actualizado');
    });
};

exports.deleteJobHistory = (req, res) => {
    const userId = req.params.userId;
    const companyName = req.params.companyName;
    const query = 'DELETE FROM jobsHistory WHERE userId = ? AND companyName = ?';
    db.query(query, [userId, companyName], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error eliminando historial laboral');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Historial laboral no encontrado');
            return;
        }
        res.status(200).send('Historial laboral eliminado');
    });
};

module.exports = router;