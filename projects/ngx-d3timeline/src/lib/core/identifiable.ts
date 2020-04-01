export type Identifier = string | number;

export interface Identifiable {
  id: Identifier;
}

export function findIdentifiable<T extends Identifiable>(
  identifiables: T[],
  id: Identifier
): T {
  return id && identifiables.find(identifiable => identifiable.id === id);
}
