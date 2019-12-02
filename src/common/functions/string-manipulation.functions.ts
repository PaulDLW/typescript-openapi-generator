export function toKebabCase(input: string) {
  return input
    .split(/(?=[A-Z])/)
    .join('-')
    .toLocaleLowerCase()
    .replace(/\W+/g, '-');
}

export function toPascalCase(input: string) {
  return input
    .split(/\W+/g)
    .map(split => toTitleCase(split))
    .join('');
}

export function toCamelCase(input: string) {
  const pascalInput = toPascalCase(input);
  return pascalInput.charAt(0).toLocaleLowerCase() + pascalInput.substr(1);
}

export function toTitleCase(input: string) {
  return input.charAt(0).toLocaleUpperCase() + input.substr(1);
}
