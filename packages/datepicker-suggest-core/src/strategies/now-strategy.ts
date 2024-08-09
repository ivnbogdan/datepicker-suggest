import { startOfSecond } from "date-fns";
import { Matcher, MetaDateModifier } from "../models/matcher.js";
import { SuggestionStrategy } from "./suggestion-strategy.js";

class NowMatcher extends Matcher {
  name = "Now";
  additionalDateModifiers: MetaDateModifier[] = [];

  getDateValue(): Date {
    return startOfSecond(new Date());
  }
}

export class NowStrategy extends SuggestionStrategy {
  protected _matchers: Matcher[] = [new NowMatcher()];
}
