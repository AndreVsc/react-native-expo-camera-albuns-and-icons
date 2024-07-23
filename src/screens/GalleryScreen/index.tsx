import React, { useState } from 'react';
import { Button, Text, SafeAreaView, ScrollView, StyleSheet, Image, View, Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { usePicture } from '../../contexts/pictureContext'; // Atualize o caminho conforme necessário

type AlbumEntryProps = {
  album: MediaLibrary.Album;
};

type AssetImageProps = {
  asset: MediaLibrary.Asset;
};

export default function GalleryScreen() {
  const [albums, setAlbums] = useState<MediaLibrary.Album[] | null>(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    if (permissionResponse?.status !== 'granted') {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={getAlbums} title="Refresh Albums" />
      <ScrollView>
        {albums && albums.length > 0 ? (
          albums.map((album) => (
            <AlbumEntry key={album.id} album={album} />
          ))
        ) : (
          <Text>No albums available. Click "Refresh Albums" to load.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function AlbumEntry({ album }: AlbumEntryProps) {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);

  async function getAlbumAssets() {
    const albumAssets = await MediaLibrary.getAssetsAsync({ album });
    setAssets(albumAssets.assets);
  }

  async function saveToAlbum(uri: string, album: string) {
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync(album, asset);
  }

  React.useEffect(() => {
    getAlbumAssets();
  }, [album]);

  return (
    <View style={styles.albumContainer}>
      <Text>
        {album.title} - {album.assetCount ?? 'no'} assets
      </Text>
      <View style={styles.albumAssetsContainer}>
        {assets.map((asset) => (
          <AssetImage key={asset.id} asset={asset} />
        ))}
      </View>
    </View>
  );
}

function AssetImage({ asset }: AssetImageProps) {
  const [uri, setUri] = useState<string | null>(null);

  React.useEffect(() => {
    async function getAssetUri() {
      const assetInfo: MediaLibrary.AssetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
      setUri(assetInfo.localUri || assetInfo.uri);
    }
    getAssetUri();
  }, [asset]);

  if (!uri) {
    return null;
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: 50, height: 50 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
    ...Platform.select({
      android: {
        paddingTop: 40,
      },
    }),
  },
  albumContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 4,
  },
  albumAssetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
