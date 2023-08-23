import { Request, Response } from "express"
import { handleErrorResponse, parserUrlToId, validateUrl } from "../../services/util";
import client from "../../services/connection-redis";

export default async function parserUrl(rq: Request, rs: Response) {
    const { url } = rq.body;

    if (!validateUrl(url)) {
        return handleErrorResponse(rs, "Invalid URL");
    }

    let id: string | undefined;
    let continueW: boolean = true
    let counter: number = 0;

    while (continueW) {
        id = parserUrlToId(url);

        if (counter > 10) {
            id = undefined
            continueW = false
        }

        if (id && !await client.exists(id)) {
            continueW = false
        }
        
        counter++
    }

    if (!id) {
        return handleErrorResponse(rs, "Failed to parse this URL");
    }

    try {
        const response = await client.setEx(id, 432000, url);
        console.log(response);
        return rs.json({ id: id });
    } catch (err) {
        return handleErrorResponse(rs, "Failed to save this URL");
    }
}