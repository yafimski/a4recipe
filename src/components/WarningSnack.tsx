import { useDispatch, useSelector } from "react-redux";
import { setWarning } from "../state/warning/warningSlice";
import type { RootState } from "../state/store";
import { useEffect } from "react";
import { handleKeyDownPrevent } from "../utils/helpers";

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
      className="toast"
      onClick={handleClose}
      onKeyDown={handleKeyDownPrevent}
      data-testid={"snack"}
    >
      {warning}
    </div>
  );
}

export default WarningSnack;
