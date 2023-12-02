import { Flex, Button, Heading } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { signOut } from '@aws-amplify/auth';

export const Navbar = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <Flex
      as="nav"
      justifyContent="space-between"
      alignItems="center"
      padding="15px"
      backgroundColor="var(--amplify-colors-brand-primary-80)"
      color="var(--amplify-colors-white)"
    >
      <Heading level={3} onClick={() => router.push('/')}>MyApp</Heading>
      <Flex gap="10px">
        {/* Add more navigation links as needed */}
        <Button variation="link" onClick={() => router.push('/about')}>About</Button>
        <Button variation="link" onClick={() => router.push('/contact')}>Contact</Button>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
