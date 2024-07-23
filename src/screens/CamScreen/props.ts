// types.ts
import { CameraType, FlashMode, CameraMode } from 'expo-camera';

export interface CameraProps {
  setCameraMode: (mode: CameraMode) => void;
  setFlash: (flash: FlashMode) => void;
  setFacing: (facing: CameraType) => void;
}
