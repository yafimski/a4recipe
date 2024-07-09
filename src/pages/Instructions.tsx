import ActionSteps from "../components/InstructionsPage/ActionSteps";
import GoToButton from "../components/GoToButton";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import WarningSnack from "../components/WarningSnack";

function Instructions() {
  const warning = useSelector((state: RootState) => state.warning.warning);

  return (
    <div data-testid="instructions" className="min-h-screen flex flex-col">
      <GoToButton page={"/print"} isNext={true} />
      <GoToButton page={"/quantities"} isNext={false} />
      <div className="flex h-screen justify-center text-center">
        <ActionSteps />
      </div>
      {warning && <WarningSnack />}
    </div>
  );
}

export default Instructions;
