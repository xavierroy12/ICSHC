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

const Login = () => {
 

  return (
    <Container size={420} my={40}>
      <Title ta="center" >
        Bienvenue au système d'inventaire du CSHC
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Nom d'utilisateur" placeholder="User" required />
        <PasswordInput label="Mot de passe" placeholder="mdp" required mt="md" />
        <Group justify="space-between" mt="lg">
        </Group>
        <Button fullWidth mt="xl">
          Se connecter
        </Button>
      </Paper>
    </Container>
  );
  
}

export default Login; // Don’t forget to use export default!