import { EthProvider } from "./contexts/EthContext";
import Voting from "./components/Voting";
import "./App.css";


function App() {
  return (
    <EthProvider>
      <div id="App" >
        <Voting />
      </div>
    </EthProvider>
  );
}

export default App;
