import { subHours } from "date-fns";
import { InputToken } from "../models/input-tokens.js";
import { Matcher, MetaDateModifier } from "../models/matcher.js";
import { SuggestionStrategy } from "./suggestion-strategy.js";

class HoursAgoMatcher extends Matcher {
  name = "hours ago";
  additionalDateModifiers: MetaDateModifier[] = [];

  doesMatch(inputTokens: InputToken[]): boolean {
    const hoursNumber = inputTokens.find((x) => x.type === "index")?.value;
    if (inputTokens.length === 1 && !!hoursNumber) {
      return true;
    }

    if (inputTokens.length >= 2 && !!hoursNumber) {
      const stringTokens = inputTokens.filter((x) => x.type === "string");
      return stringTokens.some((x) => "hours".startsWith(x.value));
    }

    return false;
  }

  getDateValue(inputTokens: InputToken[]): Date {
    const hours = +inputTokens.find((x) => x.type === "index")!.value;
    return subHours(new Date(), hours);
  }

  protected override getUpdatedName(inputTokens: InputToken[]) {
    const hoursNumber = inputTokens.find((x) => x.type === "index")?.value;
    return `${hoursNumber} hours ago`;
  }
}

export class HourStrategy extends SuggestionStrategy {
  protected _matchers: Matcher[] = [new HoursAgoMatcher()];
}
