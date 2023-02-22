import { Tutorial } from "./model";
import { Tutorial as TutorialDB } from "../../../models";
import { ValidationError, ConnectionRefusedError } from "sequelize";
import { IvalidParamsError, ServerError, UnknownError } from "../shared/errors";

export class TutorialsMySQLRepository {
    async save(tutorial) {
        try {
            const result = await TutorialDB.create({
                id: tutorial.id,
                title: tutorial.title,
                published_status: tutorial.publishedStatus,
                video_url: tutorial.videoUrl,
                description: tutorial.description,
                deleted_at: tutorial.deletedAt,
            });
            return new Tutorial({
                id: result.id.toString(),
                title: result.title,
                publishedStatus: result.published_status,
                videoUrl: result.video_url,
                description: result.description,
                deletedAt: result.deleted_at,
            });
        } catch (err) {
            if (err instanceof ValidationError) {
                throw new IvalidParamsError(err.message);
            }
            if (err instanceof ConnectionRefusedError) {
                throw new ServerError(err.message);
            }
            // TODO: add more specific errors here (db down, db error,...)
            throw UnknownError(err);
        }
    }
}
