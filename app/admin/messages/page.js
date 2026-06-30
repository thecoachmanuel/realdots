import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import MessageListClient from '@/components/admin/MessageListClient';

export const revalidate = 0;

export default async function AdminMessages() {
  await dbConnect();
  const messages = await Message.find({}).sort({ createdAt: -1 }).lean();
  
  const serializedMessages = messages.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    createdAt: doc.createdAt.toISOString()
  }));

  return <MessageListClient messages={serializedMessages} />;
}
