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
} from "@headlessui/react";
import { DropdownIcon } from "./icons/dropdown-icon.js";

type DatePickerSuggestProps = {
  value?: Date;
  suggestion?: DateSuggestion;
  onChange?: (date: Date | undefined) => void;
  onSuggestionChange?: (suggestion: DateSuggestion | undefined) => void;
  panelClassName?: string;
  showDropdown?: boolean;
  suggestionRenderer?: (dateOption: { date: Date; label: string }) => ReactNode;
  displayValue?: (dateOption: { date: Date; label: string }) => string;
  initialSuggestion?: string;
  optionsSuggestions?: string[];
  placeholder?: string;
};

const defaultPlaceholder = "Start typing a date or time...";

const defaultSuggestionRenderer = (dateSuggestion: DateSuggestion) => (
  <>
    <span className="truncate group-data-[selected]:font-semibold">
      {dateSuggestion.label}
    </span>
    <span className="truncate text-gray-400 ml-auto">
      {format(dateSuggestion.date, "dd MMM yyyy HH:mm")}
    </span>
  </>
);

const defaultDisplayValue = (dateSuggestion: DateSuggestion) =>
  dateSuggestion.label;

export const DatePickerSuggest = (props: DatePickerSuggestProps) => {
  const suggestionRenderer =
    props.suggestionRenderer ?? defaultSuggestionRenderer;
  const displayValue = props.displayValue ?? defaultDisplayValue;
  let panelClassName = props.panelClassName ?? "";
  if (!panelClassName.includes("w-")) {
    panelClassName += " w-[var(--input-width)]";
  }

  const engine = new SuggestionEngine();

  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<DateSuggestion[]>([]);

  const [selectedDate, setSelectedDate] = useState<DateSuggestion | null>(null);

  const initializeOptionsSuggestions = (labelSuggestions: string[]) => {};

  useEffect(() => {
    if (props.value?.getTime() != selectedDate?.date?.getTime()) {
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

  useEffect(() => {
    if (
      !!props.suggestion?.date &&
      props.suggestion?.date?.getTime() != selectedDate?.date?.getTime()
    ) {
      setSelectedDate(props.suggestion);
    }
  }, [props.suggestion]);

  useEffect(() => {
    if (
      !props.initialSuggestion ||
      props.initialSuggestion === selectedDate?.label
    ) {
      return;
    }
    const suggestion = engine.generateExactSuggestion(props.initialSuggestion);
    if (suggestion) {
      handleOptionChange(suggestion);
    }
  }, [props.initialSuggestion]);

  const setResultFromOptions = (labelSuggestions: string[] | undefined) => {
    if (!labelSuggestions || labelSuggestions.length === 0) {
      return;
    }
    const optionResults = labelSuggestions
      .filter((label) => !!label)
      .map((label) => engine.generateExactSuggestion(label))
      .filter((opt): opt is DateSuggestion => !!opt);

    setResult(optionResults);
  };

  useEffect(() => {
    setResultFromOptions(props.optionsSuggestions);
  }, [props.optionsSuggestions]);

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      const suggestions = engine.generateSuggestions(value);
      setResult(suggestions);
    } else if (props.optionsSuggestions) {
      initializeOptionsSuggestions(props.optionsSuggestions);
    } else if (props.optionsSuggestions) {
      setResultFromOptions(props.optionsSuggestions);
    }
  };

  const handleOptionChange = (suggestion: DateSuggestion) => {
    setSelectedDate(suggestion);

    props.onChange?.(suggestion?.date);
    props.onSuggestionChange?.(suggestion ?? undefined);
  };
  return (
    <>
      <Combobox
        as="div"
        value={selectedDate}
        immediate={!props.showDropdown}
        onChange={handleOptionChange}
        onClose={() => setInputValue("")}
      >
        <div className="relative">
          <ComboboxInput
            placeholder={props.placeholder ?? defaultPlaceholder}
            autoComplete="off"
            className="w-full rounded-lg border border-input bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            onChange={handleTextInputChange}
            onBlur={() => setInputValue("")}
            displayValue={(dateSuggestion) =>
              !!dateSuggestion
                ? displayValue(dateSuggestion as DateSuggestion)
                : ""
            }
          />
          {props.showDropdown && (
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
              <span
                className="size-4 fill-white/60 group-data-[hover]:fill-white"
                aria-hidden="true"
              >
                <DropdownIcon />
              </span>
            </ComboboxButton>
          )}

          {result.length > 0 && (
            <ComboboxOptions
              anchor="bottom"
              transition
              className={`${panelClassName} rounded-xl border border-input bg-white/5 p-1.5 [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0`}
            >
              {result.map((suggestionResult) => (
                <ComboboxOption
                  key={suggestionResult.id}
                  value={suggestionResult}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-300/10"
                >
                  <div className="flex w-full text-sm/6">
                    {suggestionRenderer(suggestionResult)}
                  </div>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </>
  );
};
