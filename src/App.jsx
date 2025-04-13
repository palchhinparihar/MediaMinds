import Navbar from "./components/Navbar";
import News from "./components/News";

function App() {

  return (
    <>
      <Navbar />
      <News pageSize={6} country={"us"} category={"general"} />
    </>
  )
}

export default App;
