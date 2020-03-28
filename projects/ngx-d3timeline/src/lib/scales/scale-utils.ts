import { BandScale, InverseBandScale } from './scale-types';

export function getInverseBandScale(scale: BandScale): InverseBandScale {
  const domain = scale.domain();
  const paddingOuter = scale(domain[0]);
  const eachBand = scale.step();
  return (value: number) => {
    const index = Math.floor((value - paddingOuter) / eachBand);
    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  };
}
