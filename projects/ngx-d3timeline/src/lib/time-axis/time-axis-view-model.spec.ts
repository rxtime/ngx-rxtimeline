import { TimeAxisViewModel } from './time-axis-view-model';
import { TimelineView } from '../view/timeline-view';
import { mockData } from '../mock-data';

describe('TimeAxisViewModel', () => {
  let vm: TimeAxisViewModel;
  const timelineView: TimelineView = new TimelineView(300, 400, 50);

  beforeEach(() => {
    vm = new TimeAxisViewModel(mockData, timelineView, null);
  });

  it('should return correct tickInfo', () => {
    expect(vm.tickInfos).toMatchSnapshot();
  });

  it('should return correct rangeLimit', () => {
    expect(vm.rangeLimit).toBe(timelineView.bounds.bottom);
  });
});
