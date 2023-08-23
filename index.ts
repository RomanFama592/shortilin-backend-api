import app from "./src/services/express-init";
import client from "./src/services/connection-redis";


client.connect()
    .then(_ => {
        console.log`##Redis On`
        app.listen(10000, () => {
            console.log`##Server On`
        })
    })
