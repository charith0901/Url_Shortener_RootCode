import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUrl from "./components/CreateUrl/CreateUrl";
import URLShortenerDashboard from "./components/Dashboard/URLShortenerDashboard";
import URLRedirectPage from "./components/Redirection/URLRedirectPage";
function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<URLShortenerDashboard />} />
        <Route path="/create" element={<CreateUrl />} />
        <Route path="/:shortUrl" element={<URLRedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App
