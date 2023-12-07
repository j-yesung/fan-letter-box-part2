import Router from 'shared/Router';
import GlobalStyles from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
