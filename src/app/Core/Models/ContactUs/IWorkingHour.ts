export interface IWorkingHour {
  id: number;
  contactInfoId: number;
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  isActive: boolean;
  difinitionId: string | null;
  genralId: number | null;
}
