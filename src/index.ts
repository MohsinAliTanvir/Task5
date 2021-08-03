import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv';
import Database from "./database";
import Product from "./models/product";

dotenv.config()

const server = process.env.SERVER!
const database = process.env.DATABASE!
const app = express()

app.use(cors()) // middleware for enabling CORS

const dbInstance = new Database(server, database, Product);

app.get('/products', (req: express.Request, res: express.Response) => {
    const limit: number = 9
    let skip: number

    req.query.page === undefined ? skip = 0 : skip = (parseInt(req.query.page.toString()) - 1) * limit
    dbInstance.getRecord(limit, skip).then(products => {
        res.send(products)
    })
})

// Checking env port number or else assigning 3000 instead
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))