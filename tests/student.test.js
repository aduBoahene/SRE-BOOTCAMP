const request = require('supertest');
const app = require('../server');  // Import the app directly from server.js
const { sequelize } = require('../models');
let server;
let studentId; // Declare studentId here to ensure it's in the correct scope


beforeAll(async () => {
    await sequelize.sync();
    server = app.listen(9000);
});

afterAll(async () => {
    await server.close();
    await sequelize.close();
});


describe('student API', () => {

    //GET ALL STUDENTS
    it('should show all students', async () => {
        const res = await request(app).get('/student');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    });

    //GET 1 STUDENT
    it('should get a student by ID', async () => {
        const student = await request(app)
            .post('/student')
            .send({
                firstName: "Patrick", lastName: "Boahene", email: "patrick@gmail.com", studentId: "UG/9877/IU", level: "400", program: "Medicine"
            });

        const response = await request(app).get(`/student/${student.body.data.id}`)
        expect(response.status).toBe(200);
        expect(response.body.data.firstName).toBe('Patrick');
        expect(response.body.data.level).toBe("400");
    });

    //UPDATE  STUDENT
    it('should update a student', async () => {
        const student = await request(app)
            .post('/student')
            .send({
                firstName: "Patrick", lastName: "Boahene", email: "patrick@gmail.com", studentId: "UG/9877/IU", level: "400", program: "Medicine"
            });

        const response = await request(app)
            .put(`/student/${student.body.data.id}`)
            .send({ firstName: "John", lastName: "Doe" })

        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe('John');
        expect(response.body.lastName).toBe("Doe");
    });

    //CREATE NEW STUDENT
    it('should create a new student', async () => {
        const response = await request(app)
            .post('/student')
            .send({
                firstName: "Patrick", lastName: "Boahene", email: "patrick@gmail.com", studentId: "UG/9877/IU", level: "400", program: "Medicine"
            });

        expect(response.status).toBe(200);
        expect(response.body.data.firstName).toBe('Patrick');
        expect(response.body.data.level).toBe("400");
    });


    //DELETE A  STUDENT
    it('should delete a student', async () => {
        const student = await request(app)
            .post('/student')
            .send({
                firstName: "Patrick", lastName: "Boahene", email: "patrick@gmail.com", studentId: "UG/9877/IU", level: "400", program: "Medicine"
            });

        const response = await request(app)
            .delete(`/student/${student.body.data.id}`)

        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe(undefined);
        expect(response.body).toHaveProperty('message');

    });

});