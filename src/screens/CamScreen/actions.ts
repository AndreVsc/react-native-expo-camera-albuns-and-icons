// actions.ts

import { Dispatch, SetStateAction } from 'react';
import { CameraType, FlashMode, CameraMode } from 'expo-camera';

// Toggle the camera facing direction
export const toggleCameraFacing = (setFacing: Dispatch<SetStateAction<CameraType>>) => () => {
  setFacing(prevFacing => (prevFacing === 'back' ? 'front' : 'back'));
};

// Set camera mode to picture and turn off flash
export const toggleCameraModePicture = (setCameraMode: Dispatch<SetStateAction<CameraMode>>, setFlash: Dispatch<SetStateAction<FlashMode>>) => () => {
  setCameraMode('picture');
  setFlash('off');
};  

// Set camera mode to video
export const toggleCameraModeVideo = (setCameraMode: Dispatch<SetStateAction<CameraMode>>) => () => {
  setCameraMode('video');
};

// Toggle flash mode
export const toggleFlash = (setFlash: Dispatch<SetStateAction<FlashMode>>) => () => {
  setFlash(prevFlash => (prevFlash === 'off' ? 'on' : 'off'));
};

// Delete photo (requires setPhoto as argument)
export const deletePhoto = (setPhoto: Dispatch<SetStateAction<string | undefined>>) => () => {
  setPhoto(undefined);
}

// Save photo to gallery (requires setPhoto and setGallery as arguments)
export const savePhoto = (photo: string | undefined, setPhoto: Dispatch<SetStateAction<string | undefined>>, setGallery: Dispatch<SetStateAction<string[]>>) => () => {
  if (photo) {
    setGallery(prevGallery => [...prevGallery, photo]);
    setPhoto(undefined);
  }
}
