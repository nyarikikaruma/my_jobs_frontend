<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="max-w-4xl mx-auto mb-8">
        <router-link to="/admin" class="absolute top-8 left-8 text-gray-500 hover:text-gray-700 transition-colors">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
        </router-link>
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Post a New Job
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect candidate by creating a detailed job posting that stands out
          </p>
        </div>
      </div>

      <!-- Form -->
      <div class="max-w-4xl mx-auto">
        <form @submit.prevent="submitJob" class="space-y-8">
          <!-- Basic Job Information -->
          <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div class="flex items-center mb-6">
              <svg class="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341"></path>
              </svg>
              <h2 class="text-2xl font-bold text-gray-900">Job Information</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Job Title -->
              <div class="md:col-span-2">
                <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  :class="{ 'border-red-500': errors.title }"
                  placeholder="e.g. Senior Frontend Developer"
                />
                <p v-if="errors.title" class="mt-2 text-sm text-red-600">{{ errors.title[0] }}</p>
              </div>

              <!-- Category -->
              <div>
                <label for="category" class="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  v-model="form.category"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white transition-all duration-200"
                  :class="{ 'border-red-500': errors.category }"
                >
                  <option value="">Select a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
                  <option value="Management">Management</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Operations">Operations</option>
                  <option value="Other">Other</option>
                </select>
                <p v-if="errors.category" class="mt-2 text-sm text-red-600">{{ errors.category[0] }}</p>
              </div>

              <!-- Job Type -->
              <div>
                <label for="job_type" class="block text-sm font-semibold text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  id="job_type"
                  v-model="form.job_type"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white transition-all duration-200"
                  :class="{ 'border-red-500': errors.job_type }"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
                <p v-if="errors.job_type" class="mt-2 text-sm text-red-600">{{ errors.job_type[0] }}</p>
              </div>

              <!-- Company Name -->
              <div>
                <label for="company" class="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  :class="{ 'border-red-500': errors.company }"
                  placeholder="Your company name"
                />
                <p v-if="errors.company" class="mt-2 text-sm text-red-600">{{ errors.company[0] }}</p>
              </div>

              <!-- Location -->
              <div>
                <label for="location" class="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  id="location"
                  v-model="form.location"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  :class="{ 'border-red-500': errors.location }"
                  placeholder="e.g. Remote, San Francisco, CA"
                />
                <p v-if="errors.location" class="mt-2 text-sm text-red-600">{{ errors.location[0] }}</p>
              </div>

              <!-- Salary Range -->
              <div>
                <label for="salary" class="block text-sm font-semibold text-gray-700 mb-2">
                  Salary Range
                </label>
                <input
                  id="salary"
                  v-model="form.salary"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  :class="{ 'border-red-500': errors.salary }"
                  placeholder="e.g. $80,000 - $120,000"
                />
                <p v-if="errors.salary" class="mt-2 text-sm text-red-600">{{ errors.salary[0] }}</p>
              </div>

              <!-- Experience Level -->
              <div>
                <label for="experience" class="block text-sm font-semibold text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  id="experience"
                  v-model="form.experience"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white transition-all duration-200"
                  :class="{ 'border-red-500': errors.experience }"
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                  <option value="10+ years">10+ years</option>
                </select>
                <p v-if="errors.experience" class="mt-2 text-sm text-red-600">{{ errors.experience[0] }}</p>
              </div>

              <!-- Expires At -->
              <div>
                <label for="expires_at" class="block text-sm font-semibold text-gray-700 mb-2">
                  Application Deadline *
                </label>
                <input
                  id="expires_at"
                  v-model="form.expires_at"
                  type="date"
                  required
                  :min="tomorrow"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  :class="{ 'border-red-500': errors.expires_at }"
                />
                <p v-if="errors.expires_at" class="mt-2 text-sm text-red-600">{{ errors.expires_at[0] }}</p>
              </div>
            </div>
          </div>

          <!-- Job Description -->
          <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div class="flex items-center mb-6">
              <svg class="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h2 class="text-2xl font-bold text-gray-900">Job Description</h2>
            </div>

            <div class="space-y-6">
              <!-- Job Details -->
              <div>
                <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  required
                  rows="6"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical transition-all duration-200"
                  :class="{ 'border-red-500': errors.description }"
                  placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                ></textarea>
                <p v-if="errors.description" class="mt-2 text-sm text-red-600">{{ errors.description[0] }}</p>
                <p class="mt-2 text-sm text-gray-500">{{ form.description.length }}/5000 characters</p>
              </div>

              <!-- What You Will Do -->
              <div>
                <label for="what_you_will_do" class="block text-sm font-semibold text-gray-700 mb-2">
                  What You Will Do
                </label>
                <textarea
                  id="what_you_will_do"
                  v-model="form.what_you_will_do"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical transition-all duration-200"
                  :class="{ 'border-red-500': errors.what_you_will_do }"
                  placeholder="• Lead the development of user-facing features&#10;• Collaborate with design teams&#10;• Optimize applications for maximum speed..."
                ></textarea>
                <p v-if="errors.what_you_will_do" class="mt-2 text-sm text-red-600">{{ errors.what_you_will_do[0] }}</p>
              </div>

              <!-- Requirements -->
              <div>
                <label for="requirements" class="block text-sm font-semibold text-gray-700 mb-2">
                  Requirements
                </label>
                <textarea
                  id="requirements"
                  v-model="form.requirements"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical transition-all duration-200"
                  :class="{ 'border-red-500': errors.requirements }"
                  placeholder="List the required skills, qualifications, and experience..."
                ></textarea>
                <p v-if="errors.requirements" class="mt-2 text-sm text-red-600">{{ errors.requirements[0] }}</p>
              </div>

              <!-- Nice to Have -->
              <div>
                <label for="nice_to_have" class="block text-sm font-semibold text-gray-700 mb-2">
                  Nice to Have
                </label>
                <textarea
                  id="nice_to_have"
                  v-model="form.nice_to_have"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical transition-all duration-200"
                  :class="{ 'border-red-500': errors.nice_to_have }"
                  placeholder="• Experience with TypeScript&#10;• Knowledge of backend technologies&#10;• Familiarity with cloud platforms..."
                ></textarea>
                <p v-if="errors.nice_to_have" class="mt-2 text-sm text-red-600">{{ errors.nice_to_have[0] }}</p>
              </div>

            </div>
          </div>

          <!-- Submit Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              @click="saveDraft"
              :disabled="loading"
              class="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading && draftLoading" class="w-5 h-5 mr-2 inline animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Save as Draft
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg v-if="loading && !draftLoading" class="w-5 h-5 mr-2 inline animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading && !draftLoading ? 'Publishing...' : 'Publish Job' }}
            </button>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-xl p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-green-800 font-medium">{{ successMessage }}</p>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-xl p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-red-800 font-medium">{{ errorMessage }}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

// Form data
const form = ref({
  title: '',
  category: '',
  job_type: 'Full-time',
  company: '',
  location: '',
  salary: '',
  experience: '3-5 years',
  expires_at: '',
  description: '',
  requirements: '',
  what_you_will_do: '',
  nice_to_have: ''
})

// Form states
const loading = ref(false)
const draftLoading = ref(false)
const errors = ref({})
const successMessage = ref('')
const errorMessage = ref('')

// Computed
const tomorrow = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toISOString().split('T')[0]
})

// Methods
const addSkill = () => {
  const skill = skillInput.value.trim()
  if (skill && !form.value.skills.includes(skill)) {
    form.value.skills.push(skill)
    skillInput.value = ''
  }
}

const removeSkill = (index) => {
  form.value.skills.splice(index, 1)
}

const clearMessages = () => {
  successMessage.value = ''
  errorMessage.value = ''
  errors.value = {}
}

const submitJob = async () => {
  try {
    clearMessages()
    loading.value = true
    draftLoading.value = false

    // Prepare form data
    const jobData = {
      ...form.value,
      status: 'published'
    }

    // Make API call to Laravel backend
    const token = localStorage.getItem("adminAuthToken");
    const response = await axios.post('https://62.171.190.239/api/admin/jobs', jobData, {
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        
      }
    })

    if (response.status === 201 || response.status === 200) {
      successMessage.value = 'Job posted successfully! It will be reviewed and published shortly.'
      
      // Reset form
      form.value = {
        title: '',
        category: '',
        job_type: 'Full-time',
        company: '',
        location: '',
        salary: '',
        experience: '3-5 years',
        expires_at: '',
        description: '',
        requirements: '',
        what_you_will_do: '',
        nice_to_have: ''
      }

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

  } catch (error) {
    console.error('Error submitting job:', error)
    
    if (error.response && error.response.status === 422) {
      // Validation errors
      errors.value = error.response.data.errors || {}
      errorMessage.value = 'Please check the form for errors and try again.'
    } else if (error.response && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'Something went wrong. Please try again later.'
    }
    
    // Scroll to top to show error message
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
  } finally {
    loading.value = false
  }
}

const saveDraft = async () => {
  try {
    clearMessages()
    loading.value = true
    draftLoading.value = true

    // Prepare form data
    const jobData = {
      ...form.value,
      status: 'draft'
    }

      // Make API call to Laravel backend
    const token = localStorage.getItem("adminAuthToken");
    const response = await axios.post('/api/admin/jobs', jobData, {
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        
      }
    })

    if (response.status === 201 || response.status === 200) {
      successMessage.value = 'Job saved as draft successfully! You can edit and publish it later.'
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

  } catch (error) {
    console.error('Error saving draft:', error)
    
    if (error.response && error.response.status === 422) {
      // Validation errors
      errors.value = error.response.data.errors || {}
      errorMessage.value = 'Please check the form for errors and try again.'
    } else if (error.response && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'Something went wrong while saving draft. Please try again later.'
    }
    
    // Scroll to top to show error message
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
  } finally {
    loading.value = false
    draftLoading.value = false
  }
}

// Set default expiry date (30 days from now)
const setDefaultExpiryDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 30)
  form.value.expires_at = date.toISOString().split('T')[0]
}

// Initialize default values
setDefaultExpiryDate()
</script>

<style scoped>
/* Custom styles for better UX */
textarea {
  min-height: 120px;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: invert(0.5);
}

.prose {
  max-width: none;
}
</style>