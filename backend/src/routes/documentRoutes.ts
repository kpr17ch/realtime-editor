import { Router } from 'express';
import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from '../controllers/documentController';

const router = Router();

router.post('/', createDocument);
router.get('/', getDocuments);
router.get('/:id', getDocumentById);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

export default router;