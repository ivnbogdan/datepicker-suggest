import { subMinutes } from "date-fns";
import { InputToken } from "../models/input-tokens.js";
import { Matcher, MetaDateModifier } from "../models/matcher.js";
import { SuggestionStrategy } from "./suggestion-strategy.js";

class MinutesAgoMatcher extends Matcher {
  name = "minutes ago";
  additionalDateModifiers: MetaDateModifier[] = [];

  doesMatch(inputTokens: InputToken[]): boolean {
    const minutesNumber = inputTokens.find((x) => x.type === "index")?.value;
    if (inputTokens.length === 1 && !!minutesNumber) {
      return true;
    }

    if (inputTokens.length >= 2 && !!minutesNumber) {
      const stringTokens = inputTokens.filter((x) => x.type === "string");
      return stringTokens.some((x) => "minutes".startsWith(x.value));
    }

    return false;
  }

  getDateValue(inputTokens: InputToken[]): Date {
    const minutes = +inputTokens.find((x) => x.type === "index")!.value;
    return subMinutes(new Date(), minutes);
  }

  protected override getUpdatedName(inputTokens: InputToken[]) {
    const minutesNumber = inputTokens.find((x) => x.type === "index")?.value;
    return `${minutesNumber} minutes ago`;
  }
}

export class MinuteStrategy extends SuggestionStrategy {
  protected _matchers: Matcher[] = [new MinutesAgoMatcher()];
}
