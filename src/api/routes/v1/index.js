import { Router } from "express";
import tutorialsRoutes from "./tutorials";

export default function routes(api) {
    const router = Router();

    router.get("/", (req, res) => {
        res.send("OK V1");
    });

    router.use("/tutorials", tutorialsRoutes(api));

    return router;
}
