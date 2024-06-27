import GoToButton from "../components/GoToButton";
import UnitsSelection from "../components/UnitsSelection";

function Quantities() {
  return (
    <div data-testid="quantities" className="min-h-screen flex flex-col">
      <GoToButton page={"/instructions"} isNext={true} />
      <GoToButton page={"/"} isNext={false} />
      <div className="flex h-screen justify-center text-center">
        <UnitsSelection />
      </div>
    </div>
  );
}

export default Quantities;
