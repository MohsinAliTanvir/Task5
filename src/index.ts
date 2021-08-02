import * as express from "express";
import * as cors from "cors"
import Database from "./database";
import Product from "./models/product";
import { IncomingMessage, ServerResponse } from "http";
const server = '127.0.0.1:27017'
const database = 'Products'
const app = express()

app.use(cors()) // middleware for enabling CORS

const dbInstance = new Database(server, database, Product);

app.get('/products', (req: IncomingMessage, res: ServerResponse) => {
    const limit: number = 9
    let skip: number

    req.query.page === undefined ? skip = 0 : skip = (parseInt(req.query.page.toString()) - 1) * limit
    dbInstance.getRecord(limit, skip).then(products => {
        res.send(products)
    })
})

/*
dbInstance.createRecord({
    title: "",
    ... rest of the person
});
*/


//dbInstance.getRecord().then(console.log)



// Checking env port number or else assigning 5000 instead
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))