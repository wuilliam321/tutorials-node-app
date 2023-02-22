import { Router } from "express";
import Api from "../../../api";
import { TutorialsService } from "../../../app/tutorials/service";
import { TutorialsMySQLRepository } from "../../../app/tutorials/repository";
import tutorialsRoutes from "./tutorials";
const v1 = Router();

const api = new Api({
    tutorialsService: new TutorialsService(new TutorialsMySQLRepository()),
});

v1.get("/", (req, res) => {
    res.send("OK V1");
});

v1.use("/tutorials", tutorialsRoutes(api));

export default v1;
