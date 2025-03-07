import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send("Payments route is working!");
});

export default router;
