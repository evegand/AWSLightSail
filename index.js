const express = require("express"); // constante con libreria de express
const path = require("path");
const app = express();
const fs = require('fs');

app.use(express.json()); // Librerias de json

const students = [
    {id: 1, name: 'Jair', age: 22, active: true},
    {id: 2, name: 'Erubey', age: 23, active: false},
    {id: 3, name: 'Mariana', age: 24, active: false},
    {id: 4, name: 'Eve', age: 25, active: true},
];

/** Home page */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

/** Mostrar estudiantes */
app.get('/api/students/json', (req, res) => {
    res.send(students);
});

/** Mostrar estudiantes */
app.get('/api/students', (req, res) => {
    vista = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <!-- Required meta tags -->
            <meta charset="utf-8" />
            <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />

            <!-- Bootstrap CSS -->
            <link 
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
            integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
            crossorigin="anonymous"
            />
            <title>Estudiantes</title>
        </head>
        <body>
            <div class="jumbotron">
                <div class="container"><h1>Estudiantes Registrados</h1></div>
            </div>
            <div class="ml-3">
                <div><a href="/home" class="btn btn-md btn-secondary mr-2 mb-2">Regresar</a></div>
            </div>
            <div class="ml-3" style="width:50%;">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
            <tbody>`
            students.forEach(element => {
                vista +=
                `<tr>
                    <th scope="row">${element.id}</th>
                    <td>${element.name}</td>
                    <td>${element.age}</td>
                    <td>${element.active ? "Activo" : "Inactivo"}</td>
                </tr>`
            });{
            }
    vista += `
            </tbody>
            </table>
        </div>

        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"
        ></script>
        <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"
        ></script>
        <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
        crossorigin="anonymous"
        ></script>
        </body>
        </html>`
    fs.writeFile('views/students.html', vista, (err) => {
        if (err) throw err;
        res.sendFile(path.join(__dirname, "views/students.html"));
    });
});

const port = 3000;

/** Listen */
app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});
