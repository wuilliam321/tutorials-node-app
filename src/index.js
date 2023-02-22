import express from "express";
import v1 from "./api/routes/v1";
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1", v1);

app.get("/", (req, res) => {
    res.send("OK");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
