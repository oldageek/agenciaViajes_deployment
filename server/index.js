// Importar Express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

require('dotenv').config({ path: 'variables.env' });

const configs = require('./config');

// db.authenticate()
//     .then(() => console.log('DB conectada'))
//     .catch(err => console.log(err));

// Configurar Express
const app = express();

// habilitar pug
app.set('view engine', 'pug');

// Anadir vistas
app.set('views', path.join(__dirname, './views'));

// Cargar una carpeta estatica llamada public
app.use(express.static('public'));

// Validar si estamos en desarrollo o en produccion
const config = configs[app.get('env')];

// Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// Muestra el anio actual y genera la ruta
app.use((req, res, next) => {
    // crear una fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();
});

// Ejecutamos el bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// cargar las rutas
app.use('/', routes());

// Puerto y Host para la App
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});