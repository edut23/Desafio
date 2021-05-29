import React, { useCallback } from 'react';
import ImageUploader from 'react-images-upload';
import Compress from 'browser-image-compression';
import { usePic } from '../../hooks/pic'

interface ImageUploadProps {
    //sendMessage: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ /*sendMessage*/ }) => {
    const { signPic } = usePic()
  const getBase64 = (file: File, options: any): any => {
    return new Promise((resolve, reject) => {
      Compress(file, options).then((compressedBlob) => {
        const convertedBlobFile = new File([compressedBlob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        const reader = new FileReader();

        reader.readAsDataURL(convertedBlobFile);
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    });
  };

  const handleChange = useCallback(
    async (files: File[], pictures: any[]) => {
      const options = {
        maxSizeMB: 1,
        useWebWorker: true,
      };

      getBase64(files[0], options).then((result: any) => {
        // eslint-disable-next-line no-param-reassign
        pictures[0] = result;
        //signPic(pictures[0]);
      });

      

      //sendMessage(pictures[0]);
      console.log("foi", pictures[0])
      
    },
    [/*sendMessage*/],
  );

  const containerStyle = {
    background: '#fff',
    width: 300,
    margin: 0,
    padding: 0,
    right: 20,
    display: 'flex',
    position: 'static',
    boxShadow: '0px 0px 0px #FFFFFF',
    border:'solid 2px',
  };

  const buttonStyle = {
    background: 'rgba(0, 0, 0, 1)',
    fontSize: 24,
    marginTop: 6,
    border:'solid 2px',
  };

  return (
    <ImageUploader
      withIcon={false}
      buttonText="Logo do time"
      onChange={handleChange}
      imgExtension={['.jpg', '.png']}
      maxFileSize={5242880}
      withPreview={true}
      withLabel={false}
      singleImage
      fileContainerStyle={containerStyle}
      buttonStyles={buttonStyle}
    />
  );
};

export default ImageUpload;