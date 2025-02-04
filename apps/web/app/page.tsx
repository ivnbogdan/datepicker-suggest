"use client";
import { DatePickerSuggest } from "@datepicker-suggest/react";
import "@datepicker-suggest/react/index.css";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { format } from "date-fns";
import { ReactNode, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Home() {
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);

  const installationCode = `npm install @datepicker-suggest/react`;

  const basicExampleCode = `import { DatePickerSuggest } from '@datepicker-suggest/react';
import { useState } from 'react';

function Example() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePickerSuggest
      value={selectedDate}
      onChange={setSelectedDate}
      placeholder="Select a date..."
    />
  );
}`;

  const stylingExampleCode = `import { DatePickerSuggest } from '@datepicker-suggest/react';

function Example() {
  return (
    <DatePickerSuggest
      placeholder="Select a date..."
      className="w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-500 data-[focus]:ring-2 data-[focus]:ring-gray-200"
    />
  );
}`;

  const customRendererCode = `import { DatePickerSuggest } from '@datepicker-suggest/react';
import { format } from 'date-fns';

function Example() {
  const customRenderer = (suggestion) => (
    <div className="flex justify-between items-center">
      <span className="font-semibold">{suggestion.label}</span>
      <span className="text-sm text-gray-500">
        {format(suggestion.date, 'MMMM d, yyyy')}
      </span>
    </div>
  );

  return (
    <DatePickerSuggest
      suggestionRenderer={customRenderer}
      placeholder="Select a date..."
    />
  );
}`;

  const customRenderer = (suggestion: {
    date: Date;
    label: string;
  }): ReactNode => (
    <div className="flex w-full justify-between items-center">
      <span className="font-semibold">{suggestion.label}</span>
      <span className="text-sm text-gray-500">
        {format(suggestion.date, "MMMM d, yyyy")}
      </span>
    </div>
  );

  return (
    <div>
      <main>
        <div className="mx-auto container px-4 py-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">DatePickerSuggest</h1>

          <p className="mb-6">
            DatePickerSuggest is a next generation date picker which builds a
            date based on natural language.
            <br />
            No more using a calendar an clicking through months and years.
            Simply type in the desired date.
          </p>

          <video
            className="w-full h-[400px] mb-8 rounded-lg"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/datepicker-suggest/demo.webm" type="video/webm" />
          </video>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Installation</h2>
          <p className="mb-4">
            To get started, install the{" "}
            <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
              @datepicker-suggest/react
            </code>{" "}
            package:
          </p>
          <SyntaxHighlighter
            language="bash"
            style={tomorrow}
            className="rounded-lg mb-6"
          >
            {installationCode}
          </SyntaxHighlighter>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Usage</h2>
          <p className="mb-4">
            Here's a basic example of how to use the{" "}
            <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
              DatePickerSuggest
            </code>{" "}
            component
          </p>
          <TabGroup>
            <div className="flex justify-end mb-2">
              <TabList className="inline-flex space-x-1 rounded-xl bg-gray-800 p-1">
                <Tab
                  className={({ selected }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium leading-5
                    ${
                      selected
                        ? "bg-gray-600 text-white shadow"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  Component
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium leading-5
                    ${
                      selected
                        ? "bg-gray-600 text-white shadow"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  Code
                </Tab>
              </TabList>
            </div>
            <TabPanels className="mt-2">
              <TabPanel>
                <div className="p-4 rounded-lg flex justify-center">
                  <div className="w-72">
                    <DatePickerSuggest
                      value={dateValue}
                      onChange={setDateValue}
                      className="text-white w-72 bg-gray-800"
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <SyntaxHighlighter
                  language="jsx"
                  style={tomorrow}
                  className="rounded-lg mb-6"
                >
                  {basicExampleCode}
                </SyntaxHighlighter>
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <h3 className="text-xl font-semibold mt-6 mb-3">Styling</h3>
          <p className="mb-4">
            The{" "}
            <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
              className
            </code>{" "}
            property is applied to both the input and the dropdown panel.
            <br />
            In the example below a specific background color is applied
          </p>
          <TabGroup>
            <div className="flex justify-end mb-2">
              <TabList className="inline-flex space-x-1 rounded-xl bg-gray-800 p-1">
                <Tab
                  className={({ selected }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium leading-5
                    ${
                      selected
                        ? "bg-gray-600 text-white shadow"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  Component
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium leading-5
                    ${
                      selected
                        ? "bg-gray-600 text-white shadow"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  Code
                </Tab>
              </TabList>
            </div>
            <TabPanels className="mt-2">
              <TabPanel>
                <div className="p-4 rounded-lg">
                  <DatePickerSuggest
                    placeholder="Select a date..."
                    className="bg-stone-700"
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <SyntaxHighlighter
                  language="jsx"
                  style={tomorrow}
                  className="rounded-lg mb-6"
                >
                  {stylingExampleCode}
                </SyntaxHighlighter>
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Custom suggestion renderer
          </h3>
          <p className="mb-4">
            You can customize how suggestions are rendered using the{" "}
            <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
              suggestionRenderer
            </code>{" "}
            prop
          </p>
          <TabGroup>
            <div className="flex justify-end mb-2">
              <TabList className="inline-flex space-x-1 rounded-xl bg-gray-800 p-1">
                <Tab
                  className={({ selected }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium leading-5
                    ${
                      selected
                        ? "bg-gray-600 text-white shadow"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  Component
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium leading-5
                    ${
                      selected
                        ? "bg-gray-600 text-white shadow"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  Code
                </Tab>
              </TabList>
            </div>
            <TabPanels className="mt-2">
              <TabPanel>
                <div className="p-4 rounded-lg">
                  <DatePickerSuggest
                    suggestionRenderer={customRenderer}
                    placeholder="Select a date..."
                    className="text-white w-72 bg-gray-800"
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <SyntaxHighlighter
                  language="jsx"
                  style={tomorrow}
                  className="rounded-lg mb-6"
                >
                  {customRendererCode}
                </SyntaxHighlighter>
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Component properties API
          </h3>
          <table className="w-full border-collapse border border-gray-600 mb-6">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-600 px-4 py-2">Prop</th>
                <th className="border border-gray-600 px-4 py-2">Type</th>
                <th className="border border-gray-600 px-4 py-2">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-600 px-4 py-2">
                  <code>value</code>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  <code>Date</code>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  The currently selected date.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-600 px-4 py-2">
                  <code>initialSuggestion</code>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  <code>string</code>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  The starting value. Should be a string which will calculate
                  the date relatively to the current time.
                  <br />
                  E.g. 'Today', 'Last month', etc
                </td>
              </tr>
              <tr>
                <td className="border border-gray-600 px-4 py-2">
                  <code>optionsSuggestions</code>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  <code>string[]</code>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  An array of strings as the initial suggestions.
                  <br />
                  These will first display when the dropdown is focused to
                  inform the user about the possible values.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-600 px-4 py-2">
                  <code>placeholder</code>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  <code>string</code>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  The placeholder string displayed when the input is empty.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-600 px-4 py-2">
                  <code>className</code>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  <code>string</code>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  The classes that will be applied to both the input and the
                  dropdown panel.
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mt-6 mb-3">Time support</h3>
          <p className="mb-6">
            Time support is limited for now, but defining a time is possible.
            <br />
            After typing the date, a time can be defined by using{" "}
            <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
              am
            </code>{" "}
            or{" "}
            <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
              pm
            </code>{" "}
            keywords or the{" "}
            <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
              :
            </code>{" "}
            separator between hours and minutes.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Dependencies</h3>
          <div className="mb-6">
            Currently the{" "}
            <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
              @datepicker-suggest/react
            </code>{" "}
            package has a peer dependency to
            <ul>
              <li>
                <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
                  @headlessui/react
                </code>{" "}
                for the dropdown
              </li>
              <li>
                <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
                  date-fns
                </code>{" "}
                for date manipulations
              </li>
            </ul>
            <br />
            Future work implies making the dropdown implementation pluginable to
            be able to use other dropdowns instead.
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Contributing</h3>
          <p className="mb-6">
            The project is very much still in it's infancy and any contributions
            are welcomed.
            <br />
            There is still much room for improvements, on both suggesting new
            values, and adding new features.
            <br />
            The suggestions core is split in a separate package, so extending to
            other frameworks besides react can leverage existing logic.
          </p>
        </div>
      </main>
    </div>
  );
}
