'use client';

import { auth } from '@/lib/firebase';
import { Box, Button, Stack, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    const firebaseCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const idToken = await firebaseCredential.user.getIdToken();
    await signIn('credentials', { idToken, callbackUrl: '/dashboard' });
  };

  return (
    <Box>
      <Stack maxHeight={400}>
        <TextField
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button onClick={onLogin} variant="contained">
          Test
        </Button>
      </Stack>
    </Box>
  );
}
