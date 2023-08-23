import express from "express"
import cors from "cors"
import routerV1 from "./express-router"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/v1", routerV1)

export default app

