import { TimelineView } from './timeline-view';

describe('TimelineView', () => {
  it('should return correct bounds', () => {
    const timelineView = new TimelineView(300, 400, 50);

    expect(timelineView.bounds).toMatchSnapshot();
  });
});
