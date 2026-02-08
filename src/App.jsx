import { useAuth } from 'react-oidc-context';

function App() {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing you in silently...</div>;
    case 'signoutRedirect':
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Hello {auth.user?.profile.name || auth.user?.profile.sub}</h1>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
          {JSON.stringify(auth.user?.profile, null, 2)}
        </pre>
        <div>
          <button onClick={() => auth.removeUser()} style={{ marginRight: '10px' }}>
            Clear Storage
          </button>
          <button onClick={() => auth.signoutRedirect()}>
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Entra ID OIDC Sample</h1>
      <p>Please log in to see your profile.</p>
      <button onClick={() => auth.signinRedirect()}>Log in</button>
    </div>
  );
}

export default App;
