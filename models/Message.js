import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  message: { type: String, required: true },
  propertyId: { type: String, required: true },
  propertyTitle: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
