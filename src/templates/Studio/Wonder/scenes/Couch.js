import { Vector3 } from 'babylonjs';

const cameraRotationVectors = [
  {
    frame: 0,
    value: new Vector3(50, 30, -120),
  },
];

const cameraTargetVectors = [
  {
    frame: 0,
    value: new Vector3(-10, 0, 100),
  },
];

const filename = 'sofaisland.glb';

const lightDirectionVectors = [
  {
    frame: 0,
    value: new Vector3(1, -0.5, -0.8),
  },
  {
    frame: 3000,
    value: new Vector3(-1, -0.5, -0.8),
  },
];

const lightPositionVectors = [
  {
    frame: 0,
    value: new Vector3(-50, 0, 60),
  },
  {
    frame: 750,
    value: new Vector3(-40, 8, 60),
  },
  {
    frame: 1500,
    value: new Vector3(0, 45, 60),
  },
  {
    frame: 2250,
    value: new Vector3(40, 8, 60),
  },
  {
    frame: 3000,
    value: new Vector3(50, 0, 60),
  },
];

const modelVectors = [
  {
    frame: 0,
    value: new Vector3(0, 0, 0),
  },
];

const mirrors = [
  {
    width: 48,
    height: 48,
    position: new Vector3(3, 26, 43.2),
    rotation: new Vector3(0, 0, 0),
  },
];

export default [
  cameraRotationVectors,
  cameraTargetVectors,
  filename,
  lightDirectionVectors,
  lightPositionVectors,
  modelVectors,
  mirrors,
];
