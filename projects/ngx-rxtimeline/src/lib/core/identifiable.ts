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

export function updateOne<T extends Identifiable>(
  identifiables: T[],
  update: T
): T[] {
  return update
    ? identifiables.map(activity =>
        activity.id === update.id ? update : activity
      )
    : identifiables;
}
