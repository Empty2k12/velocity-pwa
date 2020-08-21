import { useCallback, useContext, useEffect, useState } from "react";

import { RunningTransaction } from "../model";
import { getCurrentTransaction } from "../model/transaction";
import { LanguageContext } from "../resources/language";
import { toast } from "../util/toast";

import { useInterval } from "./interval";

const LOCALSTORAGE_RUNNING_TRANSACTION_KEY = "velocity/openbooking";

export const useRunningTransaction = () => {
  const { MAP } = useContext(LanguageContext);
  const [
    runningTransaction,
    setRunningTransaction,
  ] = useState<RunningTransaction | null>(null);

  const fetchRunningTransaction = useCallback(
    () =>
      getCurrentTransaction()
        .then((transaction) => {
          localStorage.setItem(
            LOCALSTORAGE_RUNNING_TRANSACTION_KEY,
            JSON.stringify(transaction),
          );
          setRunningTransaction(transaction);
        })
        .catch((err) => {
          console.error("Error while loading running transaction:", err);
          toast(MAP.ALERT.RUNNING_TRANSACTION_LOAD, { type: "error" });
        }),
    [MAP],
  );

  useEffect(() => {
    const lsRunningTransaction = localStorage.getItem(
      LOCALSTORAGE_RUNNING_TRANSACTION_KEY,
    );
    if (lsRunningTransaction) {
      setRunningTransaction(JSON.parse(lsRunningTransaction));
    }
  }, []);

  useInterval(fetchRunningTransaction);

  return { runningTransaction, fetchRunningTransaction };
};
