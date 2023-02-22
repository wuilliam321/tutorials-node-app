import { Router } from "express";
import tutorialsRoutes from "./tutorials";
const v1 = Router();

v1.get("/", (req, res) => {
    res.send("OK V1");
});

v1.use("/tutorials", tutorialsRoutes);

export default v1;
