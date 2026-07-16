import { ipcMain } from "electron";

import { IPC_CHANNELS } from "../../shared/constants/ipc";
import { ManufacturerService } from "./manufacturer.service";

const manufacturerService = new ManufacturerService();

export function registerManufacturerIpc() {
  ipcMain.handle(IPC_CHANNELS.MANUFACTURER_CREATE, (_, data) => {
    return manufacturerService.create(data);
  });

  ipcMain.handle(IPC_CHANNELS.MANUFACTURER_LIST, () => {
    return manufacturerService.getAll();
  });

  ipcMain.handle(IPC_CHANNELS.MANUFACTURER_GET_BY_ID, (_, id: number) => {
    return manufacturerService.getById(id);
  });

  ipcMain.handle(
    IPC_CHANNELS.MANUFACTURER_UPDATE,
    (_, id: number, data) => {
      manufacturerService.update(id, data);
      return true;
    },
  );

  ipcMain.handle(IPC_CHANNELS.MANUFACTURER_DELETE, (_, id: number) => {
    manufacturerService.delete(id);
    return true;
  });
}