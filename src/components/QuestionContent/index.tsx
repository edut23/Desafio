import React, { useCallback } from 'react';

import ReactAudioPlayer from 'react-audio-player';
import { FiDownload } from 'react-icons/fi';
import { Container, StyledVimeo, ImageContainer } from './styles';

interface ContentProps {
  type?: string;
  url?: string;
}

const QuestionContent: React.FC<ContentProps> = ({ type, url }) => {
  const showCurrentTime = useCallback((info: any) => { }, []);

  const handleEndVideo = useCallback((info: any) => { }, []);

  const handleProgressVideo = useCallback((info: any) => { }, []);

  const handleOpenImage = useCallback(() => {
    window.open(`${url}`);
  }, [url]);

  return (
    <Container>
      {type === 'video' && (
        <StyledVimeo
          video={url || ' '}
          onPause={(info) => showCurrentTime(info)}
          onEnd={(info) => handleEndVideo(info)}
          onTimeUpdate={(info) => handleProgressVideo(info)}
          start={0}
          style={{
            width: '60%',
          }}
          responsive
        />
      )}
      {type === 'audio' && (
        <>
          <ReactAudioPlayer src={url} controls volume={0.5} />
        </>
      )}
      {type === 'file' && (
        <a rel="noopener noreferrer" target="_blank" href={`https://${url}`}>
          <FiDownload size={30} />
          Baixar o arquivo
        </a>
      )}
      {type === 'image' && (
        <ImageContainer onClick={handleOpenImage} imageUrl={url} />
      )}
    </Container>
  );
};

export default QuestionContent;
