import {
  addDays,
  addMonths,
  endOfDay,
  endOfMonth,
  isFuture,
  startOfDay,
  startOfMonth,
  startOfYear,
  subMonths,
  subYears,
} from "date-fns";
import { InputToken } from "../models/input-tokens.js";
import {
  Matcher,
  MetaDateModifier,
  TimeMetaApplier,
  YearMetaApplier,
} from "../models/matcher.js";
import { SuggestionStrategy } from "./suggestion-strategy.js";

const monthNameToIndex: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

class ThisMonth extends Matcher {
  name = "This month";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfMonth(new Date()));
  }
}

abstract class CalendarMonthMatcherBase extends Matcher {
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "1";
    const monthIndex = monthNameToIndex[this.name.toLowerCase()] ?? 0;
    const candidate = addDays(
      startOfDay(addMonths(startOfYear(new Date()), monthIndex)),
      +dayCount - 1
    );

    return isFuture(candidate) ? subYears(candidate, 1) : candidate;
  }

  protected override getUpdatedName(inputTokens: InputToken[]): string {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value;
    if (!dayCount) {
      return this.name;
    }
    return `${dayCount} ${this.name}`;
  }
}

class JanuaryMatcher extends CalendarMonthMatcherBase {
  name = "January";
}

class FebruaryMatcher extends CalendarMonthMatcherBase {
  name = "February";
}

class MarchMatcher extends CalendarMonthMatcherBase {
  name = "March";
}

class AprilMatcher extends CalendarMonthMatcherBase {
  name = "April";
}

class MayMatcher extends CalendarMonthMatcherBase {
  name = "May";
}

class JuneMatcher extends CalendarMonthMatcherBase {
  name = "June";
}

class JulyMatcher extends CalendarMonthMatcherBase {
  name = "July";
}

class AugustMatcher extends CalendarMonthMatcherBase {
  name = "August";
}

class SeptemberMatcher extends CalendarMonthMatcherBase {
  name = "September";
}

class OctoberMatcher extends CalendarMonthMatcherBase {
  name = "October";
}

class NovemberMatcher extends CalendarMonthMatcherBase {
  name = "November";
}

class DecemberMatcher extends CalendarMonthMatcherBase {
  name = "December";
}

class LastMatcher extends Matcher {
  name = "Last month";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfMonth(subMonths(new Date(), 1)));
  }
}

class NextMatcher extends Matcher {
  name = "Next month";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(addMonths(new Date(), 1));
  }
}

class StartOfMonthMatcher extends Matcher {
  name = "Start of month";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfMonth(new Date()));
  }
}

class EndOfMonthMatcher extends Matcher {
  name = "End of month";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return endOfDay(endOfMonth(new Date()));
  }
}

class MonthsAgoMatcher extends Matcher {
  name = "months ago";
  additionalDateModifiers: MetaDateModifier[] = [];

  doesMatch(inputTokens: InputToken[]): boolean {
    const monthsNumber = inputTokens.find((x) => x.type === "index")?.value;
    if (inputTokens.length === 1 && !!monthsNumber) {
      return true;
    }

    if (inputTokens.length >= 2 && !!monthsNumber) {
      const stringTokens = inputTokens.filter((x) => x.type === "string");
      return stringTokens.some(
        (x) => "months".startsWith(x.value) || "ago".startsWith(x.value)
      );
    }

    return false;
  }

  getDateValue(inputTokens: InputToken[]): Date {
    const monthsNumber = +inputTokens.find((x) => x.type === "index")!.value;
    return subMonths(startOfDay(new Date()), monthsNumber);
  }

  protected override getUpdatedName(inputTokens: InputToken[]): string {
    const monthsNumber = inputTokens.find((x) => x.type === "index")?.value;
    return `${monthsNumber} months ago`;
  }
}

export class MonthsStrategy extends SuggestionStrategy {
  protected _matchers: Matcher[] = [
    new JanuaryMatcher(),
    new FebruaryMatcher(),
    new MarchMatcher(),
    new AprilMatcher(),
    new MayMatcher(),
    new JuneMatcher(),
    new JulyMatcher(),
    new AugustMatcher(),
    new SeptemberMatcher(),
    new OctoberMatcher(),
    new NovemberMatcher(),
    new DecemberMatcher(),
    new ThisMonth(),
    new LastMatcher(),
    new NextMatcher(),
    new MonthsAgoMatcher(),
    new StartOfMonthMatcher(),
    new EndOfMonthMatcher(),
  ];
}
