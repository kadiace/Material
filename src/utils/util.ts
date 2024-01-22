import { Position } from 'utils/type';

export const calculateDistance = (pos1: Position, pos2: Position) => {
  return Math.hypot(pos1[0] - pos2[0], pos1[1] - pos2[1]);
};
export const getLinearScale = (
  distance: number,
  effectDistance: number,
  minScale: number,
  maxScale: number,
) => {
  return (distance / effectDistance) * (maxScale - minScale) + minScale;
};
export const getQuadraticScale = (
  distance: number,
  effectDistance: number,
  minScale: number,
  maxScale: number,
) => {
  return (distance / effectDistance) ** 2 * (maxScale - minScale) + minScale;
};
export const getRootScale = (
  distance: number,
  effectDistance: number,
  minScale: number,
  maxScale: number,
) => {
  return (
    Math.sqrt(distance / effectDistance) * (maxScale - minScale) + minScale
  );
};
export const getExponentialScale = (
  distance: number,
  effectDistance: number,
  minScale: number,
  maxScale: number,
  exponent: number,
) => {
  return (
    ((exponent ** (distance / effectDistance) - 1) * (maxScale - minScale)) /
      (exponent - 1) +
    minScale
  );
};
export const getLogScale = (
  distance: number,
  effectDistance: number,
  minScale: number,
  maxScale: number,
  base: number,
) => {
  return (
    (Math.log(1 + (base - 1) * (distance / effectDistance)) / Math.log(base)) *
      (maxScale - minScale) +
    minScale
  );
};
