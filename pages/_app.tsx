import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';
import type { AppProps } from 'next/app';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';


Amplify.configure(config);

// Extend the WithAuthenticatorProps to include Next.js specific props
interface MyAppProps extends WithAuthenticatorProps, AppProps {}

function App({ Component, pageProps, signOut, user }: MyAppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default withAuthenticator(App);
