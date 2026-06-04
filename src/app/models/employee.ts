export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  startDate: Date;
  employmentType: 'Full-time' | 'Part-time' | 'Contract';
  salary?: number;
  manager?: string;
  location: string;
  status: 'Active' | 'Inactive';
}

export interface Department {
  id: string;
  name: string;
}
