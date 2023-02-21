import { IvalidParamsError } from "../shared/errors";
import { Tutorial } from "./model";
import { TutorialsMySQLRepository } from "./repository";

describe("integration -> Tutorials Repository", () => {
    describe("save", () => {
        it("should save a new tutorial", async () => {
            const repo = new TutorialsMySQLRepository();
            const tutorial = new Tutorial({
                title: "a title",
                publishedStatus: "unpublished",
                videoUrl: "http://www.youtube.com/watch?v=test",
                description: "a description",
            });
            const result = await repo.save(tutorial);
            expect(result.id).toEqual("1");
        });
        it("should fail on invalid values", () => {
            const repo = new TutorialsMySQLRepository();
            const tutorial = new Tutorial({
                publishedStatus: "unpublished",
                videoUrl: "http://www.youtube.com/watch?v=test",
                description: "a description",
            });
            expect(async () => await repo.save(tutorial)).rejects.toThrow(
                IvalidParamsError
            );
        });
    });
});
