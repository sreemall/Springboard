const chai = require("chai");
const chaiHttp = require("chai-http");
const Users = require("../models/userModel");
const app = require("../app");   //Express app

const expect = chai.expect;

chai.use(chaiHttp);


//Test Register User
describe("User API", () => {

    before(async () => {
        await Users.deleteOne({ username: "testuser" });
    });
    it("should register a new user", async () => {

        const res = await chai.request(app)
            .post("/users/register")
            .send({
                username: "testuser",
                password: "password123"
            });
    
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("username");
        expect(res.body.username).to.equal("testuser");
    });

    after(async () => {
        await Users.deleteOne({ username: "testuser" });
    });
});

//Test Login
describe("Login API", () => {

    before(async () => {
        // Remove old test user if it exists
        await Users.deleteOne({ username: "testuser" });

        // Create user needed for login test
        await Users.create({
            username: "testuser",
            password: "password123"
        });
    });

    it("should login successfully", async () => {

        const res = await chai.request(app)
            .post("/users/login")
            .send({
                username: "testuser",
                password: "password123"
            });
    
        expect(res).to.have.status(200);
    
    });

    it("should not login successfully", async () => {

        const res = await chai.request(app)
            .post("/users/login")
            .send({
                username: "testuser",
                password: "wrongpassword"
            });
    
            expect(res).to.have.status(401);
    
    });

    it("should not login successfully", async () => {

        const res = await chai.request(app)
            .post("/users/login")
            .send({
                username: "",
                password: ""
            });
    
            expect(res).to.have.status(400);
    
    });

    after(async () => {
        await Users.deleteOne({ username: "testuser" });
    });

});
