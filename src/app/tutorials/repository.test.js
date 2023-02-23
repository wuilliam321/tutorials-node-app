import models from "../../../models";
import { IvalidParamsError } from "../shared/errors";
import { Tutorial } from "./models/tutorial";
import { Tutorial as TutorialDB } from "../../../models";
import { TutorialsMySQLRepository } from "./repository";

describe("integration -> Tutorials Repository", () => {
    afterAll(() => models.sequelize.close());

    beforeEach(async () => {
        await TutorialDB.destroy({
            truncate: true,
        });
    });

    describe("save", () => {
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

    describe("list", () => {
        it("should list all tutorials", async () => {
            const repo = new TutorialsMySQLRepository();
            const tutorial = new Tutorial({
                title: "a title",
                publishedStatus: "unpublished",
                videoUrl: "http://www.youtube.com/watch?v=test",
                description: "a description",
            });

            await repo.save(tutorial);
            await repo.save(tutorial);

            await expect(repo.list(tutorial)).resolves.toEqual([
                {
                    id: "1",
                    title: "a title",
                    publishedStatus: "unpublished",
                    videoUrl: "http://www.youtube.com/watch?v=test",
                    description: "a description",
                    deletedAt: null,
                },
                {
                    id: "2",
                    title: "a title",
                    publishedStatus: "unpublished",
                    videoUrl: "http://www.youtube.com/watch?v=test",
                    description: "a description",
                    deletedAt: null,
                },
            ]);
        });
    });
});
