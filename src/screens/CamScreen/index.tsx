import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Button, Modal, Image } from 'react-native';

import { CameraView, CameraType, useCameraPermissions, FlashMode, CameraMode, ImageType } from 'expo-camera';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

import { usePicture } from '../../contexts/pictureContext'; 
import { styles } from './styles';

interface options{
  quality:number;
  imageType:ImageType;
}

export default function CamScreen() {
  const [flash, setFlash] = useState<FlashMode>('off');
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraMode, setCameraMode] = useState<CameraMode>('picture');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();
  const { photo, setPhoto } = usePicture(); 
  const camRef = useRef<CameraView>(null);

  const options:options = {quality:1 , imageType:'png'} ;

  async function takePicture() {
    if (camRef.current) {
      const data = await camRef.current.takePictureAsync((options));
      setPhoto(data?.uri); 
      setModalIsOpen(true);
    }
  }

  async function savePicture() {
    if (photo) {
      await MediaLibrary.saveToLibraryAsync(photo).then(() => {
        setPhoto(undefined); 
        setModalIsOpen(false); 
      });
    }
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const renderModal = () => (
    <Modal animationType='slide' transparent={false} visible={modalIsOpen}>
      <View style={{ flex: 1, justifyContent: 'flex-start', margin: 20 }}>
        <Image style={{ width: '100%', height: 650, borderRadius: 20 }} source={{ uri: photo }} />
      </View>
      <View style={styles.photoButtons}>
        <TouchableOpacity onPress={() => setModalIsOpen(false)}>
          <MaterialIcons name="restore-from-trash" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={savePicture}>
          <MaterialIcons name="save" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} flash={flash} ref={camRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}>
            <MaterialIcons name="flip-camera-android" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={takePicture}
            onLongPress={() => setCameraMode('video')}
            onPressOut={() => setCameraMode('picture')}
          >
            {cameraMode === 'picture' ? (
              <MaterialIcons name="add-a-photo" size={45} color="white" />
            ) : (
              <MaterialIcons name="pause-circle-outline" size={75} color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setFlash(flash === 'on' ? 'off' : 'on')}>
            {flash === 'on' ? (
              <Ionicons name="flash" size={24} color="white" />
            ) : (
              <Ionicons name="flash-off" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </CameraView>
      {modalIsOpen && renderModal()}
    </View>
  );
}
