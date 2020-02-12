import { SeriesAxisViewModel } from './serie-axis-view-model';
import { timelineEventData } from '../timeline-event-data';
import { View } from '../view/view';

describe('SeriesAxisViewModel', () => {
  let vm: SeriesAxisViewModel;
  const view: View = {
    height: 400,
    width: 300,
    margin: 50
  };

  beforeEach(() => {
    vm = new SeriesAxisViewModel(timelineEventData, view);
  });

  it('should should return correct tickInfo', () => {
    expect(vm.tickInfos).toMatchSnapshot();
  });

  it('should return correct rangeLimit', () => {
    expect(vm.rangeLimit).toBe(view.width - view.margin);
  });
});
