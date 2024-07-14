import { DateSuggestion } from "../models/date-suggestion.js";
import { InputToken } from "../models/input-tokens.js";
import { Matcher } from "../models/matcher.js";

export abstract class SuggestionStrategy {
  protected abstract _matchers: Matcher[];

  generateSuggestions(inputTokens: InputToken[]): DateSuggestion[] {
    const matchers = this._matchers.filter((x) => x.doesMatch(inputTokens));
    const allItems = matchers.map((x) => {
      const dateSuggestion = x.getResult(inputTokens);
      x.additionalDateModifiers.forEach((modifier) => {
        dateSuggestion.date = modifier(dateSuggestion.date, inputTokens);
      });

      return dateSuggestion;
    });

    return allItems;
  }
}
