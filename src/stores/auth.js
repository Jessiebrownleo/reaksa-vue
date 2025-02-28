import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login, refreshToken, register } from '../api/auth';
import router from "../router";
import { getCurrentUser } from '../api/users';
export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const currentUser = ref(null);
    const isAuthenticated = ref(false);
    // Initialize function should be defined before it's returned
    function initialize() {
        const token = localStorage.getItem('token');
        const refreshTokenValue = localStorage.getItem('refreshToken');
        const userData = localStorage.getItem('userData');
        if (token && refreshTokenValue) {
            // Get userId from userData if available
            let userId = '';
            if (userData) {
                try {
                    const parsedUserData = JSON.parse(userData);
                    userId = parsedUserData.userId || parsedUserData.id || '';
                }
                catch (e) {
                    console.error('Error parsing userData:', e);
                }
            }
            user.value = {
                userId: userId, // Include userId to match the interface
                accessToken: token,
                refreshToken: refreshTokenValue
            };
            isAuthenticated.value = true;
        }
        if (userData) {
            try {
                currentUser.value = JSON.parse(userData);
            }
            catch (e) {
                console.error('Error parsing userData for currentUser:', e);
            }
        }
    }
    // fetchUserProfile function should be defined before it's returned
    async function fetchUserProfile() {
        try {
            const userData = await getCurrentUser();
            currentUser.value = userData;
            // Store user data in localStorage for persistence
            localStorage.setItem('userData', JSON.stringify(userData));
            // Update userId in user object if needed
            if (user.value && userData.id) {
                user.value.userId = userData.id;
            }
        }
        catch (error) {
            console.error('Failed to fetch user profile:', error);
            throw error;
        }
    }
    async function loginUser(credentials) {
        try {
            const response = await login(credentials);
            // Assuming response has userId, accessToken, and refreshToken
            user.value = {
                userId: response.userId, // Include userId from response
                accessToken: response.accessToken,
                refreshToken: response.refreshToken
            };
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('userData', JSON.stringify(response));
            await fetchUserProfile();
            isAuthenticated.value = true;
        }
        catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }
    async function registerUser(userData) {
        console.log("This is the user data : ", { userData });
        let testingUserData = {
            "username": userData.username,
            "fullName": userData.fullName,
            "gender": userData.gender,
            "pin": "898989",
            "email": userData.email,
            "password": userData.password,
            "profileImage": "https://example.com/profile.jpg",
            "phoneNumber": "+85512345678",
            "cityOrProvince": "Phnom Penh",
            "khanOrDistrict": "Toul Kork",
            "sangkatOrCommune": "Sangkat Boeung Kak 2",
            "employeeType": "Full-time",
            "companyName": "Tech Solutions Co.",
            "mainSourceOfIncome": "Salary",
            "monthlyIncomeRange": 1500,
            "studentCardId": "STU123456789",
            "roles": [
                "USER"
            ]
        };
        try {
            const response = await register(testingUserData);
            user.value = response;
            isAuthenticated.value = true;
            // Store tokens after registration
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('userData', JSON.stringify(response));
            // Fetch user profile after registration
            await fetchUserProfile();
        }
        catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }
    async function refresh() {
        if (!user.value?.refreshToken)
            return;
        try {
            const response = await refreshToken({ refreshToken: user.value.refreshToken });
            user.value = response;
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
        }
        catch (error) {
            console.error('Token refresh failed:', error);
            logout();
        }
    }
    function logout() {
        user.value = null;
        currentUser.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        router.push('/');
    }
    return {
        user,
        currentUser,
        isAuthenticated,
        loginUser,
        registerUser,
        refresh,
        logout,
        fetchUserProfile,
        initialize
    };
});
