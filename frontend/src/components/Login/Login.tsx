import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';
    import { useState } from 'react';
  import './Login.scss';

  function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };

    const handleLogin = () => {
      // Send email and password to server for authentication
      fetch('http://10.0.22.24:8080/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            // Redirect to dashboard if login is successful
            console.log('Login successful');
          } else {
            // Display error message if login is unsuccessful
            alert('Invalid username or password');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };




    return (
        <Container size={420} my={40}>
          <Title ta="center" className= 'title'>
            Welcome back!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="username" placeholder="you@mantine.dev" required value={username} onChange={handleUsernameChange} />
            <PasswordInput label="password" placeholder="Your password" required mt="md" value={password} onChange={handlePasswordChange} />
            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" onClick={handleLogin}>
              Sign in
            </Button>
          </Paper>
        </Container>
      );

}

export default Login; // Don’t forget to use export default!
