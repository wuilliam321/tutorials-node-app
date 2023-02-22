import models from "../../../models";
import { IvalidParamsError } from "../shared/errors";
import { Tutorial } from "./models";
import { TutorialsMySQLRepository } from "./repository";

describe("integration -> Tutorials Repository", () => {
    describe("save", () => {
        afterAll(() => models.sequelize.close());

        it("should save a new tutorial", async () => {
            const repo = new TutorialsMySQLRepository();
            const tutorial = new Tutorial({
                title: "a title",
                publishedStatus: "unpublished",
                videoUrl: "http://www.youtube.com/watch?v=test",
                description: "a description",
            });
            await expect(repo.save(tutorial)).resolves.toEqual({
                id: "1",
                title: "a title",
                publishedStatus: "unpublished",
                videoUrl: "http://www.youtube.com/watch?v=test",
                description: "a description",
            });
        });

        it("should fail on invalid values", async () => {
            const repo = new TutorialsMySQLRepository();
            const tutorial = new Tutorial({
                publishedStatus: "unpublished",
                videoUrl: "http://www.youtube.com/watch?v=test",
                description: "a description",
            });
            await expect(repo.save(tutorial)).rejects.toThrow(
                IvalidParamsError
            );
        });
    });
});
