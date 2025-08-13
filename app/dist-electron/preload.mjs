"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  },
  sendRequest: (method, url, payload) => {
    electron.ipcRenderer.invoke("sendRequest", method, url, payload);
  },
  modifyUserConfig: (action, data) => {
    electron.ipcRenderer.invoke("modifyUserConfig", action, data);
  },
  update: () => {
    electron.ipcRenderer.invoke("update");
  }
  // You can expose other APTs you need here.
  // ...
});
