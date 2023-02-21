import { Tutorial } from "./tutorial";
import { TutorialsService } from "./service";

// Repository mock - we don't need to implement this now
const tutorialsRepositoryMock = {
    save: () =>
        new Tutorial({
            id: "1",
            title: "Test title",
            publishedStatus: false,
        }),
};

// Repository mock (failing one) - we don't need to implement this now
const tutorialsRepositoryFailingMock = {
    save: () => {
        throw new Error();
    },
};

describe("Tutorials Services", () => {
    describe("create", () => {
        it("should create a new tutorial", () => {
            const service = new TutorialsService(tutorialsRepositoryMock);
            const tutorial = new Tutorial({
                title: "Test title",
                publishedStatus: false,
            });
            const expected = new Tutorial({
                id: "1",
                title: "Test title",
                publishedStatus: false,
            });
            const result = service.create(tutorial);
            expect(result).toEqual(expected);
        });

        it("should should fail on invalid tutorial", () => {
            const service = new TutorialsService(tutorialsRepositoryMock);
            const tutorial = new Tutorial({});
            const result = service.create(tutorial);
            expect(result).toBe(false);
        });

        it("should should fail on repo error", () => {
            const service = new TutorialsService(
                tutorialsRepositoryFailingMock
            );
            const tutorial = new Tutorial({
                title: "Test title",
                publishedStatus: false,
            });
            expect(() => service.create(tutorial)).toThrowError();
        });
    });
});
