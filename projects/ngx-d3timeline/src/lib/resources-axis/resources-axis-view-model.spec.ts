import { ResourcesAxisViewModel } from './resources-axis-view-model';
import { mockData } from '../mock-data';
import { TimelineView } from '../view/timeline-view';
import { Orientation } from '../orientation';

describe('ResourcesAxisViewModel', () => {
  let vm: ResourcesAxisViewModel;
  const timelineView: TimelineView = new TimelineView(300, 400, 50);

  describe('when Vertical', () => {
    beforeEach(() => {
      vm = new ResourcesAxisViewModel(
        mockData,
        timelineView,
        Orientation.Vertical
      );
    });

    it('should return correct tickInfo', () => {
      expect(vm.tickInfos).toMatchSnapshot();
    });

    it('should return correct rangeLimit', () => {
      expect(vm.rangeLimit).toBe(timelineView.bounds.right);
    });
  });

  describe('when Horizontal', () => {
    beforeEach(() => {
      vm = new ResourcesAxisViewModel(
        mockData,
        timelineView,
        Orientation.Horizontal
      );
    });

    it('should return correct tickInfo', () => {
      expect(vm.tickInfos).toMatchSnapshot();
    });

    it('should return correct rangeLimit', () => {
      expect(vm.rangeLimit).toBe(timelineView.bounds.bottom);
    });
  });
});
