import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Components/Authentication/SignUp";
import Login from "./Components/Authentication/Login";
import ToggleColorMode from "./Components/ToggleColorMode";
import Home from "./Pages/Home";
import { AuthProvider } from "./Components/Authentication/AuthProvider";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import SocketProvider from "./Components/SocketIO/SocketProvider";
import { ChannelProvider } from "./Components/Channels/ChannelProvider";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <ChannelProvider>
          <ToggleColorMode />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ChannelProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
