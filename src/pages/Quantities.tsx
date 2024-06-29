import { useSelector } from "react-redux";
import GoToButton from "../components/GoToButton";
import UnitsSelection from "../components/QuantitiesPage/UnitsSelection";
import WarningSnack from "../components/WarningSnack";
import type { RootState } from "../state/store";

function Quantities() {
  const warning = useSelector((state: RootState) => state.warning.warning);

  return (
    <div data-testid="quantities" className="min-h-screen flex flex-col">
      <GoToButton page={"/instructions"} isNext={true} />
      <GoToButton page={"/"} isNext={false} />
      <div className="flex h-screen justify-center text-center">
        <UnitsSelection />
      </div>
      {warning && <WarningSnack />}
    </div>
  );
}

export default Quantities;
