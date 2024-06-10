# @am92/mongo-odm

[![npm version](https://img.shields.io/npm/v/@am92/mongo-odm?style=for-the-badge)](https://www.npmjs.com/package/@am92/mongo-odm)&nbsp;
[![ECMAScript Module](https://img.shields.io/badge/ECMAScript-Module%20Only-red?style=for-the-badge)](https://nodejs.org/api/esm.html)&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@am92/mongo-odm?color=yellow&style=for-the-badge)](https://opensource.org/licenses/MIT)&nbsp;
[![Vulnerabilities: Snyk](https://img.shields.io/snyk/vulnerabilities/npm/@am92/mongo-odm?style=for-the-badge)](https://security.snyk.io/package/npm/@am92%2Fmongo-odm)&nbsp;
[![Downloads](https://img.shields.io/npm/dy/@am92/mongo-odm?style=for-the-badge)](https://npm-stat.com/charts.html?package=%40am92%2Fmongo-odm)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@am92/mongo-odm?style=for-the-badge)](https://bundlephobia.com/package/@am92/mongo-odm)

<br />

This is an ODM (Object Document Mapping) which provides CRUD functionalities to interact with MongoDB Collections. This package uses [mongoose](https://www.npmjs.com/package/mongoose) package using its 8.4.1 version.

This package provides the following functionalities:
* MongoDB Connection Helper
* Mongoose Schema Wrapper
* Collection Modeling Class

<br />

## Table of Content
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Connecting to MongoDB](#connecting-to-mongodb)
* [License](#license)

<br />

## Installation
```bash
npm install --save @am92/mongo-odm
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
export MONGO_MIN_POOL_SIZE=0
export MONGO_MAX_POOL_SIZE=100
```
*Note: Do not export variable 'MONGO_READ_PREFERENCE' if no value is to be set.*

<br />

## Connecting to MongoDB
MongoDB needs to be connected before the 'Model' methods can executed. The connection can be established as shown below:
```javascript
import { mongoConnect } from '@am92/mongo-odm'
await mongoConnect()
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
