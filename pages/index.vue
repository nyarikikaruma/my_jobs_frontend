<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="relative container mx-auto px-4 py-20 lg:py-32">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Dream
            <span class="text-yellow-300">Career</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            Discover amazing opportunities and connect with top employers in your field
          </p>
          <div  class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink v-if="isAdmin" to="/admin"  class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Profile
            </NuxtLink>
            <button v-else class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Browse Jobs
            </button>

            <NuxtLink v-if="isAdmin" to="/admin/createjob" class="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              Post a Job
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- Decorative shapes -->
      <div class="absolute top-20 right-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
      <div class="absolute bottom-20 left-10 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-bounce"></div>
    </section>

    <!-- Search and Filter Section -->
    <section class="py-12 bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div class="flex flex-col lg:flex-row gap-4">
              <div class="flex-1">
                <input 
                  v-model="searchQuery"
                  @input="handleSearch"
                  type="text" 
                  placeholder="Search jobs, companies, or keywords..."
                  class="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
                >
              </div>
              <div class="lg:w-64">
                <select 
                  v-model="selectedCategory"
                  @change="handleCategoryChange"
                  class="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg bg-white"
                >
                  <option value="">All Categories</option>
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>
              <button 
                @click="performSearch"
                class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Delete Job</h3>
          <p class="text-gray-500 mb-6">Are you sure you want to delete "{{ jobToDelete?.title }}"? This action cannot be undone.</p>
          <div class="flex space-x-3">
            <button
              @click="cancelDelete"
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              :disabled="jobsStore.isDeleting(jobToDelete?.id)"
              class="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 disabled:cursor-not-allowed"
            >
              <span v-if="jobsStore.isDeleting(jobToDelete?.id)" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </span>
              <span v-else>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Jobs Grid Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Latest Job Opportunities
          </h2>
          <p class="text-xl text-gray-600">
            {{ paginationData.total || 0 }} jobs found
            <span v-if="paginationData.total > 0" class="text-sm text-gray-500">
              (Page {{ paginationData.current_page }} of {{ paginationData.last_page }})
            </span>
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="n in 6" :key="n" class="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div class="h-4 bg-gray-300 rounded mb-4"></div>
            <div class="h-3 bg-gray-200 rounded mb-2"></div>
            <div class="h-3 bg-gray-200 rounded mb-4"></div>
            <div class="flex justify-between">
              <div class="h-6 bg-gray-300 rounded w-20"></div>
              <div class="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>

        <!-- Jobs Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="job in jobs" 
            :key="job.id"
            class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group"
          >
            <div class="p-6">
              <!-- Admin Controls (visible only to admin) -->
              <div v-if="isAdmin" class="flex justify-end mb-4">
                <button
                  @click="initiateDelete(job)"
                  :disabled="jobsStore.isDeleting(job.id)"
                  class="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                >
                  <svg v-if="jobsStore.isDeleting(job.id)" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  <span>{{ jobsStore.isDeleting(job.id) ? 'Deleting...' : 'Delete' }}</span>
                </button>
              </div>

              <!-- Job Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <NuxtLink :to="`/jobs/${job.id}`" class="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {{ job.title }}
                  </NuxtLink>
                  <p class="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {{ job.details }}
                  </p>
                </div>
              </div>

              <!-- Job Meta -->
              <div class="flex items-center justify-between mb-4">
                <span 
                  class="px-3 py-1 rounded-full text-xs font-semibold"
                  :class="getCategoryColor(job.category)"
                >
                  {{ job.category }}
                </span>
                <div class="flex items-center text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                  </svg>
                  {{ formatDate(job.expires_at) }}
                </div>
              </div>

              <!-- Expiry Warning -->
              <div v-if="isExpiringSoon(job.expires_at)" class="mb-4">
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm text-yellow-800 font-medium">Expires soon!</span>
                  </div>
                </div>
              </div>

              <!-- Apply Button -->
              <button class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-md">
                Apply Now
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loading && jobs.length === 0" class="text-center py-16">
          <div class="max-w-md mx-auto">
            <svg class="w-24 h-24 mx-auto text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <h3 class="text-2xl font-semibold text-gray-600 mb-2">No jobs found</h3>
            <p class="text-gray-500 mb-6">Try adjusting your search criteria or browse all categories.</p>
            <button 
              @click="clearFilters"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <!-- Creative Pagination -->
        <div v-if="!loading && paginationData.last_page > 1" class="mt-16">
          <div class="flex flex-col items-center space-y-6">
            <!-- Page Info -->
            <div class="text-center">
              <p class="text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                Showing {{ paginationData.from }} to {{ paginationData.to }} of {{ paginationData.total }} results
              </p>
            </div>

            <!-- Main Pagination -->
            <div class="flex items-center justify-center">
              <div class="bg-white rounded-2xl shadow-lg p-3 border border-gray-100">
                <div class="flex items-center space-x-2">
                  
                  <!-- Previous Button -->
                  <button
                    @click="goToPage(paginationData.current_page - 1)"
                    :disabled="!paginationData.prev_page_url"
                    :class="[
                      'p-3 rounded-xl transition-all duration-300 transform',
                      paginationData.prev_page_url 
                        ? 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:scale-105 shadow-sm' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    ]"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>

                  <!-- Page Numbers -->
                  <div class="flex items-center space-x-1">
                    <template v-for="page in visiblePages" :key="page">
                      <button
                        v-if="page !== '...'"
                        @click="goToPage(page)"
                        :class="[
                          'px-4 py-2 rounded-lg transition-all duration-300 font-semibold text-sm transform hover:scale-105',
                          page === paginationData.current_page
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                        ]"
                      >
                        {{ page }}
                      </button>
                      <span v-else class="px-2 py-2 text-gray-400">...</span>
                    </template>
                  </div>

                  <!-- Next Button -->
                  <button
                    @click="goToPage(paginationData.current_page + 1)"
                    :disabled="!paginationData.next_page_url"
                    :class="[
                      'p-3 rounded-xl transition-all duration-300 transform',
                      paginationData.next_page_url 
                        ? 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:scale-105 shadow-sm' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    ]"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Jump -->
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
                <label class="text-sm text-gray-600 font-medium">Jump to:</label>
                <input
                  v-model="jumpToPage"
                  @keyup.enter="handleQuickJump"
                  type="number"
                  :min="1"
                  :max="paginationData.last_page"
                  class="w-16 px-2 py-1 border border-gray-300 rounded-md text-center text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="paginationData.current_page"
                >
                <button
                  @click="handleQuickJump"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-semibold transition-all duration-300"
                >
                  Go
                </button>
              </div>
              
              <!-- Items per page -->
              <div class="flex items-center space-x-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
                <label class="text-sm text-gray-600 font-medium">Show:</label>
                <select
                  v-model="perPage"
                  @change="handlePerPageChange"
                  class="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="9">9</option>
                  <option value="18">18</option>
                  <option value="27">27</option>
                  <option value="36">36</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Take the Next Step?</h2>
        <p class="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
          Join thousands of professionals who have found their perfect job through our platform
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-white hover:bg-gray-100 text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
            Create Account
          </button>
          <button class="border-2 border-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useJobsStore } from '~/stores/jobs'

// Use the jobs store
const jobsStore = useJobsStore()

// Search debounce timer
const searchTimer = ref(null)

// Delete modal state
const showDeleteModal = ref(false)
const jobToDelete = ref(null)

// Computed properties from store
const jobs = computed(() => jobsStore.jobs)
const loading = computed(() => jobsStore.loading)
const paginationData = computed(() => jobsStore.paginationData)
const searchQuery = computed({
  get: () => jobsStore.searchQuery,
  set: (value) => jobsStore.updateSearch(value)
})
const selectedCategory = computed({
  get: () => jobsStore.selectedCategory,
  set: (value) => jobsStore.updateCategory(value)
})
const perPage = computed({
  get: () => jobsStore.perPage,
  set: (value) => jobsStore.perPage = value
})
const visiblePages = computed(() => jobsStore.visiblePages)

// Local reactive data
const jumpToPage = ref('')

// Static categories (you might want to move this to store as well)
const categories = computed(() => {
  return ['Technology', 'Marketing', 'Design', 'Management', 'Sales', 'Finance']
})

// Delete functionality methods
const initiateDelete = (job) => {
  jobToDelete.value = job
  showDeleteModal.value = true
}

const cancelDelete = () => {
  jobToDelete.value = null
  showDeleteModal.value = false
}

const confirmDelete = async () => {
  if (!jobToDelete.value) return
  
  try {
    await jobsStore.deleteJob(jobToDelete.value.id)
    
    // Show success notification (you can replace this with your preferred notification system)
    console.log(`Job "${jobToDelete.value.title}" deleted successfully`)
    
    // Close modal
    showDeleteModal.value = false
    jobToDelete.value = null
    
  } catch (error) {
    console.error('Failed to delete job:', error)
    
    // Show error notification (you can replace this with your preferred notification system)
    alert('Failed to delete job. Please try again.')
  }
}

// Methods - now using store actions
const fetchJobs = (page = 1, search = searchQuery.value, category = selectedCategory.value, itemsPerPage = perPage.value) => {
  jobsStore.fetchJobs(page, search, category, itemsPerPage).then(() => {
    // Scroll to top of jobs section
    document.querySelector('.py-16.bg-gray-50')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  })
}

const goToPage = (page) => {
  if (page >= 1 && page <= paginationData.value.last_page && page !== paginationData.value.current_page) {
    fetchJobs(page, searchQuery.value, selectedCategory.value, perPage.value)
  }
}

const handleQuickJump = () => {
  const page = parseInt(jumpToPage.value)
  if (page && page >= 1 && page <= paginationData.value.last_page) {
    goToPage(page)
    jumpToPage.value = ''
  }
}

const handlePerPageChange = () => {
  fetchJobs(1, searchQuery.value, selectedCategory.value, perPage.value)
}

const handleSearch = () => {
  clearTimeout(searchTimer.value)
  searchTimer.value = setTimeout(() => {
    fetchJobs(1, searchQuery.value, selectedCategory.value, perPage.value)
  }, 500)
}

const handleCategoryChange = () => {
  fetchJobs(1, searchQuery.value, selectedCategory.value, perPage.value)
}

const performSearch = () => {
  clearTimeout(searchTimer.value)
  fetchJobs(1, searchQuery.value, selectedCategory.value, perPage.value)
}

const clearFilters = () => {
  jobsStore.clearFilters()
}

// Keep your existing utility methods unchanged
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) {
    return 'Expired'
  } else if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return 'Tomorrow'
  } else {
    return `${diffDays} days left`
  }
}

const isExpiringSoon = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays <= 3 && diffDays > 0
}

const getCategoryColor = (category) => {
  const colors = {
    'Technology': 'bg-blue-100 text-blue-800',
    'Marketing': 'bg-green-100 text-green-800',
    'Design': 'bg-purple-100 text-purple-800',
    'Management': 'bg-orange-100 text-orange-800',
    'Sales': 'bg-red-100 text-red-800',
    'Finance': 'bg-yellow-100 text-yellow-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

// Lifecycle
let isAdmin = ref(false)
onMounted(() => {
  const token = localStorage.getItem("adminAuthToken")
  if (token !== null && token !== "") {
    console.log('There is token')
    isAdmin.value = true
  }
    console.log('There is no token')

  jobsStore.fetchJobs()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>