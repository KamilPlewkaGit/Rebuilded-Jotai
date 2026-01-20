import './App.css';
import { atom, useAtom } from "./jotai"; // poprawny import z "from"

const salaryAtom = atom(100000);

function App() {
  const [salary, setSalary] = useAtom(salaryAtom);

  return (
    <div>
      <div>
        <input
          type="number" // ważne dla liczb
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))} // konwersja na number
        />
      </div>
    </div>
  );
}

export default App;
