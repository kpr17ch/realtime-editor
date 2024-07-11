import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './DocumentEditor.css';

interface Document {
  _id?: string;
  title: string;
  content: string;
}

const DocumentEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document>({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id && id !== 'new') {
      fetchDocument(id);
    }
  }, [id]);

  const fetchDocument = async (id: string) => {
    const response = await axios.get(`http://localhost:5000/api/documents/${id}`);
    setDocument(response.data);
  };

  const handleSave = async () => {
    if (id === 'new') {
      await axios.post('http://localhost:5000/api/documents', document);
    } else {
      await axios.put(`http://localhost:5000/api/documents/${id}`, document);
    }
    navigate('/');
  };

  const handleDelete = async () => {
    if (id && id !== 'new') {
      await axios.delete(`http://localhost:5000/api/documents/${id}`);
    }
    navigate('/');
  };

  return (
    <div className="container">
      <h1 className="title">{id === 'new' ? 'New Document' : 'Edit Document'}</h1>
      <input
        type="text"
        placeholder="Title"
        value={document.title}
        onChange={(e) => setDocument({ ...document, title: e.target.value })}
        className="input"
      />
      <textarea
        placeholder="Content"
        value={document.content}
        onChange={(e) => setDocument({ ...document, content: e.target.value })}
        className="textarea"
      />
      <button onClick={handleSave} className="button button-save">
        {id === 'new' ? 'Create' : 'Save'}
      </button>
      {id !== 'new' && (
        <button onClick={handleDelete} className="button button-delete">
          Delete
        </button>
      )}
    </div>
  );
};

export default DocumentEditor;
