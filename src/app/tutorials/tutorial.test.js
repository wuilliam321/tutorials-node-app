import { Tutorial } from "./model";

describe("tutorial model", () => {
    describe("isValid", () => {
        it("should contain all required fields", () => {
            const tutorial = new Tutorial({
                title: "a title",
                publishedStatus: false,
            });
            const isValid = tutorial.isValid();
            expect(isValid).toBeTruthy();
        });
        it("should contain all fields", () => {
            const tutorial = new Tutorial({
                title: "a title",
                publishedStatus: false,
                videoUrl: "test",
                description: "test",
                deletedAt: new Date(),
            });
            const isValid = tutorial.isValid();
            expect(isValid).toBeTruthy();
        });

        it("should fail on missing required fields", () => {
            const tutorial = new Tutorial({
                title: "a title",
            });
            const isValid = tutorial.isValid();
            expect(isValid).toBeFalsy();
        });

        it("should fail on invalid fields", () => {
            const tutorial = new Tutorial({
                title: 1,
                publishedStatus: false,
            });
            const isValid = tutorial.isValid();
            expect(isValid).toBeFalsy();
        });

        it("verify invalid optional fields", () => {
            const tutorial = new Tutorial({
                title: "a title",
                publishedStatus: false,
                videoUrl: null,
            });
            const isValid = tutorial.isValid();
            expect(isValid).toBeFalsy();
        });
    });
});
