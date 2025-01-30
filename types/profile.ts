export interface Certificate {
  id: string;
  name: string;
}

export interface ProfileData {
  fullName: string;
  profession: string;
  email: string;
  phoneNumber: string;
  workRegions: string[];
  isAvailable: boolean;
  certificates: Certificate[];
  workExperience: string;
  profileImage?: string;
}
