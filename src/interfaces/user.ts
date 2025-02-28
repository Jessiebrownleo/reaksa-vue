export interface UserRequest {
    username: string;
    fullName: string;
    gender: string;
    pin?: string;
    email?: string;
    password?: string;
    profileImage?: string;
    phoneNumber?: string;
    cityOrProvince?: string;
    khanOrDistrict?: string;
    sangkatOrCommune?: string;
    employeeType?: string;
    companyName?: string;
    mainSourceOfIncome?: string;
    monthlyIncomeRange?: number;
    studentCardId?: string;
    roles?: string[];
}

export interface UserResponse {
    id: string;
    username: string;
    fullName: string;
    gender: string;
    email?: string;
    phoneNumber?: string;
    profileImage?: string;
    cityOrProvince?: string;
    khanOrDistrict?: string;
    sangkatOrCommune?: string;
    employeeType?: string;
    companyName?: string;
    mainSourceOfIncome?: string;
    monthlyIncomeRange?: string;
    studentCardId?: string;
    roles?: string[];
}

export interface UserUpdateRequest {
    fullName?: string;
    gender?: string;
    profileImage?: string;
    phoneNumber?: string;
    cityOrProvince?: string;
    khanOrDistrict?: string;
    sangkatOrCommune?: string;
    employeeType?: string;
    companyName?: string;
    mainSourceOfIncome?: string;
    monthlyIncomeRange?: number;
    studentCardId?: string;
}