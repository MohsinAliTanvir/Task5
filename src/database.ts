import { connect, Mongoose, Model } from "mongoose";

class Database<T> {

    private connection: Promise<Mongoose>;
    private model: Model<T>;

    constructor(server: string, dbName: string, model: Model<T>) {
        // mongoose.set({ useNewUrlParser, true })
        this.connection = connect(`mongodb://${server}/${dbName}`);
        this.model = model;
    }

    public setModel = (model: Model<T>) => {
        this.model = model;
    }

    public createRecord = async (data: T): Promise<boolean> => {
        try {
            await this.connection;
            await this.model.create(data);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public deleteRecord = async (id: string): Promise<boolean> => {
        try {
            await this.connection;
            await this.model.deleteOne({ id });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public getRecord = async (limit: number, skip: number) => {
        try {
            await this.connection;
            return this.model.find({}, {}, { limit: limit, skip: skip })
        } catch (e) {
            console.error(e)
            return false
        }
    }

}

export default Database;