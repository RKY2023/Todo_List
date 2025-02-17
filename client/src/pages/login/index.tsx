import React, { useState, useEffect } from 'react';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/todo';
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let apiURL = `${process.env.NEXT_PUBLIC_API_URL}`+'/login';
        if (isLogin) {
            // Handle login logic
            console.log('Logging in with', { email, password });
        } else {
            // Handle signup logic
            apiURL = `${process.env.NEXT_PUBLIC_API_URL}`+'/signup/';
            console.log('Signing up with', { name, email, password });
        }
    
        if (email.trim() && password.trim()) {
          try {
            const response = await fetch(apiURL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },    
              body: JSON.stringify(isLogin ? { email, password } : { name, email, password}),
            })
            if (response.ok) {
              const loginDetails = await response.json();
              localStorage.setItem('token', loginDetails.token);
              if (loginDetails.token) {
                window.location.href = '/todo';
              } else {
                setError(loginDetails.message); 
              }
              
            } else {
                setError('Failed to '+ (isLogin ? 'login' : 'signup'))
            }
          } catch (error) {
            setError('Error:'+ error)
          }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-slate-900">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">{isLogin ? 'Login' : 'Sign Up'}</h2>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="space-y-1">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Enter your name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    )}
                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <button onClick={() => { setIsLogin(!isLogin); setError('')}} className="w-full px-4 py-2 text-indigo-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;