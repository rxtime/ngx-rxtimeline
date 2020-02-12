import { SeriesAxisViewModel } from './serie-axis-view-model';
import { timelineEventData } from '../timeline-event-data';
import { TimelineView } from '../view/timeline-view';

describe('SeriesAxisViewModel', () => {
  let vm: SeriesAxisViewModel;
  const timelineView: TimelineView = new TimelineView(300, 400, 50);

  beforeEach(() => {
    vm = new SeriesAxisViewModel(timelineEventData, timelineView);
  });

  it('should return correct tickInfo', () => {
    expect(vm.tickInfos).toMatchSnapshot();
  });

  it('should return correct rangeLimit', () => {
    expect(vm.rangeLimit).toBe(timelineView.bounds.right);
  });
});
