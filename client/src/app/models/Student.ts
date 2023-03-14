import { PresenceStateEnum } from './PresenStateEnum';

export type Student = {
  id: string;
  presenceState?: PresenceStateEnum;
  absenceComment?: string;
  delay?: number; // In minutes
  signatureTimestamp?: number | null;
  signature?: string | null;
  comment?: string;
  dateCreated: string;
  dateUpdated: string;
  FIRSTNAME: string;
  LASTNAME: string;
};
