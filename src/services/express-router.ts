import { Router } from "express"
import parserUrl from "../controller/v1/parser-url";
import getUrl from "../controller/v1/get-url";
const router = Router()

router.post("/parser-url", parserUrl);

router.get("/get-url/:id", getUrl);

export default router