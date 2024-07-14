import { addDays, endOfDay, startOfDay, startOfWeek, subDays } from "date-fns";
import { InputToken } from "../models/input-tokens.js";
import {
  Matcher,
  MetaDateModifier,
  TimeMetaApplier,
} from "../models/matcher.js";
import { SuggestionStrategy } from "./suggestion-strategy.js";

class TodayMatcher extends Matcher {
  name = "Today";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(new Date());
  }
}

class YesterdayMatcher extends Matcher {
  name = "Yesterday";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(subDays(new Date(), 1));
  }
}
class TomorrowMatcher extends Matcher {
  name = "Tomorrow";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(addDays(new Date(), 1));
  }
}
class SundayMatcher extends Matcher {
  name = "Sunday";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfWeek(new Date(), { weekStartsOn: 0 }));
  }
}
class MondayMatcher extends Matcher {
  name = "Monday";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfWeek(new Date(), { weekStartsOn: 1 }));
  }
}
class TuesdayMatcher extends Matcher {
  name = "Tuesday";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfWeek(new Date(), { weekStartsOn: 2 }));
  }
}
class WednesdayMatcher extends Matcher {
  name = "Wednesday";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfWeek(new Date(), { weekStartsOn: 3 }));
  }
}
class ThursdayMatcher extends Matcher {
  name = "Thursday";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfWeek(new Date(), { weekStartsOn: 4 }));
  }
}
class FridayMatcher extends Matcher {
  name = "Friday";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfWeek(new Date(), { weekStartsOn: 5 }));
  }
}
class SaturdayMatcher extends Matcher {
  name = "Saturday";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfWeek(new Date(), { weekStartsOn: 6 }));
  }
}

class LastMatcher extends Matcher {
  name = "Last day";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(subDays(new Date(), 1));
  }
}

class NextMatcher extends Matcher {
  name = "Next day";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(addDays(new Date(), 1));
  }
}

class StartOfDayMatcher extends Matcher {
  name = "Start of day";
  additionalDateModifiers: MetaDateModifier[] = [];

  getDateValue(): Date {
    return startOfDay(new Date());
  }
}

class EndOfDayMatcher extends Matcher {
  name = "End of day";
  additionalDateModifiers: MetaDateModifier[] = [];

  getDateValue(): Date {
    return endOfDay(new Date());
  }
}

class DaysAgoMatcher extends Matcher {
  name = "days ago";
  additionalDateModifiers: MetaDateModifier[] = [];

  doesMatch(inputTokens: InputToken[]): boolean {
    const daysNumber = inputTokens.find((x) => x.type === "index")?.value;
    if (inputTokens.length === 1 && !!daysNumber) {
      return true;
    }

    if (inputTokens.length >= 2 && !!daysNumber) {
      const stringTokens = inputTokens.filter((x) => x.type === "string");
      return stringTokens.some(
        (x) => "days".startsWith(x.value) || "ago".startsWith(x.value)
      );
    }

    return false;
  }

  getDateValue(inputTokens: InputToken[]): Date {
    const days = +inputTokens.find((x) => x.type === "index")!.value;
    return subDays(startOfDay(new Date()), days);
  }

  protected override getUpdatedName(inputTokens: InputToken[]) {
    const daysNumber = inputTokens.find((x) => x.type === "index")?.value;
    return `${daysNumber} days ago`;
  }
}

export class DaysStrategy extends SuggestionStrategy {
  protected _matchers: Matcher[] = [
    new DaysAgoMatcher(),
    new TodayMatcher(),
    new YesterdayMatcher(),
    new TomorrowMatcher(),
    new SundayMatcher(),
    new MondayMatcher(),
    new TuesdayMatcher(),
    new WednesdayMatcher(),
    new ThursdayMatcher(),
    new FridayMatcher(),
    new SaturdayMatcher(),
    new LastMatcher(),
    new NextMatcher(),
    new StartOfDayMatcher(),
    new EndOfDayMatcher(),
  ];
}
