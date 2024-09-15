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
    <div className="flex justify-between items-center">
      <span className="font-semibold">{suggestion.label}</span>
      <span className="text-sm text-gray-500">
        {format(suggestion.date, "MMMM d, yyyy")}
      </span>
    </div>
  );

  return (
    <div>
      <main>
        <div className="mx-auto h-screen pt-20 container px-4 py-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">DatePickerSuggest</h1>

          <p className="mb-6">
            DatePickerSuggest is a next generation date picker which builds a
            date based on natural language.
          </p>

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

          <h2 className="text-2xl font-semibold mt-8 mb-4">Basic example</h2>
          <p className="mb-4">
            Here's a basic example of how to use the{" "}
            <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
              DatePickerSuggest
            </code>{" "}
            component:
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
                <div className="p-4 bg-gray-800 rounded-lg flex justify-center">
                  <div className="w-72">
                    <DatePickerSuggest
                      value={dateValue}
                      onChange={setDateValue}
                      panelClassName="text-white w-72"
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

          <h2 className="text-2xl font-semibold mt-8 mb-4">Styling</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">
            Using data attributes
          </h3>
          <p className="mb-4">
            The{" "}
            <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
              DatePickerSuggest
            </code>{" "}
            component exposes various data attributes that you can use for
            styling. For example:
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
                <div className="p-4 bg-gray-800 rounded-lg">
                  <DatePickerSuggest placeholder="Select a date..." />
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

          <h2 className="text-2xl font-semibold mt-8 mb-4">Examples</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Custom suggestion renderer
          </h3>
          <p className="mb-4">
            You can customize how suggestions are rendered using the{" "}
            <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded">
              suggestionRenderer
            </code>{" "}
            prop:
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
                <div className="p-4 bg-gray-800 rounded-lg">
                  <DatePickerSuggest
                    suggestionRenderer={customRenderer}
                    placeholder="Select a date..."
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

          <h2 className="text-2xl font-semibold mt-8 mb-4">Component API</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">DatePickerSuggest</h3>
          <p className="mb-4">
            The main date picker component with suggestion capabilities.
          </p>
          <table className="w-full border-collapse border border-gray-600 mb-6">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-600 px-4 py-2">Prop</th>
                <th className="border border-gray-600 px-4 py-2">Type</th>
                <th className="border border-gray-600 px-4 py-2">Default</th>
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
                <td className="border border-gray-600 px-4 py-2">-</td>
                <td className="border border-gray-600 px-4 py-2">
                  The currently selected date.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-600 px-4 py-2">
                  <code>suggestion</code>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  <code>DateSuggestion</code>
                </td>
                <td className="border border-gray-600 px-4 py-2">-</td>
                <td className="border border-gray-600 px-4 py-2">
                  The current date suggestion.
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Styled examples</h2>
          <p className="mb-6">
            For more styled examples and advanced usage patterns, check out our
            component gallery or refer to the full documentation.
          </p>
        </div>
      </main>
    </div>
  );
}
