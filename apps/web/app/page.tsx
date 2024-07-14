"use client"
import { DateSuggestion } from '@datepicker-suggest/core';
import { DatePickerSuggest } from '@datepicker-suggest/react';
import "@datepicker-suggest/react/index.css";
import { startOfDay } from 'date-fns';
import { useEffect, useState } from 'react';

// const customRenderer = (dateSuggestion: DateSuggestion) => {
//   return <div>{dateSuggestion.date.toISOString()}</div>;
// };

export default function Home() {
  const [myDateSuggestion, setMyDateSuggestion] = useState<DateSuggestion | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setMyDateSuggestion({
        date: startOfDay(new Date()),
        label: 'Start of today',
        id: 'start-of-today'
      });
    }, 2000);
  }, []);

  return (


    <div>
      <main>
        <DatePickerSuggest 
          value={myDateSuggestion}
          onChange={(dateSuggestion) => console.log('bog app result: dateSuggestion', dateSuggestion)}
           />
      </main>
    </div>
  );
}
