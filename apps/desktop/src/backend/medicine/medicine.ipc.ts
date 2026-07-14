import { ipcMain } from "electron";
import { IPC_CHANNELS } from "../../shared/constants/ipc";
import { MedicineService } from "./medicine.service";

const medicineService = new MedicineService();

export function registerMedicineIpc() {
  ipcMain.handle(IPC_CHANNELS.MEDICINE_CREATE, (_, data) => {
    return medicineService.create(data);
  });

  ipcMain.handle(IPC_CHANNELS.MEDICINE_LIST, () => {
    return medicineService.getAll();
  });

  ipcMain.handle(IPC_CHANNELS.MEDICINE_GET_BY_ID, (_, id: number) =>
    medicineService.getById(id),
  );

  ipcMain.handle(IPC_CHANNELS.MEDICINE_UPDATE, (_, id: number, data) => {
    medicineService.update(id, data);
    return true;
  });
  ipcMain.handle(IPC_CHANNELS.MEDICINE_DELETE, (_, id: number) => {
    medicineService.deleteMedicine(id);
  });
}
