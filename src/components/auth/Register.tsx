import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { saveUser } from '../../utils/authUtils';
import '../../assets/styles/Login.scss';

interface RegisterProps {
    onShowLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onShowLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (username.trim() === '' || password.trim() === '') {
            setError('Both fields are required.');
            return;
        }

        if (saveUser(username, password)) {
            onShowLogin();
        } else {
            setError('Nome de usuário já existe.');
        }
    };

    return (
        <div className='wrapper'>
            <div className='sign-on-up'>
                <h2>Crie sua conta</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label>Usuário</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Senha</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='login-btn' onClick={handleRegister}>Cadastrar</button>
                <p className='register'>Já possui uma conta? <button className='register-btn' onClick={onShowLogin}>Entrar</button></p>
            </div>
        </div>
    );
};

export default Register;