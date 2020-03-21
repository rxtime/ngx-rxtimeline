const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

export function getTextWidth(
  text: string,
  fontSize: number,
  fontFace = 'Times New Roman'
): number {
  context.font = `${fontSize}px ${fontFace}`;
  return context.measureText(text).width;
}
