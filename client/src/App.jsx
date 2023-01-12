import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import SignUp from "./pages/SignUpPage";
import LogIn from "./pages/LogInPage";
import { AuthProviderWrapper } from "./context/authentication";
import EventCreatePage from "./pages/EventCreatePage";
import EventEditDeletePage from "./pages/EventEditDeletePage";
import EventDisplaySinglePage from "./pages/EventEditDeletePage";
import EventDisplayAllPage from "./pages/EventDisplayAllPage";
import Tour from "./pages/Tour";

function App() {
  return (
    <div className="App">
      <AuthProviderWrapper>
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/events" element={<EventDisplayAllPage />} />
          <Route
            path="/events/create"
            element={
              <EventCreatePage />
              // (user && <EventCreatePage />) || (
              //   <AuthenticationRequiredErrorPage />
              // )
            }
          />
          <Route path="/quotes/:id" element={<EventDisplaySinglePage />} />

          <Route
            path="/events/:id/edit"
            element={
              <EventEditDeletePage />
              // (user && <EventEditDeletePage />) || (
              //   <AuthenticationRequiredErrorPage />
              // )
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/tour" element={<Tour />} />
        </Routes>
      </AuthProviderWrapper>
    </div>
  );
}

export default App;
