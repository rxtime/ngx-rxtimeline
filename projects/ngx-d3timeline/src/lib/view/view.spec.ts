import { View } from './view';

describe('View', () => {
  it('should return correct bounds', () => {
    const view = new View([300, 400]);

    expect(view).toMatchSnapshot();
  });
});
