import { IvalidParamsError } from "../app/shared/errors";
import { Tutorial } from "../app/tutorials/models";

export default class Api {
    constructor({ tutorialsService }) {
        this.tutorialsService = tutorialsService;
    }

    async handleCreateTutorial(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                res.status(400);
                const err = new IvalidParamsError("no body provided");
                res.send({
                    type: err.name,
                    message: err.message,
                });
                return;
            }

            const tutorial = new Tutorial(req.body);
            const result = await this.tutorialsService.create(tutorial);
            res.status(200);
            res.send(result);
        } catch (err) {
            res.status(400);
            res.send({
                type: err.name,
                message: err.message,
            });
        }
    }
}
