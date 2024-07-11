import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  content: string;
}

const DocumentSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

export default mongoose.model<IDocument>('Document', DocumentSchema);
