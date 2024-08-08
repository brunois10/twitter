import { GlobalCss } from "./styles"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginPage from "./pages/login"
import Twitter from "./pages/twitter"

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/twitter',
    element: <Twitter />
  }
])

function App() {
  return (
    <>
      <GlobalCss/>
      <RouterProvider router={routes} />
    </>
  )
}

export default App