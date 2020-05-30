import { DropEvent } from "react-dropzone";
import { IMemUpload } from "../client.types";

export interface IPropsUploadZone {
  setMem: (some: any) => void;
  handleUpload: <T extends File>(acceptedFiles: T[], rejectedFiles: T[], event: DropEvent) => void;
  handleUploadFromURL: (url: string) => void;
}

export interface IPropsNewMemCard {
  mem: IMemUpload;
  handleOnNameChange: (e: any) => void;
  handleOnTagChange: (e: any, num: string) => void;
  isDisabled: () => boolean;
  handleSubmit: () => void;
  setMem: (some: any) => void;
}
