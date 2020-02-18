import { ResourcesAxisViewModel } from './resources-axis-view-model';
import { mockData } from '../../mock-data';
import { TimelineView } from '../../view/timeline-view';
import { Orientation } from '../../orientation';

describe('ResourcesAxisViewModel', () => {
  let vm: ResourcesAxisViewModel;
  const timelineView: TimelineView = new TimelineView({
    width: 300,
    height: 400,
    margin: 50
  });

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
      expect(vm.rangeLimit).toBe(timelineView.right);
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
      expect(vm.rangeLimit).toBe(timelineView.bottom);
    });
  });
});
