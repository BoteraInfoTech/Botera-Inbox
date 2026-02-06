import config from '../../config';

const collection = 'conversationDetails';

export const connectConversationDetailsDB = (mongoDB) =>
  mongoDB.db(config.dbConfig.DB).collection(collection);

export async function upsertConversationDetails(mongoDB, conversationDoc) {
  const db = connectConversationDetailsDB(mongoDB);

  const now = new Date();
  const result = await db.findOneAndUpdate(
    { conversationId: conversationDoc.conversationId },
    {
      $set: {
        ...conversationDoc,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true, returnDocument: 'after' }
  );

  return result?.value ?? null;
}
