router.get('/profile', verifyToken, (req, res) => {
    const userId = req.user.userId; // Obtener el ID del usuario del token JWT

    const query = 'SELECT * FROM users WHERE userId = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener la información del usuario:', err);
            return res.status(500).json({ error: 'Error al obtener la información del usuario.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        const user = results[0];
        res.json({ 
            user: { 
                userId: user.userId,
                username: user.username,
                email: user.mail,
                // ... otras propiedades del usuario que quieras enviar
            } 
        });
    });
});