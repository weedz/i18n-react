# i18n-react

[![npm](https://img.shields.io/npm/v/@weedzcokie/i18n-react?style=flat-square)](https://www.npmjs.com/package/@weedzcokie/i18n-react)

## Example

### JavaScript

```jsx
// en.js
export default {
    "string-id": "EN",
    "string-param": (param) => `${param}, EN`
}

// sv.js
export default {
    "string-id": "SV",
    "string-param": (param) => `${param}, SV`
}

// App.jsx
import { withLanguage, storeLocale, changeLanguage } from "@weedzcokie/i18n-react";

storeLocale({
    "en": () => [import("./en.js")],
    "sv": () => [import("./sv.js")],
    // this also works
    // "en": () => [{
    //     "string-id": "EN"
    // }]
});

function App(props) {
    return (
        <div>
            <input onclick={() => changeLanguage("sv")} value="Change language" />
            <p>{this.props.t("string-id")}</p>
            <p>{this.props.t("string-param")("Hello World!")}</p>
        </div>
    );
}

export default withLanguage(App);
```

### TypeScript

`tsconfig.json`:
```jsonc
{
    "compilerOptions": {
        // ...
    },
    "include": [
        "src",
        "@types"
    ]
}
```

`@types/@weedzcokie/i18n-react.d.ts`:
```typescript
import { locales } from "src/i18n";
import ns1 from "src/i18n/en";
declare module "@weedzcokie/i18n-react" {
    type AllLocales = typeof locales;
    type StringValues = typeof ns1;

    type AllStrings = {
        [K in keyof StringValues]: StringValues[K];
    };
    // Extend interfaces from `@weedzcokie/i18n-react` with the actual values used
    interface StringValue extends AllStrings {}
    interface Locales extends AllLocales {}
}
```

```tsx
// src/en.ts
export default {
    "string-id": "EN",
    "string-param": (param: string) => `${param}, EN`
}

// src/sv.ts
export default {
    "string-id": "SV",
    "string-param": (param: string) => `${param}, SV`
} as typeof import("./en").default; // To make sure all strings are the correct type according to the "en" locale

// src/i18n/index.ts
import { storeLocale } from "@weedzcokie/i18n-react";

export const locales = {
    "en": () => [import("./en")],
    "sv": () => [import("./sv")],
    // this also works
    // "en": () => [{
    //     "string-id": "EN"
    // }]
};
storeLocale(locales);

// src/App.tsx
import { useTranslations, changeLanguage } from "@weedzcokie/i18n-react";
import "src/i18n"; // initialize locale store

type Props = {
    msg: string
};

function About(props: Props) {
    const t = useTranslations();
    return (
        <div>
            <h1>About</h1>
            <p>{props.msg}</p>
            <p>{t["string-id"]}</p>
            <input onclick={() => changeLanguage("sv")} value="Change language" />
        </div>
    );
}
```
