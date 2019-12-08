const types = new Map<string, string>([['integer', 'number']]);

export function mapType(type: string) {
  if (types.has(type)) {
    return types.get(type) as string;
  } else {
    return type;
  }
}
