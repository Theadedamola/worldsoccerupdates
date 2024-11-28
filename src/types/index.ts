export interface User {
  username: string;
  isAdmin: boolean;
  password?: string;
  createdAt: string;
}

export interface Nominee {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Vote {
  category: string;
  nomineeId: string;
  username: string;
  timestamp: string;
} 