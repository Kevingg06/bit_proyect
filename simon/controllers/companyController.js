// companyController.js
const db = require('../config');

exports.getAllCompanies = (req, res) => {
    const query = 'SELECT * FROM company';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo las compañías');
            return;
        }
        res.json(results);
    });
};

exports.getCompanyByName = (req, res) => {
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
};

exports.createCompany = (req, res) => {
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
};

exports.updateCompany = (req, res) => {
    const name = req.params.name;
    const { description } = req.body;
    const query = 'UPDATE company SET description = ? WHERE name = ?';
    db.query(query, [description, name], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error actualizando la compañía');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Compañía no encontrada');
            return;
        }
        res.status(200).send('Compañía actualizada');
    });
};

exports.deleteCompany = (req, res) => {
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
};

