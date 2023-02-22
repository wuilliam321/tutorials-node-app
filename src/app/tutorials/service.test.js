import { Tutorial } from "./model";
import { TutorialsService } from "./service";
import { IvalidParamsError, ServerError } from "../shared/errors";

// Repository mock - we don't need to implement this now
const tutorialsRepositoryMock = {
    save: async () =>
        new Tutorial({
            id: "1",
            title: "Test title",
            publishedStatus: "unpublished",
        }),
};

// Repository mock (failing one) - we don't need to implement this now
const tutorialsRepositoryFailingMock = {
    save: async () => {
        throw new ServerError("");
    },
};

describe("Tutorials Services", () => {
    describe("create", () => {
        it("should create a new tutorial", async () => {
            const service = new TutorialsService(tutorialsRepositoryMock);
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
            const service = new TutorialsService(tutorialsRepositoryMock);
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
});
