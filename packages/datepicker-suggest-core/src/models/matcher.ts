import { format, setHours, setMinutes, setSeconds, setYear } from "date-fns";
import { DateSuggestion } from "./date-suggestion.js";
import { InputToken, parseTime } from "./input-tokens.js";

export type MetaDateModifier = (
  date: Date,
  inputTokens: InputToken[]
) => { date: Date; labelSuffix?: string };

export const YearMetaApplier: MetaDateModifier = (
  date: Date,
  inputTokens: InputToken[]
) => {
  const year = inputTokens.find((i) => i.type === "year")?.value;
  if (!year) {
    return { date };
  }
  return { date: setYear(date, +year), labelSuffix: ` ${year}` };
};

export const TimeMetaApplier: MetaDateModifier = (
  date: Date,
  inputTokens: InputToken[]
) => {
  const time = inputTokens.find((i) => i.type === "time");
  if (!time) {
    return { date };
  }

  const { hours, minutes } = parseTime(time.value);

  const dateResult = setHours(setMinutes(setSeconds(date, 0), minutes), hours);
  return { date: dateResult, labelSuffix: ` ${format(dateResult, "HH:mm")}` };
};

export abstract class Matcher {
  additionalDateModifiers: MetaDateModifier[] = [];
  abstract name: string;
  abstract getDateValue(inputTokens: InputToken[]): Date;

  getResult(inputTokens: InputToken[]): DateSuggestion {
    const date = this.getDateValue(inputTokens);
    const label = this.getUpdatedName(inputTokens);
    return {
      date,
      label,
      id: `${date.getTime().toString()} - ${label}`,
    };
  }

  doesMatch(inputTokens: InputToken[]): boolean {
    const stringTokens = inputTokens.filter((i) => i.type === "string");

    return stringTokens.some((token) =>
      this.name.toLocaleLowerCase().startsWith(token.value)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getUpdatedName(inputTokens: InputToken[]): string {
    return this.name;
  }
}
