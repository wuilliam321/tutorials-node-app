import Joi from "joi";

export class Tutorial {
    constructor({
        id,
        title,
        publishedStatus,
        videoUrl,
        description,
        deletedAt,
    }) {
        this.id = id;
        this.title = title;
        this.publishedStatus = publishedStatus;
        this.videoUrl = videoUrl;
        this.description = description;
        this.deletedAt = deletedAt;
    }

    isValid() {
        const { error, value } = tutorialSchema.validate(this);
        if (error) {
            return false;
        }

        return value;
    }
}

const tutorialSchema = Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().required(),
    publishedStatus: Joi.bool().required(),
    videoUrl: Joi.string().optional(),
    description: Joi.string().optional(),
    deletedAt: Joi.date().optional(),
});

