import { useAtom } from "jotai";
import { salaryAtom } from "../atoms/salaryAtom";
import { atomWithStorage } from "jotai/utils";
const darkModeAtom = atomWithStorage("darkMode", false);

function Example2() {
  const [salary, setSalary] = useAtom(salaryAtom);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const toggleDarkMode=()=>setDarkMode(!darkMode)
    const styles = {
    backgroundColor: darkMode ? "#000000" : "#ffffff", // czarne tło w dark mode
    color: darkMode ? "#ffffff" : "#000000",           // biały tekst w dark mode
    minHeight: "100vh",                               // żeby cały ekran miał kolor
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    padding: "2rem",
  }
  return (
    <div  style={styles}>
        <h1>Welcome to {darkMode ? 'dark' : 'light'} mode!</h1>
      <input
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
      />
      <button onClick={toggleDarkMode}>kliknij mnie</button>
    </div>
  );
}

export default Example2;
