import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import Navbar from "./components/Navbar";
import News from "./components/News";

function App() {
  const pageSize = 6, country = "us";
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const [progress, setProgress] = useState(10);

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <BrowserRouter >
        <Navbar setSearchQuery={setSearchQuery} />
        <LoadingBar color="#4486c8" height={3} progress={progress} />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="general" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country={country} category="business" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={country} category="entertainment" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="general" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country={country} category="health" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country={country} category="science" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}  />
          <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country={country} category="sports" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country={country} category="technology" searchQuery={searchQuery} setSearchQuery={setSearchQuery}  />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App;
