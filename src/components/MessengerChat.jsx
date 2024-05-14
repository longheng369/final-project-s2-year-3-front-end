'use client';
import React, { Component } from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const MessengerChat = () => {
  const proxyUrl = "http://localhost:8000/api/proxy";
  const facebookUrl = `https://www.facebook.com/plugins/customer_chat/SDK/?app_id=427377029894331&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df8b66dc9e83f24509%26domain%3Dlocalhost%26is_canvas%3Dfalse%26origin%3Dhttp%253A%252F%252Flocalhost%253A5173%252Ff3a9d69eda4a81955%26relation%3Dparent.parent&container_width=1077&current_url=http%3A%2F%2Flocalhost%3A5173%2F&event_name=chat_plugin_sdk_dialog_iframe_create&is_loaded_by_facade=true&loading_time=0&locale=en_US&log_id=4f5865de-a82c-4786-91fb-b67ac265db5b&minimized=true&page_id=141916528997399&request_time=1715701680646&sdk=joey&suppress_http_code=1`;

  return (
    <FacebookProvider appId="427377029894331" chatSupport>
      <CustomChat pageId="141916528997399" minimized={"true"} />
    </FacebookProvider>
  );
};

export default MessengerChat;
