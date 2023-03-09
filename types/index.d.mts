/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/types.js" />
export { default as mongoConnect } from "./mongoConnect.mjs";
export { default as buildSchema } from "./buildSchema.mjs";
export { default as Model } from "./Model.mjs";
export { default as MongoError } from "./MongoError.mjs";
export default mongoose;
import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Types } from "mongoose";
import { ObjectId } from "mongoose";
export { Schema, Types, ObjectId };
