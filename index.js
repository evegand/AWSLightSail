const express = require("express"); // constante con libreria de express
const path = require("path");
const app = express();

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
    res.sendFile(path.join(__dirname, "views/students.html"));
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