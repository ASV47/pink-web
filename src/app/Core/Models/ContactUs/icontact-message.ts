export interface IContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: number;
  status: number;
  assignedToUserId: string;
  createdAt: string;
  repliedAt: string | null;
  adminNotes: string | null;
  difinitionId: string | null;
  genralId: number | null;
}
