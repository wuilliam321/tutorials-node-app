export class TutorialsService {
    constructor(tutorialsRepo) {
        this.tutorialsRepo = tutorialsRepo;
    }

    create(tutorial) {
        try {
            if (!tutorial.isValid()) {
                return false;
            }

            const result = this.tutorialsRepo.save(tutorial);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
