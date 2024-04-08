import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const AlanAssistant = () => {
  useEffect(() => {
    const alanBtnInstance = alanBtn({ 
      key: 'ba14937afc159d2f072da9b1a89704c22e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'go:back') {
          // Call client code that will react to the received command
        }
      },
    });

    return () => {
      alanBtnInstance.remove();
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default AlanAssistant;
