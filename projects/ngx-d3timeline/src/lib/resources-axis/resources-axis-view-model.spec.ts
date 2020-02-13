import { ResourcesAxisViewModel } from './resources-axis-view-model';
import { mockData } from '../mock-data';
import { TimelineView } from '../view/timeline-view';

describe('ResourcesAxisViewModel', () => {
  let vm: ResourcesAxisViewModel;
  const timelineView: TimelineView = new TimelineView(300, 400, 50);

  beforeEach(() => {
    vm = new ResourcesAxisViewModel(mockData, timelineView);
  });

  it('should return correct tickInfo', () => {
    expect(vm.tickInfos).toMatchSnapshot();
  });

  it('should return correct rangeLimit', () => {
    expect(vm.rangeLimit).toBe(timelineView.bounds.right);
  });
});
