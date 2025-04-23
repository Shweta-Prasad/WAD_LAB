const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// mongoose.connect('connection string')
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((err) => {
//         console.error('Error connecting to MongoDB:', err);
//     }
//     );


const StudentSchema = new mongoose.Schema({
    name: String,
    marks: Number
});

const Student = mongoose.model('Student', StudentSchema);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to Student API');
});

// Create API - POST
app.post('/add-student', async (req, res) => {
    try {
        const { name, marks } = req.body;
        const newStudent = new Student({ name, marks });
        await newStudent.save();
        res.status(200).json({ message: "Student added successfully!" });
    } catch (err) {
        res.status(500).json({ err: "Error adding student..." });
    }
});

// Read API - GET
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.send(students);
    } catch (err) {
        res.status(500).json({ err: "Error retrieving student data..." });
    }
});

// Get students by name
app.get('/students/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const students = await Student.find({ name } );
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ err: "Error retrieving students..." });
    }
});

// Update API - PUT
app.put('/update-student/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, marks } = req.body;

        // Find and update the student by ID
        const student = await Student.findByIdAndUpdate(id, { name, marks }, { new: true });
        res.status(200).json({ message: "Student Updated Successfully", student });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// Delete API - DELETE

// Delete based on ID
app.delete('/delete-student/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const students = await Student.findByIdAndDelete(id);
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ err: "Error in deleting student details" });
    }
});

// Delete students with marks less than given value
app.delete('/delete-on-marks/:marks', async (req, res) => {
    try {
        const marks = parseInt(req.params.marks);
        const delStudents = await Student.deleteMany({ marks: { $lt: marks } });
        res.status(200).json({ message: `${delStudents.deletedCount} students deleted with marks less than ${marks}` });
    } catch (err) {
        res.status(500).json({ err: "Error deleting students..." });
    }
});
