import { createSelector } from '../selector/memoized-selector';
import {
  selectDragEvent,
  selectData,
  selectTimeOrientation,
  State
} from './state';
import { selectBandScale, selectTimeScale } from './timeline-selectors';
import { TimelineDragEvent } from '../content/timeline-drag-event';
import { TimelineEvent } from '../timeline-event';
import { getInverseBandScale } from '../scale-util';
import { InverseBandScale, TimeScale, BandScale } from '../scale-types';
import { Orientation } from '../orientation';

export const selectDraggingTimelineEvent = createSelector(
  [selectDragEvent, selectData],
  (dragEvent: TimelineDragEvent, data: TimelineEvent[]) =>
    dragEvent && data.find(d => d.id === dragEvent.id)
);

const selectInverseBandScale = createSelector(
  [selectBandScale],
  getInverseBandScale
);

const selectDeltaTime = createSelector(
  [selectTimeOrientation, selectDragEvent],
  (timeOrientation: Orientation, dragEvent: TimelineDragEvent) =>
    dragEvent && timeOrientation === Orientation.Vertical
      ? dragEvent.dy
      : dragEvent.dx
);

const selectDeltaResource = createSelector(
  [selectTimeOrientation, selectDragEvent],
  (timeOrientation: Orientation, dragEvent: TimelineDragEvent) =>
    dragEvent && timeOrientation === Orientation.Vertical
      ? dragEvent.dx
      : dragEvent.dy
);

const selectDropEventSeries = createSelector(
  [selectInverseBandScale, selectDeltaResource],
  (inverseBandScale: InverseBandScale, deltaResource: number) =>
    inverseBandScale(deltaResource)
);

const selectShiftedTimesForDraggingTimelineEvent = createSelector(
  [selectDraggingTimelineEvent, selectDeltaTime, selectTimeScale],
  (
    draggingTimelineEvent: TimelineEvent,
    deltaTime: number,
    timeScale: TimeScale
  ) => ({
    start: timeScale.invert(timeScale(draggingTimelineEvent.start) + deltaTime),
    finish: timeScale.invert(
      timeScale(draggingTimelineEvent.finish) + deltaTime
    )
  })
);

const positionInTimeScale = (timelineEvent: TimelineEvent) =>
  createSelector([selectTimeScale], (timeScale: TimeScale) =>
    timeScale(timelineEvent.start)
  );

const positionInBandScale = (timelineEvent: TimelineEvent) =>
  createSelector([selectBandScale], (bandScale: BandScale) =>
    bandScale(timelineEvent.series)
  );

const getEventY = (timelineEvent: TimelineEvent) =>
  createSelector(
    [
      selectTimeOrientation,
      positionInBandScale(timelineEvent),
      positionInTimeScale(timelineEvent)
    ],
    (
      timeOrientation: Orientation,
      positionInTimeScale: number,
      positionInBandScale: number
    ) =>
      timeOrientation === Orientation.Vertical
        ? positionInTimeScale
        : positionInBandScale
  );

const getEventX = (timelineEvent: TimelineEvent) =>
  createSelector(
    [
      selectTimeOrientation,
      positionInBandScale(timelineEvent),
      positionInTimeScale(timelineEvent)
    ],
    (
      timeOrientation: Orientation,
      positionInTimeScale: number,
      positionInBandScale: number
    ) =>
      timeOrientation === Orientation.Vertical
        ? positionInBandScale
        : positionInTimeScale
  );

const selectEventTransform = (timelineEvent: TimelineEvent) =>
  createSelector(
    [getEventX(timelineEvent), getEventY(timelineEvent)],
    (eventX, eventY) => `translate(${eventX}, ${eventY}`
  );

const rectTimeBreadth = (timelineEvent: TimelineEvent) =>
  createSelector(
    [selectTimeScale],
    (timeScale: TimeScale) =>
      timeScale(timelineEvent.finish) - timeScale(timelineEvent.start)
  );

const rectResourceBreadth = createSelector(
  [selectBandScale],
  (bandScale: BandScale) => bandScale.bandwidth()
);

const rectHeight = (timelineEvent: TimelineEvent) =>
  createSelector(
    [
      selectTimeOrientation,
      rectTimeBreadth(timelineEvent),
      rectResourceBreadth
    ],
    (
      timeOrientation: Orientation,
      rectTimeBreadth: number,
      rectResourceBreadth: number
    ) =>
      timeOrientation === Orientation.Vertical
        ? rectTimeBreadth
        : rectResourceBreadth
  );

const rectWidth = (timelineEvent: TimelineEvent) =>
  createSelector(
    [
      selectTimeOrientation,
      rectTimeBreadth(timelineEvent),
      rectResourceBreadth
    ],
    (
      timeOrientation: Orientation,
      rectTimeBreadth: number,
      rectResourceBreadth: number
    ) =>
      timeOrientation === Orientation.Vertical
        ? rectResourceBreadth
        : rectTimeBreadth
  );

export const selectDropTimelineEvent = createSelector(
  [
    selectDraggingTimelineEvent,
    selectDropEventSeries,
    selectShiftedTimesForDraggingTimelineEvent
  ],
  (
    draggingTimelineEvent: TimelineEvent,
    series: string,
    shiftedTime: { start: Date; finish: Date }
  ) =>
    draggingTimelineEvent && {
      ...draggingTimelineEvent,
      series,
      ...shiftedTime
    }
);

export const selectNonDragTimelineEvents = createSelector(
  [selectData, selectDragEvent],
  (data: TimelineEvent[], dragEvent: TimelineDragEvent) =>
    data.filter(data => data.id !== (dragEvent && dragEvent.id))
);

export const selectEventRectangle = (timelineEvent: TimelineEvent) =>
  createSelector(
    [
      selectEventTransform(timelineEvent),
      rectWidth(timelineEvent),
      rectHeight(timelineEvent)
    ],
    (transform: string, width: number, height: number) => ({
      id: timelineEvent.id,
      title: timelineEvent.type,
      transform,
      width,
      height
    })
  );

export const selectNonDragEventRectangles = createSelector(
  [selectNonDragTimelineEvents],
  (timelineEvents: TimelineEvent[]) =>
    timelineEvents.map(e => selectEventRectangle(e))
);
