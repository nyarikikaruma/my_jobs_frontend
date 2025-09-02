<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-6 relative overflow-hidden">
    
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Main Container -->
    <div class="relative w-full max-w-md">
      
      <!-- Authenticated Dashboard -->
      <div v-if="isAuthenticated" class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
        <div class="text-center">
          <!-- Avatar -->
          <div class="w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {{ getInitials(user?.name) }}
          </div>
          
          <h2 class="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
          <p class="text-white/70 mb-6">{{ user?.name }}</p>
          <p class="text-white/50 text-sm mb-8">{{ user?.email }}</p>
          
          <!-- Quick Actions -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            <NuxtLink :to="`/`" class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              <svg class="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              All Jobs
            </NuxtLink>
            <NuxtLink to="/admin/createjob" class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              <svg class="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Add Job
            </NuxtLink>
          </div>
          
          <button @click="handleLogout" 
            :disabled="isLoading"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging out...
            </span>
            <span v-else>Logout</span>
          </button>
        </div>
      </div>

      <!-- Authentication Forms -->
      <div v-else class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
        
        <!-- Tab Navigation -->
        <div class="flex bg-white/20 rounded-2xl p-1 mb-8 backdrop-blur-sm">
          <button 
            @click="activeTab = 'login'" 
            :class="['flex-1 py-3 font-semibold rounded-xl transition-all duration-300', 
              activeTab === 'login' 
                ? 'bg-white text-gray-800 shadow-lg transform scale-95' 
                : 'text-white hover:bg-white/10']">
            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
            Login
          </button>
          <button 
            @click="activeTab = 'register'" 
            :class="['flex-1 py-3 font-semibold rounded-xl transition-all duration-300', 
              activeTab === 'register' 
                ? 'bg-white text-gray-800 shadow-lg transform scale-95' 
                : 'text-white hover:bg-white/10']">
            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
            Register
          </button>
        </div>

        <!-- Login Form -->
        <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-6">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p class="text-white/70">Sign in to your admin account</p>
          </div>
          
          <div class="space-y-4">
            <div class="relative">
              <label class="block text-white/90 text-sm font-medium mb-2">Email Address</label>
              <div class="relative">
                <svg class="absolute left-4 top-4 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
                <input 
                  v-model="loginEmail" 
                  type="email" 
                  required 
                  :disabled="isLoading"
                  class="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter your email"/>
              </div>
            </div>
            
            <div class="relative">
              <label class="block text-white/90 text-sm font-medium mb-2">Password</label>
              <div class="relative">
                <svg class="absolute left-4 top-4 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <input 
                  v-model="loginPassword" 
                  :type="showLoginPassword ? 'text' : 'password'" 
                  required 
                  :disabled="isLoading"
                  class="w-full pl-12 pr-12 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter your password"/>
                <button 
                  type="button" 
                  @click="showLoginPassword = !showLoginPassword"
                  class="absolute right-4 top-4 text-white/50 hover:text-white/70 transition-colors">
                  <svg v-if="showLoginPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="loginError" class="bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-red-100 p-4 rounded-2xl">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ loginError }}
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing In...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="handleRegister" class="space-y-6">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p class="text-white/70">Register as a new admin</p>
          </div>
          
          <div class="space-y-4">
            <div class="relative">
              <label class="block text-white/90 text-sm font-medium mb-2">Full Name</label>
              <div class="relative">
                <svg class="absolute left-4 top-4 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <input 
                  v-model="registerName" 
                  type="text" 
                  required 
                  :disabled="isLoading"
                  class="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter your full name"/>
              </div>
            </div>

            <div class="relative">
              <label class="block text-white/90 text-sm font-medium mb-2">Email Address</label>
              <div class="relative">
                <svg class="absolute left-4 top-4 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
                <input 
                  v-model="registerEmail" 
                  type="email" 
                  required 
                  :disabled="isLoading"
                  class="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter your email"/>
              </div>
            </div>

            <div class="relative">
              <label class="block text-white/90 text-sm font-medium mb-2">Password</label>
              <div class="relative">
                <svg class="absolute left-4 top-4 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <input 
                  v-model="registerPassword" 
                  :type="showRegisterPassword ? 'text' : 'password'" 
                  required 
                  :disabled="isLoading"
                  class="w-full pl-12 pr-12 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Create a password"/>
                <button 
                  type="button" 
                  @click="showRegisterPassword = !showRegisterPassword"
                  class="absolute right-4 top-4 text-white/50 hover:text-white/70 transition-colors">
                  <svg v-if="showRegisterPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="relative">
              <label class="block text-white/90 text-sm font-medium mb-2">Confirm Password</label>
              <div class="relative">
                <svg class="absolute left-4 top-4 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <input 
                  v-model="registerPasswordConfirm" 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  required 
                  :disabled="isLoading"
                  class="w-full pl-12 pr-12 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Confirm your password"/>
                <button 
                  type="button" 
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-4 top-4 text-white/50 hover:text-white/70 transition-colors">
                  <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="registerError" class="bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-red-100 p-4 rounded-2xl">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ registerError }}
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { NuxtLink } from "#components";

// Base URL for the API
const API_BASE_URL = "http://62.171.190.239/api";

// State management
const activeTab = ref("login");
const isAuthenticated = ref(false);
const user = ref(null);
const isLoading = ref(false);

// Login state
const loginEmail = ref("");
const loginPassword = ref("");
const loginError = ref("");
const showLoginPassword = ref(false);

// Register state
const registerName = ref("");
const registerEmail = ref("");
const registerPassword = ref("");
const registerPasswordConfirm = ref("");
const registerError = ref("");
const showRegisterPassword = ref(false);
const showConfirmPassword = ref(false);

// Helper functions
const getAuthToken = () => {
  try {
    return localStorage.getItem("adminAuthToken");
  } catch (error) {
    console.warn("localStorage not available:", error);
    return null;
  }
};

const setAuthToken = (token) => {
  try {
    localStorage.setItem("adminAuthToken", token);
  } catch (error) {
    console.warn("localStorage not available:", error);
  }
};

const removeAuthToken = () => {
  try {
    localStorage.removeItem("adminAuthToken");
  } catch (error) {
    console.warn("localStorage not available:", error);
  }
};

const getInitials = (name) => {
  if (!name) return "AD";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
};

const clearForm = (formType) => {
  if (formType === "login") {
    loginEmail.value = "";
    loginPassword.value = "";
    loginError.value = "";
    showLoginPassword.value = false;
  } else {
    registerName.value = "";
    registerEmail.value = "";
    registerPassword.value = "";
    registerPasswordConfirm.value = "";
    registerError.value = "";
    showRegisterPassword.value = false;
    showConfirmPassword.value = false;
  }
};

const validatePasswords = () => {
  if (registerPassword.value !== registerPasswordConfirm.value) {
    registerError.value = "Passwords do not match";
    return false;
  }
  if (registerPassword.value.length < 8) {
    registerError.value = "Password must be at least 8 characters long";
    return false;
  }
  return true;
};

// API functions
const handleLogin = async () => {
  if (isLoading.value) return;
  
  loginError.value = "";
  isLoading.value = true;

  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, {
      email: loginEmail.value,
      password: loginPassword.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const { token, user: userData } = response.data;
    
    if (token && userData) {
      setAuthToken(token);
      user.value = userData;
      isAuthenticated.value = true;
      clearForm("login");
      
      // Show success message briefly
      setTimeout(() => {
        console.log("Login successful!");
      }, 100);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Login error:", error);
    
    if (error.response?.data?.message) {
      loginError.value = error.response.data.message;
    } else if (error.response?.data?.errors) {
      // Handle Laravel validation errors
      const errors = error.response.data.errors;
      const firstError = Object.values(errors)[0];
      loginError.value = Array.isArray(firstError) ? firstError[0] : firstError;
    } else {
      loginError.value = "Login failed. Please check your credentials and try again.";
    }
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = async () => {
  if (isLoading.value) return;
  
  registerError.value = "";
  
  // Client-side validation
  if (!validatePasswords()) {
    return;
  }
  
  isLoading.value = true;

  try {
    const response = await axios.post(`${API_BASE_URL}/admin/register`, {
      name: registerName.value,
      email: registerEmail.value,
      password: registerPassword.value,
      password_confirmation: registerPasswordConfirm.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const { token, user: userData } = response.data;
    
    if (token && userData) {
      setAuthToken(token);
      user.value = userData;
      isAuthenticated.value = true;
      clearForm("register");
      
      // Show success message briefly
      setTimeout(() => {
        console.log("Registration successful!");
      }, 100);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Registration error:", error);
    
    if (error.response?.data?.message) {
      registerError.value = error.response.data.message;
    } else if (error.response?.data?.errors) {
      // Handle Laravel validation errors
      const errors = error.response.data.errors;
      const firstError = Object.values(errors)[0];
      registerError.value = Array.isArray(firstError) ? firstError[0] : firstError;
    } else {
      registerError.value = "Registration failed. Please try again.";
    }
  } finally {
    isLoading.value = false;
  }
};

const handleLogout = async () => {
  if (isLoading.value) return;
  
  isLoading.value = true;
  const token = getAuthToken();

  try {
    // Call logout endpoint if token exists
    if (token) {
      await axios.post(`${API_BASE_URL}/admin/logout`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
    // Continue with local logout even if API call fails
  } finally {
    // Clear local state
    removeAuthToken();
    isAuthenticated.value = false;
    user.value = null;
    clearForm("login");
    clearForm("register");
    isLoading.value = false;
  }
};

const checkAuthStatus = async () => {
  const token = getAuthToken();
  if (!token) {
    return;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/admin/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    user.value = response.data;
    isAuthenticated.value = true;
  } catch (error) {
    console.error("Auth check failed:", error);
    // Token is invalid, clear it
    if (error.response?.status === 401) {
      handleLogout();
    }
  }
};

// Lifecycle
onMounted(() => {
  checkAuthStatus();
});
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Custom scrollbar for better aesthetics */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
