import router from "./App.routes"
import { RouterProvider } from "react-router-dom"
import { AuthContextProvider } from "./features/auth/Auth.context"

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App