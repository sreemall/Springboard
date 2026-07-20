const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../app");
const Users = require("../models/userModel");
const Dogs = require("../models/dogModel");

const expect = chai.expect;

chai.use(chaiHttp);


describe("Dog API", () => {

    let ownerCookie;
    let adopterCookie;

    let availableDogId;
    let adoptDogId;


    before(async () => {

        // Cleanup old test data
        await Users.deleteMany({
            username: {
                $in: ["dogowner", "dogadopter"]
            }
        });

        await Dogs.deleteMany({
            name: {
                $in: ["Buddy", "Max"]
            }
        });


        // Create owner user
        await Users.create({
            username: "dogowner",
            password: "password1"
        });


        // Create adopter user
        await Users.create({
            username: "dogadopter",
            password: "password1"
        });


        // Login owner
        let res = await chai.request(app)
            .post("/users/login")
            .send({
                username: "dogowner",
                password: "password1"
            });

        expect(res).to.have.status(200);

        ownerCookie = res.header["set-cookie"];


        // Login adopter
        res = await chai.request(app)
            .post("/users/login")
            .send({
                username: "dogadopter",
                password: "password1"
            });

        expect(res).to.have.status(200);

        adopterCookie = res.header["set-cookie"];

    });



    it("should register a dog", async () => {

        const res = await chai.request(app)
            .post("/dogs")
            .set("Cookie", ownerCookie)
            .send({
                name: "Buddy",
                description: "Golden Retriever"
            });


        expect(res).to.have.status(201);

        expect(res.body)
            .to.have.property("_id");


        expect(res.body.name)
            .to.equal("Buddy");


        availableDogId = res.body._id;

    });



    it("should list my registered dogs", async () => {

        const res = await chai.request(app)
            .get("/dogs/my-dogs")
            .set("Cookie", ownerCookie);


        expect(res).to.have.status(200);

        expect(res.body)
            .to.be.an("array");


        expect(res.body[0].name)
            .to.equal("Buddy");

    });



    it("should list my dogs with available filter", async () => {

        const res = await chai.request(app)
            .get("/dogs/my-dogs?status=available")
            .set("Cookie", ownerCookie);


        expect(res).to.have.status(200);

        expect(res.body)
            .to.be.an("array");

    });



    it("should register another dog for adoption testing", async () => {

        const res = await chai.request(app)
            .post("/dogs")
            .set("Cookie", ownerCookie)
            .send({
                name: "Max",
                description: "Labrador"
            });


        expect(res).to.have.status(201);

        adoptDogId = res.body._id;

    });



    it("should adopt dog by another user", async () => {

        const res = await chai.request(app)
            .post(`/dogs/${adoptDogId}/adopt`)
            .set("Cookie", adopterCookie)
            .send({
                thankYouMessage:
                    "Thank you for allowing me to adopt Max!"
            });


        expect(res).to.have.status(200);

        expect(res.body)
            .to.equal("Dog Adoption Successful!");

    });



    it("should list my adopted dogs", async () => {

        const res = await chai.request(app)
            .get("/dogs/my-adoptions")
            .set("Cookie", adopterCookie);


        expect(res).to.have.status(200);

        expect(res.body)
            .to.be.an("array");


        expect(res.body[0].name)
            .to.equal("Max");

    });



    it("should not allow removing an adopted dog", async () => {

        const res = await chai.request(app)
            .delete(`/dogs/${adoptDogId}`)
            .set("Cookie", ownerCookie);


        expect(res).to.have.status(403);

        expect(res.body)
            .to.equal(
                "Remove Dog Failed! Cannot Remove since it is already Adopted"
            );

    });



    it("should remove available dog", async () => {

        const res = await chai.request(app)
            .delete(`/dogs/${availableDogId}`)
            .set("Cookie", ownerCookie);


        expect(res).to.have.status(200);

        expect(res.body)
            .to.equal("Removed Dog Successfully");

    });



    it("should reject invalid dog status filter", async () => {

        const res = await chai.request(app)
            .get("/dogs/my-dogs?status=random")
            .set("Cookie", ownerCookie);


        expect(res).to.have.status(400);

    });



    after(async () => {

        await Dogs.deleteMany({
            name: {
                $in: ["Buddy", "Max"]
            }
        });


        await Users.deleteMany({
            username: {
                $in: ["dogowner", "dogadopter"]
            }
        });

    });


});