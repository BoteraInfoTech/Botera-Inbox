import mongoDB from '../../../mongoDB/index';
import * as conversationDetailsQuery from '../../../mongoDB/query/conversationDetails.js';
import * as MessageQueries from '../../../mongoDB/query/messageDetails.js';

export const FacebookReceiver = async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    if (!entry) return res.sendStatus(200);

    const pageId = entry.id;
    const messagingEvent = entry.messaging?.[0];
    if (!messagingEvent?.message) return res.sendStatus(200);

    const { sender, timestamp, message } = messagingEvent;

    const conversationId = `${pageId}_${sender.id}`;

    const normalizedMessage = {
      platform: 'facebook',
      pageId,
      conversationId,
      messageId: message.mid,
      senderId: sender.id,
      text: message.text || '',
      attachments: message.attachments || null,
      timestamp,
      rawPayload: messagingEvent,
    };

    await MessageQueries.upsertMessageDetails(mongoDB, normalizedMessage);

    await conversationDetailsQuery.upsertConversationDetails(mongoDB, {
      platform: 'facebook',
      pageId,
      conversationId,
      participants: [sender.id, pageId],
      lastMessage: normalizedMessage.text,
      lastMessageAt: timestamp,
    });

    return res.sendStatus(200);
  } catch (err) {
    console.error('Facebook webhook error:', err);
    return res.sendStatus(200);
  }
};

export const FacebookVerifier = (req, res) => {
  const VERIFY_TOKEN = 'b7I8s6n3o1b3a9o2t2x6m0e2a2a0e0r2r7t2ae';

  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === VERIFY_TOKEN
  ) {
    return res.status(200).send(req.query['hub.challenge']);
  }

  res.sendStatus(403);
};
