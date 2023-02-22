import { Tutorial } from "../app/tutorials/model";

export default class Api {
    constructor({ tutorialsService }) {
        this.tutorialsService = tutorialsService;
    }

    async handleCreateTutorial(req, res) {
        try {
            if (!req.body) {
                res.status(400);
                res.send("Bad Request");
                return;
            }

            const tutorial = new Tutorial(req.body);
            const result = await this.tutorialsService.create(tutorial);
            res.status(200);
            res.send(result);
        } catch (err) {
            res.status(400);
            res.send(err);
        }
    }
}
