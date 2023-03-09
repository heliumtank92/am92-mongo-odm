export default class Model {
    constructor(modelName: string, Schema: any);
    ModelName: string;
    Schema: any;
    MongooseModel: mongoose.Model<any, unknown, unknown, unknown, any>;
    getCount(query?: {}): Promise<number>;
    createOne(attrs?: {}, options?: {}): Promise<any>;
    createMany(attrs?: any[], options?: {}): Promise<any[]>;
    replaceAll(attrs?: any[]): Promise<any[]>;
    findOne(query?: {}, projection?: {}, options?: {}): Promise<any>;
    findMany(query?: {}, projection?: {}, options?: {}): Promise<any[]>;
    findById(id?: string, projections?: {}, options?: {}): Promise<any>;
    findOneBy(key: string, value: any, projection?: {}, options?: {}): Promise<any>;
    findManyBy(key: string, value: any, projection?: {}, options?: {}): Promise<any[]>;
    updateOne(query?: {}, updateObj?: {}, options?: {}): Promise<any>;
    updateMany(query?: {}, updateObj?: {}, options?: {}): Promise<import(".pnpm/mongodb@4.13.0/node_modules/mongodb").UpdateResult>;
    updateById(id?: string, updateObj?: {}, options?: {}): Promise<any>;
    updateOneBy(key: string, value: any, updateObj?: {}, options?: {}): Promise<any>;
    updateManyBy(key: string, value: any, updateObj?: {}, options?: {}): Promise<import(".pnpm/mongodb@4.13.0/node_modules/mongodb").UpdateResult>;
    remove(query?: {}, options?: {}): Promise<import(".pnpm/mongodb@4.13.0/node_modules/mongodb").DeleteResult>;
    removeById(id?: string, options?: {}): Promise<any>;
    list(projection?: {}, options?: {}): Promise<any[]>;
    search(query?: {}, projections?: {}, options?: {}): Promise<{
        _meta: {
            totalDocuments: any;
            documentsCount: any;
        };
        documents: number | any[];
    }>;
    aggregate(pipeline?: any[]): Promise<any[]>;
}
import mongoose from "mongoose";
