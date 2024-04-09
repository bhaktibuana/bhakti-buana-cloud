import mongoose from "mongoose";

export class MongoConnection {
  constructor(uri: string) {
    this.connect(uri);
  }

  private connect(uri: string) {
    mongoose.connect(uri);
  }
}
