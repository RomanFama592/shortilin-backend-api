import { Request, Response } from "express"
import client from "../../services/connection-redis";
import { handleErrorResponse } from "../../services/util";

export default async function getUrl(rq: Request, rs: Response) {
    try {
        const { id } = rq.params;

        if (id === "favicon.ico") {
            return handleErrorResponse(rs, "No");
        }

        const [url, expiresIn] = await Promise.all([
            client.get(id),
            client.ttl(id)
        ]);

        if (!url) {
            return handleErrorResponse(rs, "No exists path or expired", 404);
        }

        return rs.json({ url, expiresIn });
    } catch (error) {
        return handleErrorResponse(rs, "Internal server error", 500);
    }
}