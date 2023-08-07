export function createQuery(object?: any): string {
    if (object == undefined) {
        return '';
    }
    const queryParameters = Object.entries(object)
        .map(([key, value]) => (value !== undefined ? `${key}=${value}` : undefined))
        .filter((value) => value !== undefined);

    return queryParameters.join('&');
}