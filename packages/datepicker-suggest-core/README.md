# datepicker-suggest-core

Core package for datepicker-suggest: it contains logic for generating suggestions based on an input text.
It is used internally by [@datepicker-suggest/react](../datepicker-suggest-react/README.md) to build a selection input in React.

## Example usage

```
    const engine = new SuggestionEngine();
    const suggestions = engine.generateSuggestions('Last');
```
