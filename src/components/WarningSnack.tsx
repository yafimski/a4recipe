import { useDispatch, useSelector } from "react-redux";
import { setWarning } from "../state/warning/warningSlice";
import type { RootState } from "../state/store";
import { useEffect } from "react";
import { handleKeyDown } from "../utils/helpers";

function WarningSnack() {
  const warning = useSelector((state: RootState) => state.warning.warning);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setWarning(""));
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleClose = () => {
    dispatch(setWarning(""));
  };

  return (
    <div
      className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-red-400 text-black font-semibold p-3 rounded-3xl px-8 toast"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      data-testid={"snack"}
    >
      {warning}
    </div>
  );
}

export default WarningSnack;
