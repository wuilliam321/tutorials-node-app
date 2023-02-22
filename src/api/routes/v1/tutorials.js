import { Router } from "express";

export default function routes(api) {
    const router = Router();

    // TODO: openopi docs
    router.post("/", api.handleCreateTutorial.bind(api));

    return router;
}
