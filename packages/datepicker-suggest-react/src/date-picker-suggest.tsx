"use client";

import { DateSuggestion, SuggestionEngine } from "@datepicker-suggest/core";
import { format } from "date-fns";
import { ReactNode, useEffect, useState } from "react";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";

type DatePickerSuggestProps = {
  value: DateSuggestion | null;
  onChange: (dateSuggestion: DateSuggestion | null) => void;
  suggestionRenderer?: (dateSuggestion: DateSuggestion) => ReactNode;
};

const defaultSuggestionRenderer = (dateSuggestion: DateSuggestion) => (
  <div className="flex">
    <span className="truncate group-data-[selected]:font-semibold">
      {dateSuggestion.label}
    </span>
    <span className="ml-2 truncate text-gray-400 group-data-[focus]:text-indigo-800">
      {format(dateSuggestion.date, "dd MMM yyyy HH:mm")}
    </span>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DatePickerSuggest = (props: DatePickerSuggestProps) => {
  const suggestionRenderer = props.suggestionRenderer ?? defaultSuggestionRenderer;
  const suggest = new SuggestionEngine();

  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<DateSuggestion[]>([]);

  const [selectedDate, setSelectedDate] = useState<DateSuggestion | null>(null);

  console.log('bog: props.value', props.value);

  useEffect(() => {
    if(props.value != selectedDate) {
      setSelectedDate(props.value);
    }
  }, [props.value])

  // if (props.value) {
  //   // TODO do I need to set the input as well?
  //   setInputValue(props.value.label);
  // }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const suggestions = suggest.generateSuggestions(value);
    setResult(suggestions);
  };

  useEffect(() => {
    if (selectedDate) {
      console.log("bog: selectedDate", selectedDate);
    }

    if (props.value != selectedDate) {
      props.onChange?.(selectedDate);
    }
  }, [selectedDate]);

  console.log("bog: suggestions", result);

  return (
    <>
      <Combobox
        as="div"
        value={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
        }}
        onClose={() => setInputValue("")}
      >
        <Label className="block text-sm font-medium leading-6 text-gray-100">
          Date
        </Label>
        <div className="h-screen w-2/3 relative mt-2">
          <ComboboxInput
            autoComplete="date-suggest"
            className="w-full rounded-md border-0 bg-gray-800 py-1.5 pl-3 pr-10 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
            onChange={handleInputChange}
            onBlur={() => setInputValue("")}
            displayValue={(dateSuggestion) =>
              !!dateSuggestion
                ? format((dateSuggestion as DateSuggestion).date, "dd MMM yyyy HH:mm")
                : ""
            }
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <span className="h-5 w-5 text-gray-500" aria-hidden="true">
              🔍
            </span>
          </ComboboxButton>

          {result.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none sm:text-sm">
              {result.map((suggestionResult) => (
                <ComboboxOption
                  key={suggestionResult.id}
                  value={suggestionResult}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-100 data-[focus]:bg-blue-400 data-[focus]:text-gray-900"
                >
                  {suggestionRenderer(suggestionResult)}

                  <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-400 group-data-[selected]:flex group-data-[focus]:text-gray-900">
                    <span className="h-5 w-5" aria-hidden="true">
                      🔍
                    </span>
                  </span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </>
  );
};
