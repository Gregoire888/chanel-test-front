import { Menu } from "./Menu";
import { dummyItems } from "./dummy";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Menu items={dummyItems} />
    </div>
  );
}

export default App;
