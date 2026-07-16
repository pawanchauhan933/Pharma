"use strict";
const electron = require("electron");
const IPC_CHANNELS = {
  MEDICINE_CREATE: "medicine:create",
  MEDICINE_LIST: "medicine:list",
  MEDICINE_GET_BY_ID: "medicine:getById",
  MEDICINE_UPDATE: "medicine:update",
  MEDICINE_DELETE: "medicine:delete",
  MANUFACTURER_CREATE: "manufacturer:create",
  MANUFACTURER_LIST: "manufacturer:list",
  MANUFACTURER_GET_BY_ID: "manufacturer:getById",
  MANUFACTURER_UPDATE: "manufacturer:update",
  MANUFACTURER_DELETE: "manufacturer:delete"
};
electron.contextBridge.exposeInMainWorld("api", {
  medicine: {
    create: (data) => electron.ipcRenderer.invoke(IPC_CHANNELS.MEDICINE_CREATE, data),
    getAll: () => electron.ipcRenderer.invoke(IPC_CHANNELS.MEDICINE_LIST),
    getById: (id) => electron.ipcRenderer.invoke(IPC_CHANNELS.MEDICINE_GET_BY_ID, id),
    update: (id, data) => electron.ipcRenderer.invoke(IPC_CHANNELS.MEDICINE_UPDATE, id, data),
    delete: (id) => electron.ipcRenderer.invoke(IPC_CHANNELS.MEDICINE_DELETE, id)
  },
  manufacturer: {
    create: (data) => electron.ipcRenderer.invoke(IPC_CHANNELS.MANUFACTURER_CREATE, data),
    getAll: () => electron.ipcRenderer.invoke(IPC_CHANNELS.MANUFACTURER_LIST),
    getById: (id) => electron.ipcRenderer.invoke(IPC_CHANNELS.MANUFACTURER_GET_BY_ID, id),
    update: (id, data) => electron.ipcRenderer.invoke(IPC_CHANNELS.MANUFACTURER_UPDATE, id, data),
    delete: (id) => electron.ipcRenderer.invoke(IPC_CHANNELS.MANUFACTURER_DELETE, id)
  }
});
console.log("✅ window.api exposed");
