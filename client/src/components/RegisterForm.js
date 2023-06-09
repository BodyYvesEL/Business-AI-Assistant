import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ setAuth }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('api/auth/register', { name, email, password });
            const res = await axios.post('/api/auth/login', { email, password });
            const { token } = res.data;
            localStorage.setItem('token', token);
            setAuth(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;