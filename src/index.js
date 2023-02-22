import express from "express";
import Api from "./api";
import { TutorialsService } from "./app/tutorials/service";
import { TutorialsMySQLRepository } from "./app/tutorials/repository";
import RoutesV1 from "./api/routes/v1";

const app = express();
const port = 3000;

// INFO: Here we instantiate all dependencies and inject them into the api
const api = new Api({
    tutorialsService: new TutorialsService(new TutorialsMySQLRepository()),
});

app.use(express.json());

app.use("/api/v1", RoutesV1(api));

app.get("/", (req, res) => {
    res.send("OK");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
