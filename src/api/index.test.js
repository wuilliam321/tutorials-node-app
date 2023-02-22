import axios from "axios";
import Api from "./";
import { Tutorial } from "../app/tutorials/models";
import { TutorialsService } from "../app/tutorials/service";

const http = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    timeout: 1000,
});

describe("integration -> HTTP API V1", () => {
    describe("POST /tutorial", () => {
        it("should create a tutorial", async () => {
            const res = await http.post("/tutorials", {
                title: "a title",
                publishedStatus: "unpublished",
                videoUrl: "http://www.youtube.com/watch?v=test",
                description: "a description",
            });
            expect(res.data.id).toBeTruthy();
            expect(res.data.title).toBe("a title");
            expect(res.data.publishedStatus).toBe("unpublished");
            expect(res.data.videoUrl).toBe(
                "http://www.youtube.com/watch?v=test"
            );
            expect(res.data.description).toBe("a description");
        });
    });
});

describe("API Handlers", () => {
    describe("handleCreateTutorial", () => {
        let tutorialsService;
        let deps;
        let api;
        let validTutorial;
        let tutorialsRepo = {
            save: jest.fn(),
        };
        let tutorialService = new TutorialsService(tutorialsRepo);

        beforeEach(() => {
            tutorialsService = tutorialService;
            deps = { tutorialsService };
            api = new Api(deps);
            validTutorial = new Tutorial({
                title: "a title",
                publishedStatus: "unpublished",
                videoUrl: "http://www.youtube.com/watch?v=test",
                description: "a description",
            });
        });

        it("should fail if no body is provided", async () => {
            const req = {};
            const res = {
                send: jest.fn(),
                status: jest.fn(),
            };

            await api.handleCreateTutorial(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it("should fail if some required field is not provided", async () => {
            const req = {
                body: {
                    publishedStatus: "unpublished",
                },
            };
            const res = {
                send: jest.fn(),
                status: jest.fn(),
            };

            await api.handleCreateTutorial(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it("should create a tutorial", async () => {
            const req = {
                body: validTutorial,
            };
            const res = {
                send: jest.fn(),
                status: jest.fn(),
            };

            await api.handleCreateTutorial(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
