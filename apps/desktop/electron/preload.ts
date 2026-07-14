import { contextBridge, ipcRenderer } from "electron";
import { IPC_CHANNELS } from "../src/shared/constants/ipc";
import type { CreateMedicineDto } from "../src/shared/types/medicine";

contextBridge.exposeInMainWorld("api", {
  medicine: {
    create: (data: CreateMedicineDto) =>
      ipcRenderer.invoke(IPC_CHANNELS.MEDICINE_CREATE, data),

    getAll: () => ipcRenderer.invoke(IPC_CHANNELS.MEDICINE_LIST),

    getById: (id: number) =>
      ipcRenderer.invoke(IPC_CHANNELS.MEDICINE_GET_BY_ID, id),

    update: (id: number, data: CreateMedicineDto) =>
      ipcRenderer.invoke(IPC_CHANNELS.MEDICINE_UPDATE, id, data),
    delete: (id: number) =>
      ipcRenderer.invoke(IPC_CHANNELS.MEDICINE_DELETE, id),
  },
});

console.log("✅ window.api exposed");
