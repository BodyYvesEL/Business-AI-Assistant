import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ setFiles }) => {
    const [file, setFile] = useState(null);

    const handleChange = e => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('/api/upload', formData);
            setFiles(files => [...files, res.data]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default FileUpload;
