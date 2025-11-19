import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from "./context/ToastContext"; // Added import

// Render the app
const rootElement = document.getElementById("root")!;
// The original code used createRoot directly, without the innerHTML check or ReactDOM.
// Assuming the intent is to wrap the main application component with ToastProvider.
// Since the original code renders <App />, and the instruction mentions <RouterProvider>,
// I will assume the user wants to wrap <App /> with <ToastProvider> in the existing structure,
// as <RouterProvider> and `router` are not defined in the original context.
createRoot(rootElement).render(
  <StrictMode>
    <ToastProvider> {/* Wrapped App with ToastProvider */}
      <App />
    </ToastProvider>
  </StrictMode>,
)
