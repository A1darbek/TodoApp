import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Paper,
    Stack
} from '@mui/material';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (res.ok) {
                navigate('/login');
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred during registration');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{ backgroundColor: '#f5f5f5', padding: 2 }}
        >
            <Paper elevation={4} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
                <Typography variant="h4" gutterBottom align="center" fontWeight={600}>
                    Create Account
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSignUp}>
                    <Stack spacing={2}>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                            Sign Up
                        </Button>
                    </Stack>
                </form>

                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#1976d2' }}>
                        Login here
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default SignUpPage;
