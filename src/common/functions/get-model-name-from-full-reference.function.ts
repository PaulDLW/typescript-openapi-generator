import { mapType } from './map-type.function';

export function getModelNameFromFullReference(reference: string) {
  const refSplit = reference.split(/\//g);

  return mapType(refSplit[refSplit.length - 1]);
}
