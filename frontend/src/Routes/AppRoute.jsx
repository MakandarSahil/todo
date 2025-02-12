import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Landing from "../pages/Landing/Landing"
import MainPage from "../pages/MainPage"

const GOOGLE_CLIENT_ID = "386748646703-grivr3pe1j80tbolko276m7r45ob1501.apps.googleusercontent.com"

export default function AppRoute() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/MainPage" element={<MainPage />} />
        </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

