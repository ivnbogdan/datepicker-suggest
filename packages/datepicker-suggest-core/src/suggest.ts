import { DateSuggestion } from "./models/date-suggestion.js";
import { toInputTokens } from "./models/input-tokens.js";
import { DayMonthTokensStrategy } from "./strategies/day-month-tokens-strategy.js";
import { DaysStrategy } from "./strategies/days-strategy.js";
import { HourStrategy } from "./strategies/hour-strategy.js";
import { MinuteStrategy } from "./strategies/minute-strategy.js";
import { MonthsStrategy } from "./strategies/months-strategy.js";
import { NowStrategy } from "./strategies/now-strategy.js";
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
      new NowStrategy(),
      new HourStrategy(),
      new MinuteStrategy(),
    ];
  }

  generateSuggestions(input: string): DateSuggestion[] {
    const tokens = toInputTokens(input);
    const result = this.strategies.flatMap((strategy) =>
      strategy.generateSuggestions(tokens)
    );

    return result.filter(
      (suggestion, index, self) =>
        index === self.findIndex((t) => t.id === suggestion.id)
    );
  }

  generateExactSuggestion(input: string): DateSuggestion | null {
    const allSuggestions = this.generateSuggestions(input);
    return (
      allSuggestions.find(
        (suggestion) => suggestion.label.toLowerCase() === input.toLowerCase()
      ) ?? null
    );
  }
}
