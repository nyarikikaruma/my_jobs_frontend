// stores/jobs.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    loading: false,
    deleting: [], // Track which jobs are being deleted
    paginationData: {
      current_page: 1,
      last_page: 1,
      per_page: 9,
      total: 0,
      from: 0,
      to: 0,
      prev_page_url: null,
      next_page_url: null
    },
    searchQuery: '',
    selectedCategory: '',
    perPage: 9
  }),

  getters: {
    // Get job by ID
    getJobById: (state) => (id) => {
      return state.jobs.find(job => job.id == id)
    },

    // Get jobs by category
    getJobsByCategory: (state) => (category) => {
      return state.jobs.filter(job => job.category === category)
    },

    // Check if a job is being deleted
    isDeleting: (state) => (id) => {
      return state.deleting.includes(id)
    },

    // Check if there are more pages
    hasNextPage: (state) => {
      return state.paginationData.next_page_url !== null
    },

    hasPrevPage: (state) => {
      return state.paginationData.prev_page_url !== null
    },

    // Get visible page numbers for pagination
    visiblePages: (state) => {
      const current = state.paginationData.current_page
      const last = state.paginationData.last_page
      const pages = []
      
      if (last <= 7) {
        for (let i = 1; i <= last; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        
        if (current <= 4) {
          for (let i = 2; i <= 5; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(last)
        } else if (current >= last - 3) {
          pages.push('...')
          for (let i = last - 4; i <= last; i++) {
            pages.push(i)
          }
        } else {
          pages.push('...')
          for (let i = current - 1; i <= current + 1; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(last)
        }
      }
      
      return pages
    }
  },

  actions: {
    async fetchJobs(page = 1, search = '', category = '', itemsPerPage = this.perPage) {
      try {
        this.loading = true
        
        // Update store state
        this.searchQuery = search
        this.selectedCategory = category
        this.perPage = itemsPerPage
        
        const params = new URLSearchParams({
          page: page.toString(),
          per_page: itemsPerPage.toString()
        })
        
        if (search) params.append('search', search)
        if (category) params.append('category', category)
        
        const { data } = await axios.get(`http://62.171.190.239/api/jobs?${params}`)
        
        // Update jobs and pagination data
        this.jobs = data.data
        this.paginationData = {
          current_page: data.current_page,
          last_page: data.last_page,
          per_page: data.per_page,
          total: data.total,
          from: data.from,
          to: data.to,
          prev_page_url: data.prev_page_url,
          next_page_url: data.next_page_url
        }
        
      } catch (error) {
        console.error('Error fetching jobs:', error)
        // You might want to set an error state here
      } finally {
        this.loading = false
      }
    },

    // Fetch a single job by ID (useful if not in current jobs list)
    async fetchJobById(id) {
      try {
        const { data } = await axios.get(`http://62.171.190.239/api/jobs/${id}`)
        
        // Add or update job in the jobs array
        const existingIndex = this.jobs.findIndex(job => job.id == id)
        if (existingIndex !== -1) {
          this.jobs[existingIndex] = data
        } else {
          this.jobs.push(data)
        }
        
        return data
      } catch (error) {
        console.error('Error fetching job:', error)
        throw error
      }
    },

    // Delete a job
    async deleteJob(id) {
      try {
        // Add job ID to deleting array to show loading state
        this.deleting.push(id)
        
        // Make API call to delete the job
        await axios.delete(`http://62.171.190.239/api/admin/delete/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminAuthToken')}`,
            'Content-Type': 'application/json'
          }
        })
        
        // Remove job from the jobs array
        this.jobs = this.jobs.filter(job => job.id != id)
        
        // Update pagination total count
        this.paginationData.total = Math.max(0, this.paginationData.total - 1)
        
        // If current page becomes empty and we're not on page 1, go to previous page
        if (this.jobs.length === 0 && this.paginationData.current_page > 1) {
          const newPage = this.paginationData.current_page - 1
          await this.fetchJobs(newPage, this.searchQuery, this.selectedCategory, this.perPage)
        }
        
        return true
      } catch (error) {
        console.error('Error deleting job:', error)
        throw error
      } finally {
        // Remove job ID from deleting array
        this.deleting = this.deleting.filter(deletingId => deletingId != id)
      }
    },

    // Clear filters
    clearFilters() {
      this.searchQuery = ''
      this.selectedCategory = ''
      this.fetchJobs(1, '', '', this.perPage)
    },

    // Update search query
    updateSearch(query) {
      this.searchQuery = query
    },

    // Update category
    updateCategory(category) {
      this.selectedCategory = category
    }
  }
})