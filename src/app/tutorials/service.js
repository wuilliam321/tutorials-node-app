import { BadRequestError } from "../shared/errors";

export class TutorialsService {
    constructor(tutorialsRepo) {
        this.tutorialsRepo = tutorialsRepo;
    }

    create(tutorial) {
        try {
            if (!tutorial.isValid()) {
                throw new BadRequestError("Invalid error");
            }

            const result = this.tutorialsRepo.save(tutorial);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
