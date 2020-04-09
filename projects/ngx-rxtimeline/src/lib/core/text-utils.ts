const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

export function getTextWidth(
  text: string,
  fontFace: string,
  fontSize: number
): number {
  context.font = `${fontSize}px ${fontFace}`;
  return context.measureText(text).width;
}
