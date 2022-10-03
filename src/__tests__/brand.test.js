import app from "../app";
import request from "supertest";

//remove .skip from describe to test cases
//remove --silent on test script from package.json for watch console.logs

describe.skip('GET /api/brands', () => {
    test("should respond with a 200 status code'", async () =>{
        const response = await request(app).get('/api/brands').send();
        expect(response.statusCode).toBe(200);
        console.log(response._body);
    });
});

describe.skip('GET /brands/:id/models', () => {
    test("should respond with a 200 status code'", async () =>{
        const id = 1;
        const response = await request(app).get(`/api/brands/${id}/models`).send();
        console.log(response._body);
        expect(response.statusCode).toBe(200);
    });
});

describe.skip('POST /brands', () => {
    test("should respond with a 200 status code'", async () =>{
        const object = {"brand_name": "XLR2","average_price":450000};
        const response = await request(app).post('/api/brands/').send(object);
        console.log(response._body);
        expect(response.statusCode).toBe(200);
    });
});

describe.skip('POST /brands/:id/models', () => {
    test("should respond with a 200 status code'", async () =>{
        const id = 1743;
        const object = {"name": "007","average_price":450000};
        const response = await request(app).post(`/api/brands/${id}/models`).send(object);
        console.log(response._body);
        expect(response.statusCode).toBe(200);
    });
});

describe.skip('PUT /models/:id', () => {
    test("should respond with a 200 status code'", async () =>{
        const id = 1;
        const object = {"average_price":300000};
        const response = await request(app).put(`/api/models/${id}`).send(object);
        console.log(response._body);
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /models?greater=&lower=', () => {
    test("should respond with a 200 status code'", async () =>{
        const greater = 380000;
        const lower = 400000;
        const response = await request(app).get(`/api/models?greater=${greater}&lower=${lower}`).send();
        console.log(response._body);
        expect(response.statusCode).toBe(200);
    });
});