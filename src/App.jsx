import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const pageSize = 6, country = "us";

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={pageSize} country={country} category="general" />} />
          <Route exact path="/business" element={<News key="business" pageSize={pageSize} country={country} category="business" />} />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} country={country} category="entertainment" />} />
          <Route exact path="/general" element={<News key="general" pageSize={pageSize} country={country} category="general" />} />
          <Route exact path="/health" element={<News key="health" pageSize={pageSize} country={country} category="health" />} />
          <Route exact path="/science" element={<News key="science" pageSize={pageSize} country={country} category="science" />} />
          <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} country={country} category="sports" />} />
          <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} country={country} category="technology" />} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App;
