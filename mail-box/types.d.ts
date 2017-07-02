declare interface IMail {
  id: string;
  from: string;
  to: string;
  title: string;
  content: string;
  createdAt: Date;
}