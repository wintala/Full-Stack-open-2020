import React from 'react'

const LoginForm = ({handleLogin, setUsername, setPassword, username, password}) => (
    <form onSubmit={handleLogin}>
        <h1>Log in</h1>
        <div>
        username
            <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
        />
        </div>
        <div>
        password
            <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
        />
        </div>
        <button id="login-button" type="submit">login</button>
    </form>      
)

export default LoginForm