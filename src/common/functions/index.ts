export * from './string-manipulation.functions';

export function getModelNameFromFullReference(reference: string) {
  const refSplit = reference.split(/\//g);

  return refSplit[refSplit.length - 1];
}
