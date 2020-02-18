import { TimelineView } from './timeline-view';

describe('TimelineView', () => {
  it('should return correct bounds', () => {
    const timelineView = new TimelineView({
      width: 300,
      height: 400,
      margin: 50
    });

    expect(timelineView.bounds).toMatchSnapshot();
  });
});
