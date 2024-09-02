import React, { useState } from 'react';
import './App.css';
import TodoList from './components/toDo/TodoList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { AuthProvider, useAuth } from './components/auth/AuthProvider';
import { TodoProvider } from './components/toDo/TodoProvider';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <TodoProvider>
                <AppContent />
            </TodoProvider>
        </AuthProvider>
    );
};

const AppContent: React.FC = () => {
    const { user, logout } = useAuth();
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className="App">
            <header className="App-header">
                <h2>Todo List App</h2>
                {user && 
                  <>
                    <div className='user'>Olá <b>{user}</b>!
                      <button onClick={logout}>Sair</button>
                    </div>
                  </>}
            </header>
            {!user ? (
                <div>
                    {showRegister ? (
                        <Register onShowLogin={() => setShowRegister(false)} />
                    ) : (
                        <Login onShowRegister={() => setShowRegister(true)} />
                    )}
                </div>
            ) : (
                <TodoList />
            )}
        </div>
    );
};

export default App;