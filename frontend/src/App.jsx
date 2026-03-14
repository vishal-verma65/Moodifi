import router from "./App.routes"
import { RouterProvider } from "react-router-dom"
import { AuthContextProvider } from "./features/auth/Auth.context"
import { SongContextProvider } from "./features/home/Song.context"

const App = () => {
  return (
    <AuthContextProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthContextProvider>
  )
}

export default App