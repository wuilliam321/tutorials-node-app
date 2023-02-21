import { IvalidParamsError } from "../shared/errors";

export class TutorialsService {
    constructor(tutorialsRepo) {
        this.tutorialsRepo = tutorialsRepo;
    }

    async create(tutorial) {
        try {
            if (!tutorial.isValid()) {
                throw new IvalidParamsError("Invalid error");
            }
            return await this.tutorialsRepo.save(tutorial);
        } catch (err) {
            throw err;
        }
    }
}
