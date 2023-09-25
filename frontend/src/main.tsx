import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MantineProvider } from '@mantine/core';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider  withGlobalStyles withNormalizeCSS   theme={{
    fontFamily: 'Verdana, sans-serif',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
    headings: { fontFamily: 'Greycliff CF, sans-serif' },
  }}>
    <App />
  </MantineProvider>
)
