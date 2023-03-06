import { useEffect, useState } from "react";
import { subscribe, unsubscribe } from "./connect.js";
import { strings } from "./utils.js";

export function useTranslations() {
    const [t, setStrings] = useState<Readonly<typeof strings>>(strings);

    useEffect(() => {
        function updateStrings(newStrings: typeof strings) {
            setStrings(newStrings);
        }
        subscribe(updateStrings);
        return () => {
            unsubscribe(updateStrings);
        }
    });

    return t;
}
