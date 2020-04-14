import { createSelector } from '../store-lib/selector/create-selector';
import { selectZoomEvent } from '../store/state';
import { createOptionsBasedSelector } from '../store-lib/selector/selector-utils';
import { Orientation } from '../core/orientation';
import { selectTimeOrientation } from '../options/selectors/options.selectors';

const selectZoomEventRescaleX = createSelector(
  selectZoomEvent,
  event => event && event.transform.rescaleX.bind(event.transform)
);

const selectZoomEventRescaleY = createSelector(
  selectZoomEvent,
  event => event && event.transform.rescaleY.bind(event.transform)
);

export const selectZoomEventRescale = createOptionsBasedSelector<
  Orientation,
  any
>({
  Horizontal: selectZoomEventRescaleX,
  Vertical: selectZoomEventRescaleY
})(selectTimeOrientation);
