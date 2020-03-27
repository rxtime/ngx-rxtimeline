import { Identifiable, identifier } from './types';

export function findIdentifiable<T extends Identifiable>(
  identifiables: T[],
  id: identifier
): T {
  return id && identifiables.find(identifiable => identifiable.id === id);
}
