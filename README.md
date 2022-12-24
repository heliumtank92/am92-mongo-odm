# @am92/mongo-odm

[![npm version](https://img.shields.io/npm/v/@am92/mongo-odm?style=for-the-badge)](https://www.npmjs.com/package/@am92/mongo-odm)&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@am92/mongo-odm?color=yellow&style=for-the-badge)](https://opensource.org/licenses/MIT)&nbsp;
[![Vulnerabilities: Snyk](https://img.shields.io/snyk/vulnerabilities/npm/@am92/mongo-odm?style=for-the-badge)](https://security.snyk.io/package/npm/@am92%2Fmongo-odm)&nbsp;
[![Downloads](https://img.shields.io/npm/dy/@am92/mongo-odm?style=for-the-badge)](https://npm-stat.com/charts.html?package=%40am92%2Fmongo-odm)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@am92/mongo-odm?style=for-the-badge)](https://bundlephobia.com/package/@am92/mongo-odm)

<br />

This is an ODM (Object Document Mapping) which provides CRUD functionalities to interact with MongoDB Collections. This package uses [mongoose](https://www.npmjs.com/package/mongoose) package using its v6.x.x version.

This package provides the following functionalities:
* MongoDB Connection Helper
* Mongoose Schema Wrapper
* Collection Modeling Class

<br />

## Table of Content
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Connecting to MongoDB](#connecting-to-mongodb)
* [Creating a Collection Schema](#creating-a-collection-schema)
* [Creating a Collection Model](#creating-a-collection-model)
    * [Properties of MongoModel Instance](#properties-of-mongomodel-instance)
    * [Methods of MongoModel Instance](#methods-of-mongomodel-instance)
* [Resources](#resources)
* [Resources](#resources)
* [License](#license)

<br />

## Installation
```bash
$ npm install --save @am92/mongo-odm
```
<br />

## Environment Variables
The following environment variables need to be set to work with this package:
```sh
##### Mongo Config
export MONGO_HOSTS=
export MONGO_DBNAME=
export MONGO_USER_AUTH=false
export MONGO_USERNAME=
export MONGO_PASSWORD=
export MONGO_REPLICASET=
export MONGO_REPLICASET_COUNT=0
export MONGO_READ_PREFERENCE=
export MONGO_SSL_ENABLED=false
export MONGO_SSL_VALIDATE=false
export MONGO_PEM_PATH=
export MONGO_POOL_SIZE=5
```
*Note: Do not export variable 'MONGO_READ_PREFERENCE' if no value is to be set.*

<br />

## Connecting to MongoDB
MongoDB needs to be connected before the 'MongoModel' methods can executed. The connection can be established as shown below:
```javascript
import mongoConnect from '@am92/mongo-odm/mongoConnect'
await mongoConnect()
```

<br />

## Creating a Collection Schema
```javascript
import mongoSchemaWrapper from '@am92/mongo-odm/mongoSchemaWrapper'

const CollectionSchemaObject = {
    // Schema Properties as defined by mongoose Schema Class
}
const options = {}

const CollectionSchema = mongoSchemaWrapper(CollectionSchemaObject, options)
export default CollectionSchema
```
mongoSchemaWrapper() returns an instance of mongoose Schema Class.

*Note: The 'options' object properties to be used is as defined by mongoose Schema Class. By default, mongoSchemaWrapper adds 'timestamps: true' option which can be overriden if needed. You may avoid passing the 'options' object if no extra options are required for a given Schema.*

<br />

#### Using mongoose Schema Class
```javascript
import { Schema } from '@am92/mongo-odm/mongoose'

const SubDocumentSchema = new Schema({
  // Schema Properties as defined by mongoose Schema Class
})

export default SubDocumentSchema
```

<br />

## Creating a Collection Model
```javascript
import MongoModel from '@am92/mongo-odm/MongoModel'
import CollectionSchema from './CollectionSchema.mjs'

const CollectionODM = new MongoModel('Collection', CollectionSchema)
export default CollectionODM
```

<br />

### Properties of MongoModel Instance
|Properties |Description |
|:----------|:-----------|
|CollectionODM.ModelName|Name of the Model|
|CollectionODM.Schema|mongoose Collection Schema|
|CollectionODM.MongooseModel|mongoose Model instance|

<br />

### Methods of MongoModel Instance
|Method |Description |
|:------|:-----------|
|[CollectionODM.getCount](#collectionodmgetcountquery)|Returns the count of Documents|
|[CollectionODM.createOne](#collectionodmcreateoneattrs)|Creates a new Document|
|[CollectionODM.createMany](#collectionodmcreatemanyattrs)|Creates multiple new Documents|
|[CollectionODM.replaceAll](#collectionodmreplaceallattrs)|Replaces all Documents with new Documents|
|[CollectionODM.findOne](#collectionodmfindonequery-projection-options)|Finds and returns a single Document|
|[CollectionODM.findMany](#collectionodmfindmanyquery-projection-options)|Finds and returns mulitple Documents|
|[CollectionODM.findById](#collectionodmfindbyidid-projection-options)|Finds using MongoDB ObjectId and returns a single Document|
|[CollectionODM.findOneBy](#collectionodmfindonebykey-value-projection-options)|Finds using key-value pair and returns a single Document|
|[CollectionODM.findManyBy](#collectionodmfindmanybykey-value-projection-options)|Finds using key-value pair and returns mulitple Documents|
|[CollectionODM.updateOne]()|Updates a single Document and returns the Updated Document|
|[CollectionODM.updateMany](#collectionodmupdatemanyquery-updateobj-options)|Updates multiple Documents and returns the Updated Documents|
|[CollectionODM.updateById](#collectionodmupdatebyidid-updateobj-options)|Updates a single Document with spcified MongoDB ObjectId and returns the Updated Document|
|[CollectionODM.updateOneBy](#collectionodmupdateonequery-updateobj-options)|Updates a single Document using key-value pair and returns the Updated Document|
|[CollectionODM.updateManyBy](#collectionodmupdatemanybykey-value-updateobj-options)|Updates multiple Documents using key-value pair and returns the Updated Documents|
|[CollectionODM.remove](#collectionodmremovequery-options)|Removes multiple documents and returns the delete response|
|[CollectionODM.removeById](#collectionodmremovebyidid-options)|Deletes a single Document with spicifed MongoDB ObjectId and returns the Deleted Document|
|[CollectionODM.list](#collectionodmlistprojection-options)|Returns all the Documents from a given Collection|
|[CollectionODM.search](#collectionodmsearchquery-projection-options)|Searches and returns Documents from a given Collection|


<br />

#### CollectionODM.getCount(query)<br />
###### Arguments
* query (Object): mongoose query object

###### Returns
* count (Number): Number of documents found

###### Example
```javascript
const count = await CollectionODM.getCount({ ...queryProps })
```

<br />

#### CollectionODM.createOne(attrs)<br />
###### Arguments ######
* attrs (Object): Object as per CollectionSchema

###### Returns ######
* document (Object): Created Lean Document

###### Example ######
```javascript
const doc = await CollectionODM.createOne({ ...SchemaProps })
```

<br />

#### CollectionODM.createMany(attrs)<br />
###### Arguments ######
* attrs (Array): Array of Object as per CollectionSchema

###### Returns ######
* documents (Array): Created Lean Documents Array

###### Example ######
```javascript
const docs = await CollectionODM.createMany([{ ...SchemaProps }])
```

<br />

#### CollectionODM.replaceAll(attrs)<br />
###### Arguments ######
* attrs (Array): Array of Object as per CollectionSchema

###### Returns ######
* documents (Array): Created Lean Documents Array

###### Example ######
```javascript
const docs = await CollectionODM.replaceAll([{ ...SchemaProps }])
```

<br />

#### CollectionODM.findOne(query, projection, options)<br />
###### Arguments ######
* query (Object): mongoose query object
* projection (Object): mongoose projection object
* options (Object): mongoose options object as per 'findOne' method

###### Returns ######
* document (Object): Lean Document

###### Example ######
```javascript
const doc = await CollectionODM.findOne(query, projection, options)
```

<br />

#### CollectionODM.findMany(query, projection, options)<br />
###### Arguments ######
* query (Object): mongoose query object
* projection (Object): mongoose projection object
* options (Object): mongoose options object as per 'find' method

###### Returns ######
* documents (Array): Lean Documents Array

###### Example ######
```javascript
const docs = await CollectionODM.findMany(query, projection, options)
```

<br />

#### CollectionODM.findById(id, projection, options)<br />
###### Arguments ######
* id (String): mongoose Document '_id' Value
* projection (Object): mongoose projection object
* options (Object): mongoose options object as per 'findById' method

###### Returns ######
* document (Object): Found Lean Document

###### Example ######
```javascript
const doc = await CollectionODM.findById(id, projection, options)
```

<br />

#### CollectionODM.findOneBy(key, value, projection, options)<br />
###### Arguments ######
* key (String): mongoose Document Property Name
* value (any): mongoose Document Property Query Value
* projection (Object): mongoose projection object
* options (Object): mongoose options object as per 'findOne' method

###### Returns ######
* document (Object): Found Lean Document

###### Example ######
```javascript
const doc = await CollectionODM.findOneBy(key, value, projection, options)
```

<br />

#### CollectionODM.findManyBy(key, value, projection, options)<br />
###### Arguments ######
* key (String): mongoose Document Property Name
* value (any): mongoose Document Property Query Value
* projection (Object): mongoose projection object
* options (Object): mongoose options object as per 'findOne' method

###### Returns ######
* documents (Array): Found Lean Documents Array

###### Example ######
```javascript
const doc = await CollectionODM.findManyBy(key, value, projection, options)
```

<br />

#### CollectionODM.updateOne(query, updateObj, options)<br />
###### Arguments ######
* query (Object): mongoose query object
* updateObj (Object): mongoose update object
* options (Object): mongoose options object as per 'findOneAndUpdate' method

###### Returns ######
* document (Object): Updated Lean Document

###### Example ######
```javascript
const updatedDoc = await CollectionODM.updateOne(query, updateObj, options)
```

<br />

#### CollectionODM.updateMany(query, updateObj, options)<br />
###### Arguments ######
* query (Object): mongoose query object
* updateObj (Object): mongoose update object
* options (Object): mongoose options object as per 'updateMany' method

###### Returns ######
* documents (Array): Updated Lean Documents Array

###### Example ######
```javascript
const updatedDocs = await CollectionODM.updateMany(query, updateObj, options)
```

<br />

#### CollectionODM.updateById(id, updateObj, options)<br />
###### Arguments ######
* id (String): mongoose Document '_id' Value
* updateObj (Object): mongoose update object
* options (Object): mongoose options object as per 'findByIdAndUpdate' method

###### Returns ######
* document (Object): Updated Lean Document

###### Example ######
```javascript
const updatedDoc = await CollectionODM.updateById(id, updateObj, options)
```

<br />

#### CollectionODM.updateOneBy(key, value, updateObj, options)<br />
###### Arguments ######
* key (String): mongoose Document Property Name
* value (any): mongoose Document Property Query Value
* updateObj (Object): mongoose update object
* options (Object): mongoose options object as per 'findOneAndUpdate' method

###### Returns ######
* document (Object): Updated Lean Document

###### Example ######
```javascript
const updatedDoc = await CollectionODM.updateOneBy(key, value, updateObj, options)
```

<br />

#### CollectionODM.updateManyBy(key, value, updateObj, options)<br />
###### Arguments ######
* key (String): mongoose Document Property Name
* value (any): mongoose Document Property Query Value
* updateObj (Object): mongoose update object
* options (Object): mongoose options object as per 'updateMany' method

###### Returns ######
* documents (Array): Updated Lean Documents Array

###### Example ######
```javascript
const updatedDocs = await CollectionODM.updateManyBy(key, value, updateObj, options)
```

<br />

#### CollectionODM.remove(query, options)<br />
###### Arguments ######
* query (Object): mongoose query object
* options (Object): mongoose options object as per 'deleteMany' method

###### Returns ######
* removeResponse (Object): // TODO

###### Example ######
```javascript
const removeResponse = await CollectionODM.remove(query, options)
```

<br />

#### CollectionODM.removeById(id, options)<br />
###### Arguments ######
* id (String): mongoose Document '_id' Value
* options (Object): mongoose options object as per 'findByIdAndRemove' method

###### Returns ######
* document (Object): Deleted Lean Document

###### Example ######
```javascript
const doc = await CollectionODM.removeById(id, options)
```

<br />

#### CollectionODM.list(projection, options)<br />
###### Arguments ######
* projection (Object): mongoose projection object
* options (Object): mongoose options object as per 'find' method

###### Returns ######
* documents (Array): Found Lean Documents Array

###### Example ######
```javascript
const docs = await CollectionODM.list(projection, options)
```

<br />

#### CollectionODM.search(query, projection, options)<br />
###### Arguments ######
* query (Object): mongoose query object
* projection (Object): mongoose projection object
* options (Object): mongoose options object as per 'find' method

###### Returns ######
* responseData (Object): Found Lean Documents Array with Counts
    ```javascript
    {
      "_meta": {
        "totalDocuments": 0,   // Total number of documents found against the 'query'
        "documentsCount": 0    // Number of documents found for given pagination options
      },
      "documents": []          // Lean Documents Array
    }
    ```

###### Example ######
```javascript
const responseData = await CollectionODM.search(query, projection, options)
const queryDocsCount = responseData._meta.totalDocuments
const pageDocsCount = responseData._meta.documentsCount
const docs = responseData.documents
```

<br />

## Contributors
<table>
  <tbody>
    <tr>
      <td align="center">
        <a href='https://github.com/ankitgandhi452'>
          <img src="https://avatars.githubusercontent.com/u/8692027?s=400&v=4" width="100px;" alt="Ankit Gandhi"/>
          <br />
          <sub><b>Ankit Gandhi</b></sub>
        </a>
      </td>
      <td align="center">
        <a href='https://github.com/agarwalmehul'>
          <img src="https://avatars.githubusercontent.com/u/8692023?s=400&v=4" width="100px;" alt="Mehul Agarwal"/>
          <br />
          <sub><b>Mehul Agarwal</b></sub>
        </a>
      </td>
    </tr>
  </tbody>
</table>

<br />

## Resources
* [mongoose](https://www.npmjs.com/package/mongoose)

<br />

## License
* [MIT](https://opensource.org/licenses/MIT)


<br />
<br />
