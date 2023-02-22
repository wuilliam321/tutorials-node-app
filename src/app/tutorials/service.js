import { IvalidParamsError } from "../shared/errors";

export class TutorialsService {
    constructor(tutorialsRepo) {
        this.tutorialsRepo = tutorialsRepo;
    }

    async create(tutorial) {
        try {
            const { error } = tutorial.isValid();
            if (error) {
                throw new IvalidParamsError(`invalid fields ${error}`);
            }
            const result = await this.tutorialsRepo.save(tutorial);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
