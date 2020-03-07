import {
  createSelector,
  MemoizedSelector
} from '../selector/memoized-selector';
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

const positionInTimeScale = (timelineEvent: TimelineEvent) =>
  createSelector(
    [selectTimeScale],
    (timeScale: TimeScale) => timelineEvent && timeScale(timelineEvent.start)
  );

const positionInBandScale = (timelineEvent: TimelineEvent) =>
  createSelector(
    [selectBandScale],
    (bandScale: BandScale) => timelineEvent && bandScale(timelineEvent.series)
  );

const getEventY = (timelineEvent: TimelineEvent) =>
  createSelector(
    [
      selectTimeOrientation,
      positionInBandScale(timelineEvent),
      positionInTimeScale(timelineEvent)
    ],
    (timeOrientation: Orientation, pt: number, pb: number) =>
      timeOrientation === Orientation.Vertical ? pb : pt
  );

const getEventX = (timelineEvent: TimelineEvent) =>
  createSelector(
    [
      selectTimeOrientation,
      positionInBandScale(timelineEvent),
      positionInTimeScale(timelineEvent)
    ],
    (timeOrientation: Orientation, pt: number, pb: number) =>
      timeOrientation === Orientation.Vertical ? pt : pb
  );

const selectEventTopLeft = (timelineEvent: DraggedTimelineEvent) =>
  createSelector(
    [getEventX(timelineEvent), getEventY(timelineEvent)],
    (x, y) => ({
      x: x + (timelineEvent && timelineEvent.dx),
      y: y + (timelineEvent && timelineEvent.dy)
    })
  );

const rectTimeBreadth = (timelineEvent: TimelineEvent) =>
  createSelector(
    [selectTimeScale],
    (timeScale: TimeScale) =>
      timelineEvent &&
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
    (timeOrientation: Orientation, rt: number, rr: number) =>
      timeOrientation === Orientation.Vertical ? rt : rr
  );

const rectWidth = (timelineEvent: TimelineEvent) =>
  createSelector(
    [
      selectTimeOrientation,
      rectTimeBreadth(timelineEvent),
      rectResourceBreadth
    ],
    (timeOrientation: Orientation, rt: number, rr: number) =>
      timeOrientation === Orientation.Vertical ? rr : rt
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

export const selectEventRectangle = (
  timelineEvent: DraggedTimelineEvent,
  eventTopLeftSelector: (
    t: TimelineEvent,
    d: TimelineDragEvent
  ) => MemoizedSelector
) =>
  createSelector(
    [
      eventTopLeftSelector(timelineEvent, timelineEvent),
      rectWidth(timelineEvent),
      rectHeight(timelineEvent)
    ],
    (topleft, width, height) =>
      timelineEvent && {
        id: timelineEvent.id,
        title: timelineEvent.type,
        transform: pointToTransform(topleft),
        width,
        height
      }
  );

export const selectNonDragEventRectangles = createSelector(
  [selectNonDragTimelineEvents],
  (timelineEvents: DraggedTimelineEvent[]) =>
    timelineEvents.map(e => selectEventRectangle(e, selectEventTopLeft))
);

export const selectDropTimelineRectangle = createSelector(
  [selectDropTimelineEvent],
  (dropTimelineEvent: DraggedTimelineEvent) =>
    selectEventRectangle(dropTimelineEvent, selectEventTopLeft)
);

export const selectFromTimelineRectangle = createSelector(
  [foo],
  (draggingTimelineEvent: DraggedTimelineEvent) =>
    selectEventRectangle(draggingTimelineEvent, selectEventTopLeft)
);

export const selectDraggingTimelineRectangle = createSelector(
  [selectDraggingTimelineEvent],
  (draggingTimelineEvent: DraggedTimelineEvent) =>
    selectEventRectangle(draggingTimelineEvent, selectEventTopLeft)
);
