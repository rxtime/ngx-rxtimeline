import { TimelineEvent } from './timeline-event';

export const mockData: TimelineEvent[] = [
  {
    id: 1,
    start: new Date('2017-09-23T08:45:00'),
    finish: new Date('2017-09-23T11:47:38'),
    type: 'Driving',
    series: 'Series 1'
  },
  {
    id: 2,
    start: new Date('2017-09-22T04:09:21'),
    finish: new Date('2017-09-22T08:39:21'),
    type: 'Driving',
    series: 'Series 1'
  },
  {
    id: 3,
    start: new Date('2017-09-22T08:39:21'),
    finish: new Date('2017-09-22T09:24:21'),
    type: 'DriveBreak',
    series: 'Series 1',
    sequence: 1
  },
  {
    id: 13,
    start: new Date('2017-09-22T10:00:00'),
    finish: new Date('2017-09-22T10:08:31'),
    type: 'Driving',
    series: 'Series 2'
  },
  {
    id: 14,
    start: new Date('2017-09-22T09:15:00'),
    finish: new Date('2017-09-22T09:16:16'),
    type: 'Waiting',
    series: 'Series 2',
    sequence: 6
  },
  {
    id: 15,
    start: new Date('2017-09-22T13:45:00'),
    finish: new Date('2017-09-22T14:52:27'),
    type: 'Driving',
    series: 'Series 2'
  },
  {
    id: 41,
    start: new Date('2017-09-23T08:45:00'),
    finish: new Date('2017-09-23T11:47:38'),
    type: 'Driving',
    series: 'Series 3'
  },
  {
    id: 42,
    start: new Date('2017-09-22T04:09:21'),
    finish: new Date('2017-09-22T08:39:21'),
    type: 'Driving',
    series: 'Series 3'
  },
  {
    id: 43,
    start: new Date('2017-09-22T08:39:21'),
    finish: new Date('2017-09-22T09:24:21'),
    type: 'DriveBreak',
    series: 'Series 3',
    sequence: 1
  }
];
