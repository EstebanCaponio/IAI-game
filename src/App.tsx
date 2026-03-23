import HomePage from "./pages/HomaPage";
import generateRandomData from "./utils/GenerateData"

function App() {

  console.log(generateRandomData());

  return (
    <>
     <HomePage />
    </>
  )
}

export default App
