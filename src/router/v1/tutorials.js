import { Router } from "express";
import Api from "../../api";
import { TutorialsService } from "../../app/tutorials/service";
import { TutorialsMySQLRepository } from "../../app/tutorials/repository";

const router = Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })
//
//
const api = new Api({
    tutorialsService: new TutorialsService(new TutorialsMySQLRepository()),
});

// TODO: openopi docs
router.post("/", api.handleCreateTutorial.bind(api));

export default router;
