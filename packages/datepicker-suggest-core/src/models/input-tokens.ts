export type InputToken = {
  value: string;
  type: "index" | "year" | "string" | "time";
};

export const toInputTokens = (input: string): InputToken[] => {
  const strings = input
    .split(/[ /,]+/)
    .filter((x) => !!x.trim())
    .map((x) => x.toLowerCase());

  const resultTokens: InputToken[] = strings.map((s) => {
    if (
      s.includes(":") ||
      s.includes(".") ||
      s.includes("am") ||
      s.includes("pm")
    ) {
      return {
        value: s,
        type: "time",
      };
    } else if (!isNaN(Number(s)) && s.length === 4 && Number(s) >= 1900) {
      return {
        value: s,
        type: "year",
      };
    } else if (!isNaN(Number(s))) {
      return {
        value: s,
        type: "index",
      };
    } else {
      return {
        value: s,
        type: "string",
      };
    }
  });

  const timeTokens = resultTokens.filter((t) => t.type === "time");
  const singleTimeToken = timeTokens.length === 1 ? timeTokens[0] : null;
  if (
    singleTimeToken &&
    (singleTimeToken.value === "am" || singleTimeToken.value === "pm")
  ) {
    const timeIndex = resultTokens.findIndex((t) => t.type === "time");
    if (timeIndex >= 1 && resultTokens[timeIndex - 1]?.type === "index") {
      resultTokens[timeIndex - 1]!.type = "time";
    }
  }

  return resultTokens;
};

export const parseTime = (time: string) => {
  const timeRegex =
    /^(\d{1,2})(?::|\.|)(\d{1,2})?(?:\s*(am|pm))?|\d{1,2}\s*(am|pm)$/i;
  const match = time.match(timeRegex);

  if (!match) {
    throw new Error("Invalid time format");
  }

  let hours = parseInt(match[1]!, 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3]?.toLowerCase();

  if (period === "pm" && hours < 12) {
    hours += 12;
  } else if (period === "am" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};
