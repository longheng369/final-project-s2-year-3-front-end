'use client'
import { FacebookProvider, CustomChat } from 'react-facebook';

const MessengerChat = () => {
  return (
    <FacebookProvider appId="427377029894331" chatSupport>
      <CustomChat pageId="141916528997399" minimized={"true"} />
    </FacebookProvider>
  );
};

export default MessengerChat;
