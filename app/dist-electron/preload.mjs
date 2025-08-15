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
    return electron.ipcRenderer.invoke("sendRequest", method, url, payload);
  },
  modifyUserConfig: (action, data) => {
    return electron.ipcRenderer.invoke("modifyUserConfig", action, data);
  },
  needUpdates: () => {
    return electron.ipcRenderer.invoke("needUpdates");
  },
  update: () => {
    return electron.ipcRenderer.invoke("update");
  },
  launch: () => {
    return electron.ipcRenderer.invoke("launch");
  }
  // You can expose other APTs you need here.
  // ...
});
