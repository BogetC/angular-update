import { PresenceStateEnum } from '../PresenStateEnum';

export type UpdateStudentRequest = {
  signature?: string;
  presenceState?: PresenceStateEnum;
  studentComment?: string;
  absenceComment?: string;
  delay?: number;
};
