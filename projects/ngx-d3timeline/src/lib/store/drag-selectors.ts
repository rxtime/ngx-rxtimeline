import { createSelector } from '../selector/memoized-selector';
import { selectDragEvent, selectData, selectTimeOrientation } from './state';
import { selectBandScale, selectTimeScale } from './timeline-selectors';
import { TimelineDragEvent } from '../content/timeline-drag-event';
import { TimelineEvent } from '../timeline-event';
import { getInverseBandScale } from '../scale-util';
import { InverseBandScale, TimeScale } from '../scale-types';
import { Orientation } from '../orientation';
import {
  DraggedTimelineEvent,
  applyDragEventOffset
} from './dragged-timeline-event';
import { EventRectangle } from '../content/event-rectangle';
import { selectEventRectangle } from '../content/event-rectangle.selectors';

const selectInverseBandScale = createSelector(
  [selectBandScale],
  getInverseBandScale
);

const selectGetShiftedSeries = createSelector(
  [selectInverseBandScale],
  (inverseBandScale: InverseBandScale) => (
    draggedTimelineEvent: DraggedTimelineEvent
  ) =>
    draggedTimelineEvent.x !== null
      ? inverseBandScale(draggedTimelineEvent.x)
      : draggedTimelineEvent.series
);

const selectDraggedTimelineEventSeriesShifter = createSelector(
  [selectGetShiftedSeries],
  getShiftedSeries => (draggedTimelineEvent: DraggedTimelineEvent) => ({
    ...draggedTimelineEvent,
    series: getShiftedSeries(draggedTimelineEvent),
    dx: 0
  })
);

const selectSeriesShiftedData = createSelector(
  [selectData, selectDraggedTimelineEventSeriesShifter],
  (data, shiftSeries) => data.map(shiftSeries)
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
    foo && applyDragEventOffset(foo, dragEvent)
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
