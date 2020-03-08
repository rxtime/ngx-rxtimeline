import { createSelector } from '../selector/memoized-selector';
import { selectDragEvent, selectData, selectTimeOrientation } from './state';
import { selectBandScale, selectTimeScale } from './timeline-selectors';
import { TimelineDragEvent } from '../content/timeline-drag-event';
import { TimelineEvent } from '../timeline-event';
import { getInverseBandScale } from '../scale-util';
import { InverseBandScale, TimeScale, BandScale } from '../scale-types';
import { Orientation } from '../orientation';
import { pointToTransform } from '../drag-util';
import {
  DraggedTimelineEvent,
  draggingTimelineEvent
} from './dragged-timeline-event';
import { EventRectangle } from '../content/event-rectangle';

const selectInverseBandScale = createSelector(
  [selectBandScale],
  getInverseBandScale
);

const selectSeriesShiftedData = createSelector(
  [selectData, selectInverseBandScale],
  (data, inverseBandScale) =>
    data.map(d => ({
      ...d,
      series: d.x !== null ? inverseBandScale(d.x) : d.series,
      dx: 0
    }))
);

export const foo = createSelector(
  [selectDragEvent, selectSeriesShiftedData],
  (
    dragEvent: TimelineDragEvent,
    data: DraggedTimelineEvent[]
  ): DraggedTimelineEvent => dragEvent && data.find(d => d.id === dragEvent.id)
);

export const selectDraggingTimelineEvent = createSelector(
  [foo, selectDragEvent],
  (foo, dragEvent): DraggedTimelineEvent =>
    foo && draggingTimelineEvent(foo, dragEvent)
);

const selectDeltaTime = createSelector(
  [selectTimeOrientation, selectDragEvent],
  (timeOrientation: Orientation, dragEvent: TimelineDragEvent) =>
    timeOrientation === Orientation.Vertical
      ? dragEvent && dragEvent.dy
      : dragEvent && dragEvent.dx
);

const selectDeltaResource = createSelector(
  [selectTimeOrientation, selectDragEvent],
  (timeOrientation: Orientation, dragEvent: TimelineDragEvent) =>
    timeOrientation === Orientation.Vertical
      ? dragEvent && dragEvent.x
      : dragEvent && dragEvent.y
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
  ) =>
    draggingTimelineEvent && {
      start: timeScale.invert(
        timeScale(draggingTimelineEvent.start) + deltaTime
      ),
      finish: timeScale.invert(
        timeScale(draggingTimelineEvent.finish) + deltaTime
      )
    }
);

const positionInTimeScale = createSelector(
  [selectTimeScale],
  (timeScale: TimeScale) => (timelineEvent: TimelineEvent) =>
    timelineEvent && timeScale(timelineEvent.start)
);

const positionInBandScale = createSelector(
  [selectBandScale],
  (bandScale: BandScale) => (timelineEvent: TimelineEvent) =>
    timelineEvent && bandScale(timelineEvent.series)
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
    x: x(timelineEvent) + (timelineEvent && timelineEvent.dx),
    y: y(timelineEvent) + (timelineEvent && timelineEvent.dy)
  })
);

const rectTimeBreadth = createSelector(
  [selectTimeScale],
  (timeScale: TimeScale) => (timelineEvent: TimelineEvent) =>
    timelineEvent &&
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

export const selectDropTimelineEvent = createSelector(
  [foo, selectDropEventSeries, selectShiftedTimesForDraggingTimelineEvent],
  (
    draggingTimelineEvent: DraggedTimelineEvent,
    series: string,
    shiftedTime: { start: Date; finish: Date }
  ) =>
    draggingTimelineEvent && {
      ...draggingTimelineEvent,
      series,
      ...shiftedTime
    }
);

const selectDragEventId = createSelector(
  [selectDragEvent],
  (dragEvent: TimelineDragEvent) => dragEvent && dragEvent.id
);

export const selectNonDragTimelineEvents = createSelector(
  [selectSeriesShiftedData, selectDragEventId],
  (data: DraggedTimelineEvent[], dragEventId: number) =>
    data.filter(d => d.id !== dragEventId)
);

export const selectEventRectangle = createSelector(
  [selectEventTopLeft, rectWidth, rectHeight],
  (topleft, width, height) => (
    timelineEvent: DraggedTimelineEvent
  ): EventRectangle =>
    timelineEvent && {
      id: timelineEvent.id,
      title: timelineEvent.type,
      transform: pointToTransform(topleft(timelineEvent)),
      width: width(timelineEvent),
      height: height(timelineEvent)
    }
);

export const selectNonDragEventRectangles = createSelector(
  [selectNonDragTimelineEvents, selectEventRectangle],
  (timelineEvents: DraggedTimelineEvent[], getEventRectangle) =>
    timelineEvents.map(getEventRectangle)
);

export const selectDropTimelineRectangle = createSelector(
  [selectDropTimelineEvent, selectEventRectangle],
  timelineEventToRectangle
);

export const selectFromTimelineRectangle = createSelector(
  [foo, selectEventRectangle],
  timelineEventToRectangle
);

export const selectDraggingTimelineRectangle = createSelector(
  [selectDraggingTimelineEvent, selectEventRectangle],
  timelineEventToRectangle
);

export function timelineEventToRectangle(
  timelineEvent: DraggedTimelineEvent,
  getEventRectangle: (e: DraggedTimelineEvent) => EventRectangle
): EventRectangle {
  return getEventRectangle(timelineEvent);
}
