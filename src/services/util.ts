import { Response } from "express"

export function generateRandomString(length = 16, caracters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
    const caractersToReturn: string[] = [];
    const { length: caractersLength } = caracters;

    for (let iter = 0; iter < length; iter++) {
        caractersToReturn.push(caracters[Math.floor(Math.random() * caractersLength)]);
    }

    return caractersToReturn.join("");
}

export function validateUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

export function handleErrorResponse(rs: Response, message: string, statusCode: number = 400) {
    return rs.status(statusCode).json({ error: message });
};

function removeSubdomain(domainParts: string[], domainBlacklist: string[]): boolean {
    if (domainBlacklist.includes(domainParts[0])) {
        return domainParts.shift() ? true : false;
    }

    return false;
}

export function parserUrlToId(url: string): string | undefined {
    try {
        const urlObj = new URL(url);
        const protocol = urlObj.protocol.slice(0, -1);
        const domainParts = urlObj.hostname.split(".");

        removeSubdomain(domainParts, ["www"]);

        const sanitizedDomainParts = domainParts.map((value, i) => {
            if (value.length >= 8) {
                return value.slice(0, 5) + "!"
            }
            return value
        })

        const id = [
            protocol === "https" ? "S" : "NS",
            sanitizedDomainParts.join("_"),
            generateRandomString(4)
        ].join("-");

        return id;
    } catch (err) {
        return undefined;
    }
}