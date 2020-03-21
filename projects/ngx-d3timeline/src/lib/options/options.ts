export interface CompleteOptions {
  orientation: 'Vertical' | 'Horizontal';
  activityFontSize: number;
}

export type Options = Partial<CompleteOptions>;

export const defaultOptions: CompleteOptions = {
  orientation: 'Vertical',
  activityFontSize: 10
};
