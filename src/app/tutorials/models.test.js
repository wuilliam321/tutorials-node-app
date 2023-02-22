import { Tutorial } from "./models";

describe("tutorial model", () => {
    describe("isValid", () => {
        it("should contain all required fields", () => {
            const tutorial = new Tutorial({
                title: "a title",
                publishedStatus: "unpublished",
            });
            const { error, value } = tutorial.isValid();
            expect(value).toBeTruthy();
            expect(error).toBeUndefined();
        });
        it("should contain all fields", () => {
            const tutorial = new Tutorial({
                title: "a title",
                publishedStatus: "unpublished",
                videoUrl: "test",
                description: "test",
                deletedAt: new Date(),
            });
            const { error, value } = tutorial.isValid();
            expect(value).toBeTruthy();
            expect(error).toBeUndefined();
        });

        it("should fail on missing required fields", () => {
            const tutorial = new Tutorial({
                title: "a title",
            });
            const { error } = tutorial.isValid();
            expect(error).not.toBeNull();
        });

        it("should fail on invalid fields", () => {
            const tutorial = new Tutorial({
                title: 1,
                publishedStatus: "unpublished",
            });
            const { error } = tutorial.isValid();
            expect(error).not.toBeNull();
        });

        it("verify invalid optional fields", () => {
            const tutorial = new Tutorial({
                title: "a title",
                publishedStatus: "unpublished",
                videoUrl: null,
            });
            const { error } = tutorial.isValid();
            expect(error).not.toBeNull();
        });
    });
});
