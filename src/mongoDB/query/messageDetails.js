import config from '../../config';

const collection = 'messageDetails';

export const connectDB = (mongoDB) =>
  mongoDB.db(config.dbConfig.DB).collection(collection);

export const upsertMessageDetails = (mongoDB, normalizedMessage) =>
  connectDB(mongoDB).findOneAndUpdate(
    { messageId: normalizedMessage.messageId },
    {
      $set: {
        ...normalizedMessage,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true, returnDocument: 'after' }
  );
