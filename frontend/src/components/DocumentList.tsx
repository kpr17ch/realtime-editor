import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DocumentList.css';

interface Document {
  _id: string;
  title: string;
}

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/documents/${id}`);
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Documents</h1>
      <button className="add-document-button" onClick={() => navigate('/editor/new')}>
        New Document
      </button>
      <ul className="document-list">
        {documents.map(doc => (
          <li key={doc._id} className="document-item">
            <span className="document-name" onClick={() => navigate(`/editor/${doc._id}`)}>
              {doc.title}
            </span>
            <button className="button button-edit" onClick={() => navigate(`/editor/${doc._id}`)}>Edit</button>
            <button className="button button-delete" onClick={() => handleDelete(doc._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
