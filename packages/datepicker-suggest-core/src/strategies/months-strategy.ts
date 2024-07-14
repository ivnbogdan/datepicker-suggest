import {
  addDays,
  addMonths,
  endOfDay,
  endOfMonth,
  setDay,
  startOfDay,
  startOfMonth,
  startOfYear,
  subMonths,
} from "date-fns";
import { InputToken } from "../models/input-tokens.js";
import {
  Matcher,
  MetaDateModifier,
  TimeMetaApplier,
  YearMetaApplier,
} from "../models/matcher.js";
import { SuggestionStrategy } from "./suggestion-strategy.js";

class ThisMonth extends Matcher {
  name = "This month";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfMonth(new Date()));
  }
}

abstract class CalendarMonthMatcherBase extends Matcher {
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
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "0";
    return setDay(startOfDay(startOfYear(new Date())), +dayCount);
  }
}
class FebruaryMatcher extends CalendarMonthMatcherBase {
  name = "February";
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "1";
    return addDays(
      startOfDay(addMonths(startOfYear(new Date()), 1)),
      +dayCount - 1
    );
  }
}
class MarchMatcher extends CalendarMonthMatcherBase {
  name = "March";
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "1";
    return addDays(
      startOfDay(addMonths(startOfYear(new Date()), 2)),
      +dayCount - 1
    );
  }
}
class AprilMatcher extends CalendarMonthMatcherBase {
  name = "April";
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "1";

    return addDays(
      startOfDay(addMonths(startOfYear(new Date()), 3)),
      +dayCount - 1
    );
  }
}
class MayMatcher extends CalendarMonthMatcherBase {
  name = "May";
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "1";
    return addDays(
      startOfDay(addMonths(startOfYear(new Date()), 4)),
      +dayCount - 1
    );
  }
}
class JuneMatcher extends CalendarMonthMatcherBase {
  name = "June";
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "1";
    return addDays(
      startOfDay(addMonths(startOfYear(new Date()), 5)),
      +dayCount - 1
    );
  }
}
class JulyMatcher extends CalendarMonthMatcherBase {
  name = "July";
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "1";
    return addDays(
      startOfDay(addMonths(startOfYear(new Date()), 6)),
      +dayCount - 1
    );
  }
}

class AugustMatcher extends CalendarMonthMatcherBase {
  name = "August";
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "1";

    return addDays(
      startOfDay(addMonths(startOfYear(new Date()), 7)),
      +dayCount - 1
    );
  }
}

class SeptemberMatcher extends CalendarMonthMatcherBase {
  name = "September";
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "1";
    return addDays(
      startOfDay(addMonths(startOfYear(new Date()), 8)),
      +dayCount - 1
    );
  }
}

class OctoberMatcher extends CalendarMonthMatcherBase {
  name = "October";
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "1";
    return addDays(
      startOfDay(addMonths(startOfYear(new Date()), 9)),
      +dayCount - 1
    );
  }
}

class NovemberMatcher extends CalendarMonthMatcherBase {
  name = "November";
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "1";
    return addDays(
      startOfDay(addMonths(startOfYear(new Date()), 10)),
      +dayCount - 1
    );
  }
}

class DecemberMatcher extends CalendarMonthMatcherBase {
  name = "December";
  additionalDateModifiers: MetaDateModifier[] = [
    YearMetaApplier,
    TimeMetaApplier,
  ];

  getDateValue(inputTokens: InputToken[]): Date {
    const dayCount = inputTokens.find((x) => x.type === "index")?.value ?? "1";
    return addDays(
      startOfDay(addMonths(startOfYear(new Date()), 11)),
      +dayCount - 1
    );
  }
}

class LastMatcher extends Matcher {
  name = "Last month";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(subMonths(new Date(), 1));
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
