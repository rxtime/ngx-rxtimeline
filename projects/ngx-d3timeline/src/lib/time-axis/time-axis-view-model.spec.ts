import { TimeAxisViewModel } from './time-axis-view-model';
import { TimelineView } from '../view/timeline-view';
import { mockData } from '../mock-data';
import { Orientation } from '../orientation';

describe('TimeAxisViewModel', () => {
  let vm: TimeAxisViewModel;
  const timelineView: TimelineView = new TimelineView(300, 400, 50);

  describe('when Vertical', () => {
    beforeEach(() => {
      vm = new TimeAxisViewModel(
        mockData,
        timelineView,
        null,
        Orientation.Vertical
      );
    });

    it('should return correct tickInfo', () => {
      expect(vm.tickInfos).toMatchSnapshot();
    });

    it('should return correct rangeLimit', () => {
      expect(vm.rangeLimit).toBe(timelineView.bounds.bottom);
    });
  });

  describe('when Horizontal', () => {
    beforeEach(() => {
      vm = new TimeAxisViewModel(
        mockData,
        timelineView,
        null,
        Orientation.Horizontal
      );
    });

    it('should return correct tickInfo', () => {
      expect(vm.tickInfos).toMatchSnapshot();
    });

    it('should return correct rangeLimit', () => {
      expect(vm.rangeLimit).toBe(timelineView.bounds.right);
    });
  });
});
