export default class MongoModel {
    constructor(modelName: string, Schema: any);
    ModelName: string;
    Schema: any;
    MongooseModel: any;
    getCount(query?: {}): Promise<any>;
    createOne(attrs?: {}, options?: {}): Promise<any>;
    createMany(attrs?: any[], options?: {}): Promise<any>;
    replaceAll(attrs?: any[]): Promise<any>;
    findOne(query?: {}, projection?: {}, options?: {}): Promise<any>;
    findMany(query?: {}, projection?: {}, options?: {}): Promise<any>;
    findById(id?: string, projections?: {}, options?: {}): Promise<any>;
    findOneBy(key: string, value: any, projection?: {}, options?: {}): Promise<any>;
    findManyBy(key: string, value: any, projection?: {}, options?: {}): Promise<any>;
    updateOne(query?: {}, updateObj?: {}, options?: {}): Promise<any>;
    updateMany(query?: {}, updateObj?: {}, options?: {}): Promise<any>;
    updateById(id?: string, updateObj?: {}, options?: {}): Promise<any>;
    updateOneBy(key: string, value: any, updateObj?: {}, options?: {}): Promise<any>;
    updateManyBy(key: string, value: any, updateObj?: {}, options?: {}): Promise<any>;
    remove(query?: {}, options?: {}): Promise<any>;
    removeById(id?: string, options?: {}): Promise<any>;
    list(projection?: {}, options?: {}): Promise<any>;
    search(query?: {}, projections?: {}, options?: {}): Promise<{
        _meta: {
            totalDocuments: any;
            documentsCount: any;
        };
        documents: any;
    }>;
    aggregate(pipeline?: any[]): Promise<any>;
}
