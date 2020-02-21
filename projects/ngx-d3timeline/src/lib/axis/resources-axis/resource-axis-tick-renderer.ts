import { BandScale } from '../../scale-types';
import { TickRenderer } from '../tick-renderer';
import { Orientation } from '../../orientation';
import { OptionsService } from '../../options.service';
import { TimelineView } from '../../view/timeline-view';

export class ResourceAxisTickRenderer implements TickRenderer {
  constructor(
    private scale: BandScale,
    private orientation: Orientation,
    private optionsService: OptionsService,
    private timelineView: TimelineView
  ) {}

  getTickValues(): string[] {
    return this.scale.domain();
  }

  getLabel(tick: any): string {
    return tick;
  }

  getTransform(tick: any): string {
    const axisOffset = this.getBandMidPoint(tick);
    return this.optionsService.getTranslation(
      axisOffset,
      this.orientation === Orientation.Horizontal ? 0 : -10,
      this.orientation === Orientation.Horizontal ? -10 : 0,
      this.orientation,
      this.timelineView
    );
  }

  getTextAnchor(): string {
    return this.orientation === Orientation.Horizontal ? 'middle' : 'end';
  }

  private getBandMidPoint(tick: string): number {
    return this.scale(tick) + this.scale.bandwidth() / 2;
  }
}
