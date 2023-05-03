import React from 'react';

const FileList = ({ files }) => {
    return (
        <ul>
            {files.map(file => (
                <li key={file.id}>
                    <a href={file.url} target="blank" rel="noreferrer">{file.name}</a>
                </li>
            ))}
        </ul>
    );
};

export default FileList;