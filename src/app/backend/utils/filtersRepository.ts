
export function selectFields (data: object): object {
    return Object.keys(data).reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {} as Record<string, boolean>);
}