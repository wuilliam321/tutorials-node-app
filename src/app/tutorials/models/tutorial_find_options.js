import Joi from "joi";
import { IvalidParamsError } from "../../shared/errors";

export class TutorialFindOptions {
    constructor(options) {
        this.filter = (options && options.filter) || {};
        this.sort = (options && options.sort) || {};
    }

    isValid() {
        const { error, value } = schema.validate(this);
        if (error) {
            return { error: new IvalidParamsError(error.message), value };
        }

        return { value };
    }
}

const schema = Joi.object({
    filter: Joi.object({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
    }).optional(),
    sort: Joi.object({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
    }).optional(),
});
