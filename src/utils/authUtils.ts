export const saveUser = (username: string, password: string): boolean => {
    const usersJson = localStorage.getItem('users');
    let users = usersJson ? JSON.parse(usersJson) : {};

    if (users[username]) {
        return false;
    }

    users[username] = { password };
    localStorage.setItem('users', JSON.stringify(users));
    return true;
};

export const authenticateUser = (username: string, password: string): boolean => {
    const usersJson = localStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : {};

    if (users[username] && users[username].password === password) {
        return true;
    }
    return false;
};