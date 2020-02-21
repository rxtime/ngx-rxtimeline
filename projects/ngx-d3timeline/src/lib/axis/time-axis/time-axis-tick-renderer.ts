import { TimeScale } from '../../scale-types';
import { TickRenderer } from '../tick-renderer';
import { Orientation } from '../../orientation';
import { TimelineView } from '../../view/timeline-view';
import { OptionsService } from '../../options.service';

export class TimeAxisTickRenderer implements TickRenderer {
  constructor(
    private scale: TimeScale,
    private orientation: Orientation,
    private optionsService: OptionsService,
    private timelineView: TimelineView
  ) {}

  getTickValues(): Date[] {
    return this.scale.ticks();
  }

  getLabel(tick: any): string {
    return this.scale.tickFormat()(tick);
  }

  getTransform(tick: any): string {
    const axisOffset = this.scale(tick);
    return this.optionsService.getTranslation(
      axisOffset,
      0,
      0,
      this.orientation,
      this.timelineView
    );
  }

  getTextAnchor(): string {
    return 'end';
  }
}
