const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'mysql-vrmarket-pladema-ef62.d.aivencloud.com',
    port: 26116,
    user: 'avnadmin',
    password: 'AVNS_BD6D-d03halBr0cMHzd',
    database: 'cave'
};

const pool = mysql.createPool(dbConfig);

async function executeQuery(query, params = []) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(query, params);
        connection.release();
        return rows;
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        throw error;
    }
}

async function getFlagsByDni(dni) {
    const query = `
        SELECT B.color, A.posicionX, A.posicionZ, A.id
        FROM APRENDIZAJE A
        JOIN BANDERA B ON A.id_bandera = B.id
        WHERE A.dni = ? AND DATE(A.fecha) = CURDATE()
        ORDER BY A.id ASC`;
    return executeQuery(query, [dni]);
}

async function updateLearningTime(dni, id, timeTaken) {
    const query = `UPDATE APRENDIZAJE SET tiempo_encontrada_aprendizaje = ? WHERE dni = ? AND id = ?`;
    return executeQuery(query, [timeTaken, dni, id]);
}

async function updateRandomTime(dni, id, timeTaken) {
    const query = `UPDATE APRENDIZAJE SET tiempo_encontrada_random = ? WHERE dni = ? AND id = ?`;
    return executeQuery(query, [timeTaken, dni, id]);
}

async function updateFRandom(id) {
    const query = `UPDATE APRENDIZAJE SET f_random = TRUE WHERE id = ?`;
    return executeQuery(query, [id]);
}

async function updateBetweenTime(dni, id, timeTaken) {
    const query = `UPDATE APRENDIZAJE SET tiempo_plantada_entre = ? WHERE dni = ? AND id = ?`;
    return executeQuery(query, [timeTaken, dni, id]);
}

async function updateFEntre(id) {
    const query = `UPDATE APRENDIZAJE SET f_entre = TRUE WHERE id = ?`;
    return executeQuery(query, [id]);
}

async function updateCircleTime(dni, id, timeTaken) {
    const query = `UPDATE APRENDIZAJE SET tiempo_encontrada_circun = ? WHERE dni = ? AND id = ?`;
    return executeQuery(query, [timeTaken, dni, id]);
}

async function updateFCircle(id) {
    const query = `UPDATE APRENDIZAJE SET f_circunferencia = TRUE WHERE id = ?`;
    return executeQuery(query, [id]);
}

async function getDniFromConfig() {
    const query = `SELECT dni FROM CONFIG WHERE id = 1`;
    return executeQuery(query);
}

async function updateDniInConfig(dni) {
    const query = `UPDATE CONFIG SET dni = ? WHERE id = 1`;
    return executeQuery(query, [dni]);
}

async function insertLearningFlags(flags) {
    const query = `INSERT INTO APRENDIZAJE (id_bandera, dni, posicionX, posicionZ, fecha) VALUES (?, ?, ?, ?, NOW())`;
    for (const flag of flags) {
        await executeQuery(query, [flag.id_bandera, flag.dni, flag.positionX, flag.positionZ]);
    }
}

module.exports = {
    getFlagsByDni,
    updateLearningTime,
    updateRandomTime,
    updateFRandom,
    updateBetweenTime,
    updateFEntre,
    updateCircleTime,
    updateFCircle,
    getDniFromConfig,
    updateDniInConfig,
    insertLearningFlags
};