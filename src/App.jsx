import Navbar from "./components/Navbar";
import News from "./components/News";

function App() {

  return (
    <>
      <Navbar />
      <News pageSize={7} />
    </>
  )
}

export default App;
