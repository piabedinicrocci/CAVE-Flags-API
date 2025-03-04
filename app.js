// index.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

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
    try {
        const dni = req.params.dni;
        const rows = await db.getFlagsByDni(dni);
        const flags = rows.map(row => {
            const prefabName = mapColorToPrefab(row.color);
            if (prefabName) {
                return { modelName: prefabName, positionX: row.posicionX, positionZ: row.posicionZ, id: row.id };
            }
            return null;
        }).filter(flag => flag !== null);
        res.json(flags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar el tiempo en aprendizaje
app.put('/flags/learning/:dni/:id', async (req, res) => {
    try {
        const { dni, id } = req.params;
        const { timeTaken } = req.body;
        await db.updateLearningTime(dni, id, timeTaken);
        res.json({ message: `Tiempo actualizado para la bandera ${id} y DNI ${dni}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar el tiempo en random
app.put('/flags/random/:dni/:id', async (req, res) => {
    try {
        const { dni, id } = req.params;
        const { timeTaken } = req.body;
        await db.updateRandomTime(dni, id, timeTaken);
        res.json({ message: `Tiempo random actualizado para la bandera ${id} y DNI ${dni}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar f_random
app.put('/flags/randomFlag/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.updateFRandom(id);
        res.json({ message: `f_random actualizado para el idAprendizaje ${id}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar el tiempo en between
app.put('/flags/between/:dni/:id', async (req, res) => {
    try {
        const { dni, id } = req.params;
        const { timeTaken } = req.body;
        await db.updateBetweenTime(dni, id, timeTaken);
        res.json({ message: `Tiempo between actualizado para la bandera ${id} y DNI ${dni}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar f_entre
app.put('/flags/betweenFlag/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.updateFEntre(id);
        res.json({ message: `f_entre actualizado para el idAprendizaje ${id}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar el tiempo en circle
app.put('/flags/circle/:dni/:id', async (req, res) => {
    try {
        const { dni, id } = req.params;
        const { timeTaken } = req.body;
        await db.updateCircleTime(dni, id, timeTaken);
        res.json({ message: `Tiempo circle actualizado para la bandera ${id} y DNI ${dni}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar f_circunferencia
app.put('/flags/circleFlag/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.updateFCircle(id);
        res.json({ message: `f_circunferencia actualizado para el idAprendizaje ${id}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener el DNI de la tabla CONFIG (id = 1)
app.get('/config/dni', async (req, res) => {
    try {
        const rows = await db.getDniFromConfig();
        if (rows.length > 0) {
            res.json({ dni: rows[0].dni });
        } else {
            res.status(404).json({ message: 'DNI no encontrado en la tabla CONFIG para id = 1' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar el DNI en la tabla CONFIG (id = 1)
app.put('/config/dni/:dni', async (req, res) => {
    try {
        const dni = req.params.dni;
        await db.updateDniInConfig(dni);
        res.json({ message: `DNI ${dni} actualizado correctamente para id = 1` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para subir configurar el aprendizaje (guardar experimento desde pagina web)
app.post('/learning', async (req, res) => {
    try {
        const { flags } = req.body;
        await db.insertLearningFlags(flags);
        res.json({ success: true, message: 'Experimento guardado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al guardar el experimento' });
    }
});

// Endpoint para verificar si un DNI existe en la tabla PERSONA
app.get('/person/:dni', async (req, res) => {
    const dni = req.params.dni;

    if (!dni) {
        return res.status(400).json({ message: 'El DNI es requerido en la ruta' });
    }

    try {
        const rows = await db.getPersonByDni(dni);
        if (rows.length > 0) {
            res.json(rows[0]); // Devuelve la persona
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para crear una persona
app.post('/person', async (req, res) => {
    const { dni, nombre, apellido, fecha_nacimiento } = req.body;

    if (!dni || !nombre || !apellido || !fecha_nacimiento) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        await db.insertPerson(dni, nombre, apellido, fecha_nacimiento);
        res.status(201).json({ message: 'Persona creada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});