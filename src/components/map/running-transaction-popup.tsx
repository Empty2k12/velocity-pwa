import classNames from "classnames";
import React, { useCallback } from "react";

import { useRunningTransaction } from "../../hooks/running-transaction";
import { RunningTransaction } from "../../model";
import { renderDifference } from "../../util/moment";

import "./running-transaction-popup.scss";

interface RentPopupProps {
  runningTransaction: RunningTransaction | null;

  onRequestClose: () => void;
}

const RunningTransactionPopup: React.FC<RentPopupProps> = () => {
  const { runningTransaction } = useRunningTransaction();

  const handleClickOnPopup = useCallback(
    (ev: React.MouseEvent) => ev.stopPropagation(),
    [],
  );

  return (
    <div
      onClick={handleClickOnPopup}
      role="dialog"
      className={classNames("running-transaction-popup", "open")}
    >
      {runningTransaction?.pedelecName} -{" "}
      {renderDifference(
        new Date(),
        new Date(runningTransaction?.startDateTime!),
      )}
    </div>
  );
};

export default RunningTransactionPopup;
