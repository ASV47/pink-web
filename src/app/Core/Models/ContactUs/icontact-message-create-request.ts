export interface IContactMessageCreateRequest {
  name: string;
  email: string;
  phone: string;
  message: string;

  subject: string;
  source: number;
  status: number;
  assignedToUserId: string | null;
}
