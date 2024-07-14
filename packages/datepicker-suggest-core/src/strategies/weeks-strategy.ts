import {
  addDays,
  endOfDay,
  endOfWeek,
  startOfDay,
  startOfWeek,
  subDays,
} from "date-fns";
import { InputToken } from "../models/input-tokens.js";
import {
  Matcher,
  MetaDateModifier,
  TimeMetaApplier,
} from "../models/matcher.js";
import { SuggestionStrategy } from "./suggestion-strategy.js";

class ThisWeek extends Matcher {
  name = "This week";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfWeek(new Date()));
  }
}

class NextWeek extends Matcher {
  name = "Next week";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfWeek(addDays(new Date(), 7)));
  }
}

class LastWeek extends Matcher {
  name = "Last week";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfWeek(subDays(new Date(), 7)));
  }
}

class StartOfWeekMatcher extends Matcher {
  name = "Start of week";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return startOfDay(startOfWeek(new Date()));
  }
}

class EndOfWeekMatcher extends Matcher {
  name = "End of week";
  additionalDateModifiers: MetaDateModifier[] = [TimeMetaApplier];

  getDateValue(): Date {
    return endOfDay(endOfWeek(new Date()));
  }
}

class WeeksAgoMatcher extends Matcher {
  name = "weeks ago";
  additionalDateModifiers: MetaDateModifier[] = [];

  doesMatch(inputTokens: InputToken[]): boolean {
    const weeksNumber = inputTokens.find((x) => x.type === "index")?.value;
    if (inputTokens.length === 1 && !!weeksNumber) {
      return true;
    }

    if (inputTokens.length >= 2 && !!weeksNumber) {
      const stringTokens = inputTokens.filter((x) => x.type === "string");
      return stringTokens.some(
        (x) => "weeks".startsWith(x.value) || "ago".startsWith(x.value)
      );
    }

    return false;
  }

  getDateValue(inputTokens: InputToken[]): Date {
    const weeks = +inputTokens.find((x) => x.type === "index")!.value;
    return startOfDay(startOfWeek(subDays(new Date(), weeks * 7)));
  }

  protected override getUpdatedName(inputTokens: InputToken[]): string {
    const weeksNumber = inputTokens.find((x) => x.type === "index")?.value;
    return `${weeksNumber} weeks ago`;
  }
}

export class WeeksStrategy extends SuggestionStrategy {
  protected _matchers: Matcher[] = [
    new ThisWeek(),
    new LastWeek(),
    new NextWeek(),
    new WeeksAgoMatcher(),
    new StartOfWeekMatcher(),
    new EndOfWeekMatcher(),
  ];
}
