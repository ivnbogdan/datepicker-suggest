import { DateSuggestion } from "./models/date-suggestion.js";
import { toInputTokens } from "./models/input-tokens.js";
import { DayMonthTokensStrategy } from "./strategies/day-month-tokens-stategy.js";
import { DaysStrategy } from "./strategies/days-strategy.js";
import { MonthsStrategy } from "./strategies/months-strategy.js";
import { SuggestionStrategy } from "./strategies/suggestion-strategy.js";
import { WeeksStrategy } from "./strategies/weeks-strategy.js";
import { YearsStrategy } from "./strategies/years-strategy.js";

export class SuggestionEngine {
  private strategies: SuggestionStrategy[];

  constructor() {
    this.strategies = [
      new DaysStrategy(),
      new WeeksStrategy(),
      new MonthsStrategy(),
      new DayMonthTokensStrategy(),
      new YearsStrategy(),
    ];
  }

  generateSuggestions(input: string): DateSuggestion[] {
    const tokens = toInputTokens(input);
    return this.strategies.flatMap((strategy) =>
      strategy.generateSuggestions(tokens)
    );
  }
}
