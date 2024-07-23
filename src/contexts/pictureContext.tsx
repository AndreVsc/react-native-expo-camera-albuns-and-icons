// pictureContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

type PictureContextType = {
  photo: string | undefined;
  setPhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const PictureContext = createContext<PictureContextType | undefined>(undefined);

export const PictureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  return (
    <PictureContext.Provider value={{ photo, setPhoto }}>
      {children}
    </PictureContext.Provider>
  );
};

export const usePicture = () => {
  const context = useContext(PictureContext);
  if (!context) {
    throw new Error('usePicture must be used within a PictureProvider');
  }
  return context;
};
