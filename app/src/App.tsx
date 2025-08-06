import './App.css'
import AppNavigator from './AppNavigator';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='app relative'>              
        <AppNavigator />
      </div>
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
