const express = require('express');
const app = express();
const { sequelize } = require('./models'); // Import Sequelize instance
const { Student } = require('./models');
const logger = require('morgan');


app.use(express.json());
app.use(logger('dev'))


app.post("/api/v1/student", async (req, res) => {
    try {
        const { firstName, lastName, email, studentId, level, program } = req.body;
        const newStudent = await Student.create({ firstName, lastName, email, studentId, level, program })
        if (!newStudent) {
            res.json(
                {
                    msg: "An error occured"
                })
        }
        res.json(
            {
                msg: "Student saved",
                data: newStudent
            })
    } catch (error) {
        console.log(error)
    }

})

app.get("/api/v1/student", async (req, res) => {
    try {
        const students = await Student.findAll({})
        res.json({ data: students })
    } catch (error) {
        console.log(error)
    }

})

// Fetch endpoint to fetch a student by ID
app.get('/api/v1/student/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }


        res.json({ msg: 'Student found successfully', data: student });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the student' });
    }
});

// PUT endpoint to update a student by ID
app.put('/api/v1/student/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, studentId, level, program } = req.body; // Assuming these are the fields you want to update

    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        student.firstName = firstName !== undefined ? firstName : student.firstName;
        student.lastName = lastName !== undefined ? lastName : student.lastName;
        student.email = email !== undefined ? email : student.email;
        student.studentId = studentId !== undefined ? studentId : student.studentId;
        student.level = level !== undefined ? level : student.level;
        student.program = program !== undefined ? program : student.program;

        await student.save();

        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the student' });
    }
});

// Delete endpoint to Delete a student by ID
app.delete('/api/v1/student/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        await student.destroy();

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the student' });
    }
});



// Healthcheck endpoint
app.get('/healthcheck', (req, res) => {
    res.status(200).json({ status: 'ok' });
});



module.exports = app;


