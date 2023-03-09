export default CONFIG;
declare namespace CONFIG {
    export { MONGO_DBNAME as DBNAME };
    export { CONNECTION_URI };
    import REPLICASET_COUNT = INT_CONFIGS.MONGO_REPLICASET_COUNT;
    export { REPLICASET_COUNT };
    export const OPTIONS: {
        ssl: true;
        sslValidate: boolean;
        sslCA: string;
        maxPoolSize: string;
        retryWrites: boolean;
        replicaSet: string;
        readPreference: string;
    } | {
        ssl?: undefined;
        sslValidate?: undefined;
        sslCA?: undefined;
        maxPoolSize: string;
        retryWrites: boolean;
        replicaSet: string;
        readPreference: string;
    };
}
export const SERVICE: string;
declare const MONGO_DBNAME: string;
declare const CONNECTION_URI: string;
declare namespace INT_CONFIGS {
    export { MONGO_REPLICASET_COUNT };
    export { MONGO_POOL_SIZE };
}
declare const MONGO_REPLICASET_COUNT: string;
declare const MONGO_POOL_SIZE: string;
