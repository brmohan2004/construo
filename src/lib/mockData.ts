export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  services: string[];
  approvalStatus: {
    pending: number;
    approved: number;
    rejected: number;
  };
  projects: {
    id: string;
    name: string;
    status: 'active' | 'completed' | 'pending';
    progress: number;
  }[];
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    services: ['Interior Design', 'Civil Construction'],
    approvalStatus: {
      pending: 2,
      approved: 5,
      rejected: 1
    },
    projects: [
      {
        id: 'p1',
        name: 'Residential Complex',
        status: 'active',
        progress: 75
      },
      {
        id: 'p2',
        name: 'Office Renovation',
        status: 'pending',
        progress: 0
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    services: ['Electrical Work', 'Plumbing'],
    approvalStatus: {
      pending: 1,
      approved: 3,
      rejected: 0
    },
    projects: [
      {
        id: 'p3',
        name: 'Commercial Building',
        status: 'active',
        progress: 45
      }
    ]
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    services: ['All Services'],
    approvalStatus: {
      pending: 0,
      approved: 0,
      rejected: 0
    },
    projects: []
  }
];

export const validateLogin = (email: string, password: string): User | null => {
  const user = mockUsers.find(
    user => user.email === email && user.password === password
  );
  return user || null;
};

export const getUserData = (email: string): Omit<User, 'password'> | null => {
  const user = mockUsers.find(user => user.email === email);
  if (!user) return null;
  
  // Remove password from user data
  const { password, ...userData } = user;
  return userData;
}; 