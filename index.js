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
                <div class="container"><h1>Estudiantes</h1></div>
            </div>
            <div class="ml-3">
                <div><a href="/home" class="btn btn-md btn-secondary mr-2">Regresar</a></div>
            </div>
            <div class="ml-3" >
                <li></li>
                <table class="table" ng-repeat="student in students">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
            <tbody>`
            students.forEach(element => {
                vista +=
                `<tr>
                    <th scope="row">${element.id}</th>
                    <td>${element.name}</td>
                    <td>${element.age}</td>
                    <td>${element.active}</td>
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
        console.log('Archivo actualizado Satisfactoriamente');
        res.sendFile(path.join(__dirname, "views/students.html"));
    });
});

/** Buscar estudiante por ID */
app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("Estudiante no encontrado");
    else res.send(student);
});

/** Agregar estudiante */
app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        active: (req.body.active === 'true')
    };

    students.push(student);
    res.send(student);
});

/** Eliminar estudiante */
app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado');

    const index = students.indexOf(student);
    index.splice(index, 1);
    res.send(student);
})

const port = 3000;

/** Listen */
app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});

/*
app.get("/", (req, res) => {
    res.send(`Hello ${port}`);
});

app.get("/:name", (req, res) => {
    res.send(`Hello ${req.params.name}`);
});
*/