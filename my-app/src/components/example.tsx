import { useAtom } from "jotai";
import { salaryAtom } from "../atoms/salaryAtom";
function Example() {
  const [salary] = useAtom(salaryAtom);

  return <div>Pensja: {salary}</div>;
}

export default Example;
