import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './pages/Blog.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { io } from 'socket.io-client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const socket = io(import.meta.env.VITE_SOCKET_HOST)
const queryClient = new QueryClient()

socket.on('connect', () => {
  console.log('connected to socket.io as', socket.id)
})

socket.on('connect_error', (err) => {
  console.error('socket.io connect error:', err)
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
