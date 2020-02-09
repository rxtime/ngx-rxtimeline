import { TimelineEvent } from 'ngx-d3timeline';

export const data: TimelineEvent[] = [
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
    id: 4,
    start: new Date('2017-09-23T08:00:00'),
    finish: new Date('2017-09-23T08:45:00'),
    type: 'Handling',
    series: 'Series 1',
    sequence: 6
  },
  {
    id: 5,
    start: new Date('2017-09-22T09:24:21'),
    finish: new Date('2017-09-22T10:29:16'),
    type: 'Driving',
    series: 'Series 1'
  },
  {
    id: 6,
    start: new Date('2017-09-22T11:14:16'),
    finish: new Date('2017-09-22T14:39:21'),
    type: 'Driving',
    series: 'Series 1'
  },
  {
    id: 7,
    start: new Date('2017-09-23T06:09:21'),
    finish: new Date('2017-09-23T06:54:21'),
    type: 'DriveBreak',
    series: 'Series 1',
    sequence: 4
  },
  {
    id: 8,
    start: new Date('2017-09-23T01:39:21'),
    finish: new Date('2017-09-23T06:09:21'),
    type: 'Driving',
    series: 'Series 1'
  },
  {
    id: 9,
    start: new Date('2017-09-22T14:39:21'),
    finish: new Date('2017-09-23T01:39:21'),
    type: 'Resting',
    series: 'Series 1',
    sequence: 3
  },
  {
    id: 10,
    start: new Date('2017-09-23T07:15:00'),
    finish: new Date('2017-09-23T08:00:00'),
    type: 'DriveBreak',
    series: 'Series 1',
    sequence: 5
  },
  {
    id: 11,
    start: new Date('2017-09-22T10:29:16'),
    finish: new Date('2017-09-22T11:14:16'),
    type: 'Handling',
    series: 'Series 1',
    sequence: 2
  },
  {
    id: 12,
    start: new Date('2017-09-23T06:54:21'),
    finish: new Date('2017-09-23T07:15:00'),
    type: 'Driving',
    series: 'Series 1'
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
    id: 16,
    start: new Date('2017-09-22T08:31:16'),
    finish: new Date('2017-09-22T09:15:00'),
    type: 'Handling',
    series: 'Series 2',
    sequence: 5
  },
  {
    id: 17,
    start: new Date('2017-09-23T07:59:59'),
    finish: new Date('2017-09-23T08:45:00'),
    type: 'Handling',
    series: 'Series 2',
    sequence: 19
  },
  {
    id: 18,
    start: new Date('2017-09-22T16:24:44'),
    finish: new Date('2017-09-22T16:58:43'),
    type: 'Driving',
    series: 'Series 2'
  },
  {
    id: 19,
    start: new Date('2017-09-22T07:45:00'),
    finish: new Date('2017-09-22T07:46:16'),
    type: 'Waiting',
    series: 'Series 2',
    sequence: 2
  },
  {
    id: 20,
    start: new Date('2017-09-22T15:41:01'),
    finish: new Date('2017-09-22T16:24:44'),
    type: 'Handling',
    series: 'Series 2',
    sequence: 14
  },
  {
    id: 21,
    start: new Date('2017-09-22T15:39:44'),
    finish: new Date('2017-09-22T15:41:01'),
    type: 'Waiting',
    series: 'Series 2',
    sequence: 13
  },
  {
    id: 22,
    start: new Date('2017-09-22T15:37:27'),
    finish: new Date('2017-09-22T15:39:44'),
    type: 'Driving',
    series: 'Series 2'
  },
  {
    id: 23,
    start: new Date('2017-09-22T14:53:44'),
    finish: new Date('2017-09-22T15:37:27'),
    type: 'Handling',
    series: 'Series 2',
    sequence: 12
  },
  {
    id: 24,
    start: new Date('2017-09-22T16:58:43'),
    finish: new Date('2017-09-22T17:00:00'),
    type: 'Waiting',
    series: 'Series 2',
    sequence: 15
  },
  {
    id: 25,
    start: new Date('2017-09-22T14:52:27'),
    finish: new Date('2017-09-22T14:53:44'),
    type: 'Waiting',
    series: 'Series 2',
    sequence: 11
  },
  {
    id: 26,
    start: new Date('2017-09-22T07:00:00'),
    finish: new Date('2017-09-22T07:45:00'),
    type: 'Handling',
    series: 'Series 2',
    sequence: 1
  },
  {
    id: 27,
    start: new Date('2017-09-22T13:00:00'),
    finish: new Date('2017-09-22T13:45:00'),
    type: 'DriveBreak',
    series: 'Series 2',
    sequence: 10
  },
  {
    id: 28,
    start: new Date('2017-09-22T10:53:31'),
    finish: new Date('2017-09-22T13:00:00'),
    type: 'Driving',
    series: 'Series 2'
  },
  {
    id: 29,
    start: new Date('2017-09-22T18:20:24'),
    finish: new Date('2017-09-23T05:20:24'),
    type: 'Resting',
    series: 'Series 2',
    sequence: 17
  },
  {
    id: 30,
    start: new Date('2017-09-22T10:09:47'),
    finish: new Date('2017-09-22T10:53:31'),
    type: 'Handling',
    series: 'Series 2',
    sequence: 9
  },
  {
    id: 31,
    start: new Date('2017-09-23T12:03:57'),
    finish: new Date('2017-09-23T12:48:57'),
    type: 'Handling',
    series: 'Series 2',
    sequence: 20
  },
  {
    id: 32,
    start: new Date('2017-09-23T08:45:00'),
    finish: new Date('2017-09-23T12:03:57'),
    type: 'Driving',
    series: 'Series 2'
  },
  {
    id: 33,
    start: new Date('2017-09-22T10:08:31'),
    finish: new Date('2017-09-22T10:09:47'),
    type: 'Waiting',
    series: 'Series 2',
    sequence: 8
  },
  {
    id: 34,
    start: new Date('2017-09-22T09:16:16'),
    finish: new Date('2017-09-22T10:00:00'),
    type: 'Handling',
    series: 'Series 2',
    sequence: 7
  },
  {
    id: 35,
    start: new Date('2017-09-23T05:20:24'),
    finish: new Date('2017-09-23T07:59:59'),
    type: 'Waiting',
    series: 'Series 2',
    sequence: 18
  },
  {
    id: 36,
    start: new Date('2017-09-22T17:00:00'),
    finish: new Date('2017-09-22T17:43:43'),
    type: 'Handling',
    series: 'Series 2',
    sequence: 16
  },
  {
    id: 37,
    start: new Date('2017-09-22T17:43:43'),
    finish: new Date('2017-09-22T18:20:24'),
    type: 'Driving',
    series: 'Series 2'
  },
  {
    id: 39,
    start: new Date('2017-09-22T08:30:00'),
    finish: new Date('2017-09-22T08:31:16'),
    type: 'Waiting',
    series: 'Series 2',
    sequence: 4
  },
  {
    id: 40,
    start: new Date('2017-09-22T07:46:16'),
    finish: new Date('2017-09-22T08:30:00'),
    type: 'Handling',
    series: 'Series 2',
    sequence: 3
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
  },
  {
    id: 44,
    start: new Date('2017-09-23T08:00:00'),
    finish: new Date('2017-09-23T08:45:00'),
    type: 'Handling',
    series: 'Series 3',
    sequence: 6
  },
  {
    id: 45,
    start: new Date('2017-09-22T09:24:21'),
    finish: new Date('2017-09-22T10:29:16'),
    type: 'Driving',
    series: 'Series 3'
  },
  {
    id: 46,
    start: new Date('2017-09-22T11:14:16'),
    finish: new Date('2017-09-22T14:39:21'),
    type: 'Driving',
    series: 'Series 3'
  },
  {
    id: 47,
    start: new Date('2017-09-23T06:09:21'),
    finish: new Date('2017-09-23T06:54:21'),
    type: 'DriveBreak',
    series: 'Series 3',
    sequence: 4
  },
  {
    id: 48,
    start: new Date('2017-09-23T01:39:21'),
    finish: new Date('2017-09-23T06:09:21'),
    type: 'Driving',
    series: 'Series 3'
  },
  {
    id: 49,
    start: new Date('2017-09-22T14:39:21'),
    finish: new Date('2017-09-23T01:39:21'),
    type: 'Resting',
    series: 'Series 3',
    sequence: 3
  },
  {
    id: 50,
    start: new Date('2017-09-23T07:15:00'),
    finish: new Date('2017-09-23T08:00:00'),
    type: 'DriveBreak',
    series: 'Series 3',
    sequence: 5
  },
  {
    id: 51,
    start: new Date('2017-09-22T10:29:16'),
    finish: new Date('2017-09-22T11:14:16'),
    type: 'Handling',
    series: 'Series 3',
    sequence: 2
  },
  {
    id: 52,
    start: new Date('2017-09-23T06:54:21'),
    finish: new Date('2017-09-23T07:15:00'),
    type: 'Driving',
    series: 'Series 3'
  }
];
