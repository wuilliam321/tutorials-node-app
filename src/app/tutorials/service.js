import { IvalidParamsError } from "../shared/errors";
import { TutorialFindOptions } from "./models";

export class TutorialsService {
    constructor(tutorialsRepo) {
        this.tutorialsRepo = tutorialsRepo;
    }

    async create(tutorial) {
        try {
            const { error } = tutorial.isValid();
            if (error) {
                throw new IvalidParamsError(`invalid tutorial fields ${error}`);
            }
            const result = await this.tutorialsRepo.save(tutorial);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async list(options) {
        try {
            if (!options) {
                options = new TutorialFindOptions();
            }
            const { error } = options.isValid();
            if (error) {
                throw new IvalidParamsError(`invalid options fields ${error}`);
            }
            const result = await this.tutorialsRepo.findAll(options);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
