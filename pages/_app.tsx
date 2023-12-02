// _app.tsx
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json'; // Ensure this path is correct
import '@aws-amplify/ui-react/styles.css';
import type { AppProps } from 'next/app';

Amplify.configure(config);

interface MyAppProps extends AppProps {
  signOut: () => void;
  user: any; // Adjust the type based on your user model or authentication setup
}

function App({ Component, pageProps, signOut, user }: MyAppProps) {
  // Additional global state or context providers can be set up here

  return (
    <>
      <Component {...pageProps} />
      {/* Optionally, include global components like headers, footers, or navigation bars */}
    </>
  );
}

export default withAuthenticator(App);
