import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { authenticateUser } from '../../utils/authUtils';
import '../../assets/styles/Login.scss';

interface LoginProps {
    onShowRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onShowRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useAuth();

    const handleLogin = () => {
        if (authenticateUser(username, password)) {
            auth.login(username);
        } else {
            setError('Usuário ou senha inválido.');
        }
    };

    return (
        <div className='wrapper'>
            <div className='sign-on-up'>
                <h2>Entre com seu nome de usuário</h2>
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
                <button className='login-btn' onClick={handleLogin}>Login</button>
                <p className='register'>Não tem um cadastro? <button className='register-btn' onClick={onShowRegister}>Registre-se</button></p>
            </div>
        </div>
    );
};

export default Login;