# Documentación de la API

## Requisitos

* Node.js instalado y npm (viene con Node.js)
* Dependencias del proyecto instaladas:

    ```bash
    npm install express mysql2 cors dotenv
    ```

## Instrucciones de ejecución

1.  Terminal abierta en el directorio del proyecto.
2.  Ejecutar `node app.js`.

## Endpoints

### 1. Obtener Banderas por DNI

* **Ruta:** `http://localhost:3000/flags/:dni`
* **Método:** `GET`
* **Descripción:** Obtiene una lista de banderas para un DNI específico.
* **Parámetros:**
    * `dni` (ruta): DNI del usuario.
* **Ejemplo de Solicitud:**

    ```bash
    GET http://localhost:3000/flags/12345678
    ```

### 2. Actualizar Tiempo de Aprendizaje

* **Ruta:** `http://localhost:3000/flags/learning/:dni/:id`
* **Método:** `PUT`
* **Descripción:** Actualiza el tiempo de aprendizaje para una bandera específica.
* **Parámetros:**
    * `dni` (ruta): DNI del usuario.
    * `id` (ruta): ID de la bandera.
    * `timeTaken` (body): Tiempo tomado (en segundos).
* **Ejemplo de Solicitud:**

    ```bash
    PUT http://localhost:3000/flags/learning/12345678/1
    ```

    ```json
    {
        "timeTaken": 15.5
    }
    ```

### 3. Actualizar Tiempo de Experimento "Random"

* **Ruta:** `http://localhost:3000/flags/random/:dni/:id`
* **Método:** `PUT`
* **Descripción:** Actualiza el tiempo random para una bandera específica.
* **Parámetros:**
    * `dni` (ruta): DNI del usuario.
    * `id` (ruta): ID de la bandera.
    * `timeTaken` (body): Tiempo tomado (en segundos).
* **Ejemplo de Solicitud:**

    ```bash
    PUT http://localhost:3000/flags/random/12345678/1
    ```

    ```json
    {
        "timeTaken": 20.0
    }
    ```

### 4. Actualizar `f_random`

* **Ruta:** `http://localhost:3000/flags/randomFlag/:id`
* **Método:** `PUT`
* **Descripción:** Actualiza el flag `f_random` para una bandera específica.
* **Parámetros:**
    * `id` (ruta): ID de la bandera.
* **Ejemplo de Solicitud:**

    ```bash
    PUT http://localhost:3000/flags/randomFlag/1
    ```

### 5. Actualizar Tiempo de Experimento "Entre"

* **Ruta:** `http://localhost:3000/flags/between/:dni/:id`
* **Método:** `PUT`
* **Descripción:** Actualiza el tiempo between para una bandera específica.
* **Parámetros:**
    * `dni` (ruta): DNI del usuario.
    * `id` (ruta): ID de la bandera.
    * `timeTaken` (body): Tiempo tomado (en segundos).
* **Ejemplo de Solicitud:**

    ```bash
    PUT http://localhost:3000/flags/between/12345678/1
    ```

    ```json
    {
        "timeTaken": 18.2
    }
    ```

### 6. Actualizar `f_entre`

* **Ruta:** `http://localhost:3000/flags/betweenFlag/:id`
* **Método:** `PUT`
* **Descripción:** Actualiza el flag `f_entre` para una bandera específica.
* **Parámetros:**
    * `id` (ruta): ID de la bandera.
* **Ejemplo de Solicitud:**

    ```bash
    PUT http://localhost:3000/flags/betweenFlag/1
    ```

### 7. Actualizar Tiempo de Experimento "Circulo"

* **Ruta:** `http://localhost:3000/flags/circle/:dni/:id`
* **Método:** `PUT`
* **Descripción:** Actualiza el tiempo circle para una bandera específica.
* **Parámetros:**
    * `dni` (ruta): DNI del usuario.
    * `id` (ruta): ID de la bandera.
    * `timeTaken` (body): Tiempo tomado (en segundos).
* **Ejemplo de Solicitud:**

    ```bash
    PUT http://localhost:3000/flags/circle/12345678/1
    ```

    ```json
    {
        "timeTaken": 22.8
    }
    ```

### 8. Actualizar `f_circunferencia`

* **Ruta:** `http://localhost:3000/flags/circleFlag/:id`
* **Método:** `PUT`
* **Descripción:** Actualiza el flag `f_circunferencia` para una bandera específica.
* **Parámetros:**
    * `id` (ruta): ID de la bandera.
* **Ejemplo de Solicitud:**

    ```bash
    PUT http://localhost:3000/flags/circleFlag/1
    ```

### 9. Obtener DNI de Configuración

* **Ruta:** `http://localhost:3000/config/dni`
* **Método:** `GET`
* **Descripción:** Obtiene el DNI de la tabla de configuración. Usado desde la app de Unity para obtener con qué DNI se realizará el experimento
* **Ejemplo de Solicitud:**

    ```bash
    GET http://localhost:3000/config/dni
    ```

### 10. Actualizar DNI en Configuración

* **Ruta:** `http://localhost:3000/config/dni/:dni`
* **Método:** `PUT`
* **Descripción:** Actualiza el DNI en la tabla de configuración. Usado desde la página web para especificar con qué DNI se realizará el experimento
* **Parámetros:**
    * `dni` (ruta): Nuevo DNI.
* **Ejemplo de Solicitud:**

    ```bash
    PUT http://localhost:3000/config/dni/87654321
    ```

### 11. Guardar Experimento de Aprendizaje

* **Ruta:** `http://localhost:3000/learning`
* **Método:** `POST`
* **Descripción:** Guarda un experimento de aprendizaje. Usado desde la página web para configurar las banderas que el experimentador tendrá que recordar durante el Aprendizaje
* **Parámetros:**
    * `flags` (body): Array de banderas.
* **Ejemplo de Solicitud:**

    ```bash
    POST http://localhost:3000/learning
    ```

    ```json
    {
        "flags": [
            {
                "id_bandera": 1,
                "dni": 12345678,
                "positionX": 10.0,
                "positionZ": 20.0
            },
            {
                "id_bandera": 2,
                "dni": 12345678,
                "positionX": 30.0,
                "positionZ": 40.0
            }
        ]
    }
    ```
