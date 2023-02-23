import { Tutorial, TutorialFindOptions } from "./models";
import { TutorialsService } from "./service";
import { IvalidParamsError, ServerError } from "../shared/errors";

// Repository mock - we don't need to implement this now
const tutorialsRepositorySuccessMock = {
    save: async () =>
        new Tutorial({
            id: "1",
            title: "Test title",
            publishedStatus: "unpublished",
        }),
    findAll: async () => [
        new Tutorial({
            id: "1",
            title: "Test title",
            publishedStatus: "unpublished",
        }),
    ],
};

// Repository mock (failing one) - we don't need to implement this now
const tutorialsRepositoryFailingMock = {
    save: async () => {
        throw new ServerError("");
    },
    findAll: async () => {
        throw new ServerError("");
    },
};

// Repository mock (failing one) - we don't need to implement this now
const tutorialsRepositoryStubsMock = {
    save: jest.fn(),
    findAll: jest.fn(),
};

describe("Tutorials Services", () => {
    describe("create", () => {
        it("should create a new tutorial", async () => {
            const service = new TutorialsService(
                tutorialsRepositorySuccessMock
            );
            const tutorial = new Tutorial({
                title: "Test title",
                publishedStatus: "unpublished",
            });
            const expected = new Tutorial({
                id: "1", // hardcoded id
                title: "Test title",
                publishedStatus: "unpublished",
            });
            const result = await service.create(tutorial);
            expect(result).toEqual(expected);
        });

        it("should should fail on invalid tutorial", () => {
            const service = new TutorialsService(
                tutorialsRepositorySuccessMock
            );
            const tutorial = new Tutorial({});
            expect(async () => await service.create(tutorial)).rejects.toThrow(
                IvalidParamsError
            );
        });

        it("should should fail on repo error", () => {
            const service = new TutorialsService(
                tutorialsRepositoryFailingMock
            );
            const tutorial = new Tutorial({
                title: "Test title",
                publishedStatus: "unpublished",
            });
            expect(async () => await service.create(tutorial)).rejects.toThrow(
                ServerError
            );
        });
    });
    describe("list", () => {
        it("should list all tutorials", async () => {
            const service = new TutorialsService(
                tutorialsRepositorySuccessMock
            );
            const options = new TutorialFindOptions();
            const result = await service.list(options);
            const expected = [
                new Tutorial({
                    id: "1",
                    title: "Test title",
                    publishedStatus: "unpublished",
                }),
            ];
            expect(result).toEqual(expected);
        });

        it("should should fail on repo error", async () => {
            const service = new TutorialsService(
                tutorialsRepositoryFailingMock
            );
            const options = new TutorialFindOptions();
            await expect(service.list(options)).rejects.toThrow(ServerError);
        });

        it("should filter by title and description", async () => {
            const service = new TutorialsService(tutorialsRepositoryStubsMock);
            const options = new TutorialFindOptions({
                filter: {
                    title: "some title",
                    description: "some desc",
                },
                sort: {
                    title: "asc",
                    description: "asc",
                },
            });
            await service.list(options);
            expect(tutorialsRepositoryStubsMock.findAll).toHaveBeenCalledWith(
                options
            );
        });

        it("should use default options if not provided", async () => {
            const service = new TutorialsService(tutorialsRepositoryStubsMock);
            await service.list();
            expect(tutorialsRepositoryStubsMock.findAll).toHaveBeenCalledWith({
                filter: {},
                sort: {},
            });
        });

        it("should fail on invalid options", async () => {
            const service = new TutorialsService(tutorialsRepositoryStubsMock);
            const options = new TutorialFindOptions({
                filter: {
                    invalid: "some title",
                },
            });
            await expect(service.list(options)).rejects.toThrow(
                IvalidParamsError
            );
        });
    });
});
