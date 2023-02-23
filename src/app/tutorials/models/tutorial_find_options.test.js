import { TutorialFindOptions } from "./tutorial_find_options";

describe("tutorial find options model", () => {
    describe("isValid", () => {
        it("should contain all required fields", () => {
            expect(true).toBe(true);
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
            const { error, value } = options.isValid();
            expect(value).toBeTruthy();
            expect(error).toBeUndefined();
        });

        it("should use default values if no one is provided", () => {
            const options = new TutorialFindOptions();
            const { error, value } = options.isValid();
            expect(error).not.toBeNull();
            expect(value).toEqual({
                filter: {},
                sort: {},
            });
        });

        it("should fail on invalid fields", () => {
            const options = new TutorialFindOptions({
                invalid: "",
            });
            const { error } = options.isValid();
            expect(error).not.toBeNull();
        });
    });
});
