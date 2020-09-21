export interface Student {
  id: string;
  regid: string;
  name: string;
  email: string;
  marks: Marks[];
}
export interface Marks {
  subject: string;
  score: number;
}
