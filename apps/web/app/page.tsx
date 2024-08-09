"use client";
import { DatePickerSuggest } from "@datepicker-suggest/react";
import "@datepicker-suggest/react/index.css";
import { useState } from "react";

export default function Home() {
  const [dateValue] = useState<Date | undefined>(undefined);

  return (
    <div>
      <main>
        <div className="mx-auto h-screen w-72 pt-20">
          <DatePickerSuggest
            value={dateValue}
            onChange={(dateUpdate) =>
              console.log("bog app result: dateUpdate", dateUpdate)
            }
            initialSuggestion="now"
            optionsSuggestions={["now", "tomorrow", "yesterday"]}
          />
        </div>
      </main>
    </div>
  );
}
