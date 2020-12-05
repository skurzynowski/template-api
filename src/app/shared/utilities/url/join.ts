export function join(...endpoints: string[]): string {
  return endpoints.reduce((result, endpoint) => {
    if (!endpoint.startsWith('/')) {
      throw new Error(`Joining endpoints without / at the beginning: "${endpoint}" in "${endpoints.join('')}".`);
    }

    return `${result}${endpoint}`;
  }, '');
}
