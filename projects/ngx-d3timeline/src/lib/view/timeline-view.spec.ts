import { TimelineView } from './timeline-view';

describe('TimelineView', () => {
  it('should return correct bounds', () => {
    const timelineView = new TimelineView([300, 400]);

    expect(timelineView).toMatchSnapshot();
  });
});
