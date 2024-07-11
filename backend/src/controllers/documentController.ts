import { Request, Response } from 'express';
import Document from '../models/documentModel';

// Erstellen eines neuen Dokuments
export const createDocument = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  try {
    const newDocument = new Document({ title, content });
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(400).json({ error: 'Error creating document' });
  }
};

// Abrufen aller Dokumente
export const getDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching documents' });
  }
};

// Abrufen eines einzelnen Dokuments
export const getDocumentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching document' });
  }
};

// Aktualisieren eines Dokuments
export const updateDocument = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedDocument = await Document.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(400).json({ error: 'Error updating document' });
  }
};

// Löschen eines Dokuments
export const deleteDocument = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedDocument = await Document.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json({ message: 'Document deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting document' });
  }
};
