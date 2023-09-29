import {
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Container,
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
                response.json().then(data => {
                  // Store the user in the session variable
                  sessionStorage.setItem('user', JSON.stringify(data.user));
                  //debugging
                  alert(`Login successful. Response: ${JSON.stringify(data)}`);
                  console.log('Login successful');
                  // Redirect to home page after successful login
                  window.location.href = '/actifs';
                });
          } else {
            // Display error message if login is unsuccessful
            alert(`Error: ${response.statusText}`);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };




    return (
        <Container>
          <Title ta="center" className= 'title'>
            Inventaire CSHC !
          </Title>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="username" placeholder="you@mantine.dev" required value={username} onChange={handleUsernameChange} />
            <PasswordInput label="password" placeholder="Your password" required mt="md" value={password} onChange={handlePasswordChange} />
            <Button fullWidth mt="xl" onClick={handleLogin}>
              Login
            </Button>
          </Paper>
        </Container>
      );

}

export default Login; // Don’t forget to use export default!
