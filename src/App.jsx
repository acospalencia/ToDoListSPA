import './App.css'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router'
import { SesionView } from './views/sesion/SesionView'
import { SesionDataProvider } from './repositories/context/SesionContext'
import { HomeView } from './views/home/HomeView'
import { AuthProvider } from './repositories/context/AuthContext'
import { PrivateRoute } from './repositories/privateRoute/PrivateRoute'

function App() {


  return (
    <>
      <AuthProvider>
        <SesionDataProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/sesion" element={<SesionView />} />
              <Route path="/" element={<PrivateRoute><HomeView /></PrivateRoute>} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </SesionDataProvider>
      </AuthProvider>
    </>
  )
}

export default App
