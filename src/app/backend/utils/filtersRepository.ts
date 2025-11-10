export function toLowerCaseDeepRecord<T extends Record<string, unknown>>(obj: T): T {
    const excludeKeys = ["password", "email", "estado", "state", "appointmentState", "role"];

    const transformValue = (value: unknown, key: string): unknown => {
        if (typeof value === "string" && !excludeKeys.includes(key)) {
            return value.toLowerCase();
        } else if (Array.isArray(value)) {
            return value.map((v) =>
                typeof v === "object" && v !== null
                    ? toLowerCaseDeepRecord(v as Record<string, unknown>)
                    : v
            );
        } else if (value !== null && typeof value === "object") {
            return toLowerCaseDeepRecord(value as Record<string, unknown>);
        }
        return value;
    };

    const entries = Object.entries(obj).map(([key, value]) => [key, transformValue(value, key)]);
    return Object.fromEntries(entries) as T;
}


export function selectFields(data: object): object {
    return Object.keys(data).reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {} as Record<string, boolean>);
}