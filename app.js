const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.json()); // Para analizar el cuerpo de las solicitudes JSON
app.use(cors()); // Habilita CORS

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: 'mysql-vrmarket-pladema-ef62.d.aivencloud.com',
    port: 26116,
    user: 'avnadmin',
    password: 'AVNS_BD6D-d03halBr0cMHzd',
    database: 'cave'
};

const pool = mysql.createPool({
    host: 'mysql-vrmarket-pladema-ef62.d.aivencloud.com',
    port: 26116,
    user: 'avnadmin',
    password: 'AVNS_BD6D-d03halBr0cMHzd',
    database: 'cave'
});

// Función para mapear colores a nombres de prefab
function mapColorToPrefab(color) {
    switch (color.toLowerCase()) {
        case 'azul': return 'FlagBlue';
        case 'rojo': return 'FlagRed';
        case 'verde': return 'FlagGreen';
        default:
            console.warn('Color de bandera desconocido: ' + color);
            return null;
    }
}

// Endpoint para cargar banderas
app.get('/flags/:dni', async (req, res) => {
    const dni = req.params.dni;
    const query = `
        SELECT B.color, A.posicionX, A.posicionZ, A.id
        FROM APRENDIZAJE A
        JOIN BANDERA B ON A.id_bandera = B.id
        WHERE A.dni = ? AND DATE(A.fecha) = CURDATE()
        ORDER BY A.id ASC`;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(query, [dni]);
        connection.end();

        const flags = rows.map(row => {
            const prefabName = mapColorToPrefab(row.color);
            if (prefabName) {
                return {
                    modelName: prefabName,
                    positionX: row.posicionX,
                    positionZ: row.posicionZ,
                    id: row.id
                };
            }
            return null;
        }).filter(flag => flag !== null); // Filtra los nulos

        res.json(flags);
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar el tiempo en aprendizaje
app.put('/flags/learning/:dni/:id', async (req, res) => {
    const dni = req.params.dni;
    const id = req.params.id;
    const { timeTaken } = req.body;
    const query = `UPDATE APRENDIZAJE SET tiempo_encontrada_aprendizaje = ? WHERE dni = ? AND id = ?`;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(query, [timeTaken, dni, id]);
        connection.end();
        res.json({ message: `Tiempo actualizado para la bandera ${id} y DNI ${dni}` });
    } catch (error) {
        console.error('Error al actualizar la base de datos:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar el tiempo en random
app.put('/flags/random/:dni/:id', async (req, res) => {
    const dni = req.params.dni;
    const id = req.params.id;
    const { timeTaken } = req.body;
    const query = `UPDATE APRENDIZAJE SET tiempo_encontrada_random = ? WHERE dni = ? AND id = ?`;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(query, [timeTaken, dni, id]);
        connection.end();
        res.json({ message: `Tiempo random actualizado para la bandera ${id} y DNI ${dni}` });
    } catch (error) {
        console.error('Error al actualizar la base de datos:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar f_random
app.put('/flags/randomFlag/:id', async (req, res) => {
    const id = req.params.id;
    const query = `UPDATE APRENDIZAJE SET f_random = TRUE WHERE id = ?`;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(query, [id]);
        connection.end();
        res.json({ message: `f_random actualizado para el idAprendizaje ${id}` });
    } catch (error) {
        console.error('Error al actualizar la base de datos:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar el tiempo en between
app.put('/flags/between/:dni/:id', async (req, res) => {
    const dni = req.params.dni;
    const id = req.params.id;
    const { timeTaken } = req.body;
    const query = `UPDATE APRENDIZAJE SET tiempo_plantada_entre = ? WHERE dni = ? AND id = ?`;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(query, [timeTaken, dni, id]);
        connection.end();
        res.json({ message: `Tiempo between actualizado para la bandera ${id} y DNI ${dni}` });
    } catch (error) {
        console.error('Error al actualizar la base de datos:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar f_entre
app.put('/flags/betweenFlag/:id', async (req, res) => {
    const id = req.params.id;
    const query = `UPDATE APRENDIZAJE SET f_entre = TRUE WHERE id = ?`;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(query, [id]);
        connection.end();
        res.json({ message: `f_entre actualizado para el idAprendizaje ${id}` });
    } catch (error) {
        console.error('Error al actualizar la base de datos:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar el tiempo en circle
app.put('/flags/circle/:dni/:id', async (req, res) => {
    const dni = req.params.dni;
    const id = req.params.id;
    const { timeTaken } = req.body;
    const query = `UPDATE APRENDIZAJE SET tiempo_encontrada_circun = ? WHERE dni = ? AND id = ?`;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(query, [timeTaken, dni, id]);
        connection.end();
        res.json({ message: `Tiempo circle actualizado para la bandera ${id} y DNI ${dni}` });
    } catch (error) {
        console.error('Error al actualizar la base de datos:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar f_circunferencia
app.put('/flags/circleFlag/:id', async (req, res) => {
    const id = req.params.id;
    const query = `UPDATE APRENDIZAJE SET f_circunferencia = TRUE WHERE id = ?`;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(query, [id]);
        connection.end();
        res.json({ message: `f_circunferencia actualizado para el idAprendizaje ${id}` });
    } catch (error) {
        console.error('Error al actualizar la base de datos:', error);
        res.status(500).json({ error: error.message });
    }
});


// Endpoint para subir configurar el aprendizaje (guardar experimento desde pagina web) 
// Endpoint para guardar el aprendizaje
app.post('/learning', async (req, res) => {
    try {
        const { flags } = req.body;

        // Preparar la consulta
        const query = `
            INSERT INTO APRENDIZAJE (id_bandera, dni, posicionX, posicionZ, fecha) 
            VALUES (?, ?, ?, ?, NOW())
        `;

        // Insertar cada bandera en la base de datos
        for (const flag of flags) {
            await pool.query(query, [
                flag.id_bandera,
                flag.dni,
                flag.positionX,
                flag.positionZ
            ]);
        }

        res.json({
            success: true,
            message: 'Experimento guardado correctamente'
        });
    } catch (error) {
        console.error('Error al guardar el experimento:', error);
        res.status(500).json({
            success: false,
            message: 'Error al guardar el experimento'
        });
    }
});




// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});