import ActionSteps from "../components/InstructionsPage/ActionSteps";
import GoToButton from "../components/GoToButton";

function Instructions() {
  return (
    <div data-testid="instructions" className="min-h-screen flex flex-col">
      <GoToButton page={"/result"} isNext={true} />
      <GoToButton page={"/quantities"} isNext={false} />
      <div className="flex h-screen justify-center text-center">
        <ActionSteps />
      </div>
    </div>
  );
}

export default Instructions;
