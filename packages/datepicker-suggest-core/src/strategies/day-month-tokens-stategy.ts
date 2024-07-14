import { format, startOfDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { InputToken } from "../models/input-tokens.js";
import {
  Matcher,
  MetaDateModifier,
  TimeMetaApplier,
  YearMetaApplier,
} from "../models/matcher.js";
import { SuggestionStrategy } from "./suggestion-strategy.js";

class DayMonthTokensMatcher extends Matcher {
  name = "";
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  constructor(private _reverseDayMonth: boolean) {
    super();
  }

  doesMatch(inputTokens: InputToken[]) {
    const { day, month } = this._getDayMonthFromInput(inputTokens);
    return !!day && !!month;
  }

  protected override getUpdatedName(inputTokens: InputToken[]): string {
    const { day, month } = this._getDayMonthFromInput(inputTokens);
    if (!day || !month) {
      return "";
    }

    const monthName = format(new Date(2000, month - 1, 1), "MMMM", {
      locale: enUS,
    });
    return `${day} ${monthName}`;
  }

  getDateValue(inputTokens: InputToken[]): Date {
    const { day, month } = this._getDayMonthFromInput(inputTokens);
    if (!day || !month) {
      return new Date();
    }

    const result = new Date();
    result.setMonth(month - 1);
    result.setDate(day);
    return startOfDay(result);
  }

  private _getDayMonthFromInput(inputTokens: InputToken[]) {
    let numberCandidates = inputTokens
      .filter((t) => t.type === "index")
      .map((t) => +t.value)
      .filter((x) => !isNaN(x))
      .filter((x) => x > 0 && x < 32);

    if (numberCandidates.length < 2) {
      return { day: null, month: null };
    }

    if (numberCandidates.length > 2) {
      numberCandidates = numberCandidates.slice(0, 2);
    }

    if (this._reverseDayMonth) {
      numberCandidates.reverse();
    }
    const [day, month] = numberCandidates;

    if (!month || month > 12) {
      return { day: null, month: null };
    }

    // Instead of 31 this should match current month
    if (!day || day > 31) {
      return { day: null, month: null };
    }

    return { day, month };
  }
}

export class DayMonthTokensStrategy extends SuggestionStrategy {
  protected _matchers: Matcher[] = [
    new DayMonthTokensMatcher(true),
    new DayMonthTokensMatcher(false),
  ];
}
