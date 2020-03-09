import { selectTimeScale, selectBandScale } from '../store/timeline-selectors';
import { TimelineEvent } from '../timeline-event';
import { TimeScale, BandScale } from '../scale-types';
import { createSelector } from '../selector/memoized-selector';
import { selectTimeOrientation } from '../store/state';
import { Orientation } from '../orientation';
import { DraggedTimelineEvent } from '../store/dragged-timeline-event';
import { EventRectangle } from './event-rectangle';
import { pointToTransform } from '../drag-util';

const positionInTimeScale = createSelector(
  [selectTimeScale],
  (timeScale: TimeScale) => (timelineEvent: TimelineEvent) =>
    timeScale(timelineEvent.start)
);

const positionInBandScale = createSelector(
  [selectBandScale],
  (bandScale: BandScale) => (timelineEvent: TimelineEvent) =>
    bandScale(timelineEvent.series)
);

const getEventY = createSelector(
  [selectTimeOrientation, positionInBandScale, positionInTimeScale],
  (timeOrientation: Orientation, pt, pb) => (timelineEvent: TimelineEvent) =>
    timeOrientation === Orientation.Vertical
      ? pb(timelineEvent)
      : pt(timelineEvent)
);

const getEventX = createSelector(
  [selectTimeOrientation, positionInBandScale, positionInTimeScale],
  (timeOrientation: Orientation, pt, pb) => (timelineEvent: TimelineEvent) =>
    timeOrientation === Orientation.Vertical
      ? pt(timelineEvent)
      : pb(timelineEvent)
);

const selectEventTopLeft = createSelector(
  [getEventX, getEventY],
  (x, y) => (timelineEvent: DraggedTimelineEvent) => ({
    x: x(timelineEvent) + timelineEvent.dx,
    y: y(timelineEvent) + timelineEvent.dy
  })
);

const rectTimeBreadth = createSelector(
  [selectTimeScale],
  (timeScale: TimeScale) => (timelineEvent: TimelineEvent) =>
    timeScale(timelineEvent.finish) - timeScale(timelineEvent.start)
);

const rectResourceBreadth = createSelector(
  [selectBandScale],
  (bandScale: BandScale) => bandScale.bandwidth()
);

const rectHeight = createSelector(
  [selectTimeOrientation, rectTimeBreadth, rectResourceBreadth],
  (timeOrientation: Orientation, rt, rr: number) => (
    timelineEvent: TimelineEvent
  ) => (timeOrientation === Orientation.Vertical ? rt(timelineEvent) : rr)
);

const rectWidth = createSelector(
  [selectTimeOrientation, rectTimeBreadth, rectResourceBreadth],
  (timeOrientation: Orientation, rt, rr: number) => (
    timelineEvent: TimelineEvent
  ) => (timeOrientation === Orientation.Vertical ? rr : rt(timelineEvent))
);

const selectTransformFunction = createSelector(
  [selectEventTopLeft],
  topLeft => (timelineEvent: DraggedTimelineEvent) =>
    pointToTransform(topLeft(timelineEvent))
);

export const selectEventRectangle = createSelector(
  [selectTransformFunction, rectWidth, rectHeight],
  (transform, width, height) => (
    timelineEvent: DraggedTimelineEvent
  ): EventRectangle =>
    timelineEvent && {
      id: timelineEvent.id,
      title: timelineEvent.type,
      transform: transform(timelineEvent),
      width: width(timelineEvent),
      height: height(timelineEvent)
    }
);
