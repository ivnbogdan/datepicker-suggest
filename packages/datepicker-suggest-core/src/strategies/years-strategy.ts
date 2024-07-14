import {
  addYears,
  endOfDay,
  endOfYear,
  startOfDay,
  startOfYear,
  subYears,
} from "date-fns";
import {
  Matcher,
  MetaDateModifier,
  TimeMetaApplier,
} from "../models/matcher.js";
import { SuggestionStrategy } from "./suggestion-strategy.js";

class ThisYearMatcher extends Matcher {
  name = "This year";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfYear(new Date()));
  }
}

class StartOfYearMatcher extends Matcher {
  name = "Start of year";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfYear(new Date()));
  }
}

class EndOfYearMatcher extends Matcher {
  name = "End of year";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return endOfDay(endOfYear(new Date()));
  }
}

class LastYearMatcher extends Matcher {
  name = "Last year";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfYear(subYears(new Date(), 1)));
  }
}

class NextYearMatcher extends Matcher {
  name = "Next year";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfYear(addYears(new Date(), 1)));
  }
}

export class YearsStrategy extends SuggestionStrategy {
  protected _matchers: Matcher[] = [
    new ThisYearMatcher(),
    new LastYearMatcher(),
    new NextYearMatcher(),
    new StartOfYearMatcher(),
    new EndOfYearMatcher(),
  ];
}
