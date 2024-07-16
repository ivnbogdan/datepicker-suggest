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

const DropdownIcon = () => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
      fill="currentColor"
    />
  </svg>
);

type DatePickerSuggestProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  suggestionRenderer?: (dateOption: { date: Date; label: string }) => ReactNode;
};

const defaultSuggestionRenderer = (dateSuggestion: DateSuggestion) => (
  <>
    <span className="truncate group-data-[selected]:font-semibold">
      {dateSuggestion.label}
    </span>
    <span className="ml-2 truncate text-gray-400 justify-end">
      {format(dateSuggestion.date, "dd MMM yyyy HH:mm")}
    </span>
  </>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DatePickerSuggest = (props: DatePickerSuggestProps) => {
  const suggestionRenderer =
    props.suggestionRenderer ?? defaultSuggestionRenderer;
  const suggest = new SuggestionEngine();

  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<DateSuggestion[]>([]);

  const [selectedDate, setSelectedDate] = useState<DateSuggestion | null>(null);

  console.log("bog: props.value", props.value);

  useEffect(() => {
    if (props.value != selectedDate?.date) {
      const propsSelectedDate = props.value
        ? {
            date: props.value,
            label: format(props.value, "dd MMM yyyy HH:mm"),
            id: props.value.getTime().toString(),
          }
        : null;
      setSelectedDate(propsSelectedDate);
    }
  }, [props.value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const suggestions = suggest.generateSuggestions(value);
    setResult(suggestions);
  };

  useEffect(() => {
    props.onChange?.(selectedDate?.date);
  }, [selectedDate]);

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
        <div className="relative">
          <ComboboxInput
            autoComplete="off"
            className="w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            onChange={handleInputChange}
            onBlur={() => setInputValue("")}
            displayValue={(dateSuggestion) =>
              !!dateSuggestion
                ? format(
                    (dateSuggestion as DateSuggestion).date,
                    "dd MMM yyyy HH:mm"
                  )
                : ""
            }
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <span
              className="size-4 fill-white/60 group-data-[hover]:fill-white"
              aria-hidden="true"
            >
              <DropdownIcon />
            </span>
          </ComboboxButton>

          {result.length > 0 && (
            <ComboboxOptions
              anchor="bottom"
              transition
              className="w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            >
              {result.map((suggestionResult) => (
                <ComboboxOption
                  key={suggestionResult.id}
                  value={suggestionResult}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                >
                  <div className="flex text-sm/6 text-white">
                    {suggestionRenderer(suggestionResult)}
                  </div>

                  {/* <span className="invisible size-4 fill-white group-data-[selected]:visible">
                    <span className="h-5 w-5" aria-hidden="true">
                      <CheckIcon />
                    </span>
                  </span> */}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </>
  );
};
