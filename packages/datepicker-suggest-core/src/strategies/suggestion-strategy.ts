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
        const modifierResult = modifier(dateSuggestion.date, inputTokens);
        dateSuggestion.date = modifierResult.date;
        if (modifierResult.labelSuffix) {
          dateSuggestion.label = `${dateSuggestion.label} ${modifierResult.labelSuffix}`;
        }
      });

      return dateSuggestion;
    });

    return allItems;
  }
}
