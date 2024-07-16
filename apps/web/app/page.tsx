"use client";
import { DatePickerSuggest } from "@datepicker-suggest/react";
import "@datepicker-suggest/react/index.css";
import { startOfDay } from "date-fns";
import { useEffect, useState } from "react";

// const customRenderer = (dateSuggestion: DateSuggestion) => {
//   return <div>{dateSuggestion.date.toISOString()}</div>;
// };

export default function Home() {
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setDateValue(startOfDay(new Date()));
    }, 2000);
  }, []);

  return (
    <div>
      <main>
        <div className="mx-auto h-screen w-72 pt-20">
          <DatePickerSuggest
            value={dateValue}
            onChange={(dateUpdate) =>
              console.log("bog app result: dateUpdate", dateUpdate)
            }
          />
        </div>
      </main>
    </div>
  );
}
