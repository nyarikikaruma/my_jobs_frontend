<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
          <div class="h-8 bg-gray-300 rounded mb-6 w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded mb-4"></div>
          <div class="h-4 bg-gray-200 rounded mb-4 w-5/6"></div>
          <div class="h-32 bg-gray-200 rounded mb-6"></div>
          <div class="flex gap-4">
            <div class="h-12 bg-gray-300 rounded w-32"></div>
            <div class="h-12 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Details Content -->
    <div v-else-if="job" class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <div class="max-w-6xl mx-auto">
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <button @click="goBack" class="hover:text-blue-600 transition-colors duration-200">
              <svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Jobs
            </button>
            <span class="text-gray-400">/</span>
            <span class="text-gray-900 font-medium">{{ job.title }}</span>
          </div>
        </div>
      </nav>

      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Job Header -->
            <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div class="flex-1">
                  <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {{ job.title }}
                  </h1>
                  <div class="flex flex-wrap items-center gap-4 text-gray-600">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="font-medium">{{ job.company || 'TechCorp Solutions' }}</span>
                    </div>
                    <div class="flex items-center">
                      <svg class="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                      </svg>
                      <span>{{ job.location || 'Remote / San Francisco, CA' }}</span>
                    </div>
                    <div class="flex items-center">
                      <svg class="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                      </svg>
                      <span>{{ job.job_type || 'Full-time' }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col sm:items-end">
                  <span 
                    class="px-4 py-2 rounded-full text-sm font-semibold mb-3"
                    :class="getCategoryColor(job.category)"
                  >
                    {{ job.category }}
                  </span>
                  <div class="text-right">
                    <div class="text-2xl font-bold text-gray-900 mb-1">
                      {{ job.salary || '$80k - $120k' }}
                    </div>
                    <div class="text-sm text-gray-500">per year</div>
                  </div>
                </div>
              </div>

              <!-- Expiry Warning -->
              <div v-if="isExpiringSoon(job.expires_at)" class="mb-6">
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="text-yellow-800 font-medium">Application deadline approaching!</p>
                      <p class="text-yellow-700 text-sm">This position expires {{ formatDate(job.expires_at) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <button @click="applyForJob" class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Apply Now
                </button>
                <button class="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300">
                  <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  Save Job
                </button>
                <button class="border-2 border-gray-300 hover:border-green-600 hover:text-green-600 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300">
                  <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                  </svg>
                  Share
                </button>
              </div>
            </div>

            <!-- Job Description -->
            <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg class="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Job Description
              </h2>
              <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p class="text-lg mb-6 whitespace-pre-wrap">{{ job.details }}</p>
                
                <!-- Additional job description sections if available -->
                <div v-if="job.requirements || job.responsibilities || job.nice_to_have" class="space-y-6">
                  <!-- What You'll Do -->
                  <div v-if="job.responsibilities">
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">What You'll Do:</h3>
                    <div v-if="Array.isArray(job.responsibilities)">
                      <ul class="list-disc list-inside space-y-2">
                        <li v-for="responsibility in job.responsibilities" :key="responsibility">
                          {{ responsibility }}
                        </li>
                      </ul>
                    </div>
                    <div v-else class="whitespace-pre-wrap">{{ job.responsibilities }}</div>
                  </div>

                  <!-- Requirements -->
                  <div v-if="job.requirements">
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Requirements:</h3>
                    <div v-if="Array.isArray(job.requirements)">
                      <ul class="list-disc list-inside space-y-2">
                        <li v-for="requirement in job.requirements" :key="requirement">
                          {{ requirement }}
                        </li>
                      </ul>
                    </div>
                    <div v-else class="whitespace-pre-wrap">{{ job.requirements }}</div>
                  </div>

                  <!-- Nice to Have -->
                  <div v-if="job.nice_to_have">
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Nice to Have:</h3>
                    <div v-if="Array.isArray(job.nice_to_have)">
                      <ul class="list-disc list-inside space-y-2">
                        <li v-for="skill in job.nice_to_have" :key="skill">
                          {{ skill }}
                        </li>
                      </ul>
                    </div>
                    <div v-else class="whitespace-pre-wrap">{{ job.nice_to_have }}</div>
                  </div>
                </div>

                <!-- Default content if additional fields are not provided -->
                <div v-else class="space-y-6">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">What You'll Do:</h3>
                    <ul class="list-disc list-inside space-y-2">
                      <li>Lead the development of user-facing features using modern frameworks</li>
                      <li>Collaborate with design teams to implement pixel-perfect interfaces</li>
                      <li>Optimize applications for maximum speed and scalability</li>
                      <li>Mentor junior developers and contribute to team growth</li>
                      <li>Participate in code reviews and maintain high code quality standards</li>
                    </ul>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Requirements:</h3>
                    <ul class="list-disc list-inside space-y-2">
                      <li>5+ years of experience in frontend development</li>
                      <li>Expert knowledge of JavaScript, HTML5, and CSS3</li>
                      <li>Experience with modern frameworks (React, Vue.js, or Angular)</li>
                      <li>Strong understanding of responsive design and cross-browser compatibility</li>
                      <li>Experience with version control systems (Git)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Nice to Have:</h3>
                    <ul class="list-disc list-inside space-y-2">
                      <li>Experience with TypeScript and modern build tools</li>
                      <li>Knowledge of backend technologies and APIs</li>
                      <li>Familiarity with cloud platforms (AWS, Azure, GCP)</li>
                      <li>Understanding of UI/UX principles</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Benefits Section -->
            <div v-if="job.benefits || !job.benefits" class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg class="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
                Benefits & Perks
              </h2>
              
              <!-- Dynamic benefits if provided -->
              <div v-if="job.benefits && Array.isArray(job.benefits)" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="(benefit, index) in job.benefits" :key="index" class="flex items-center p-4 bg-green-50 rounded-lg">
                  <svg class="w-8 h-8 text-green-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h4 class="font-semibold text-gray-900">{{ benefit.title || benefit }}</h4>
                    <p v-if="benefit.description" class="text-gray-600 text-sm">{{ benefit.description }}</p>
                  </div>
                </div>
              </div>

              <!-- Text-based benefits -->
              <div v-else-if="job.benefits && typeof job.benefits === 'string'" class="prose max-w-none">
                <div class="whitespace-pre-wrap text-gray-700">{{ job.benefits }}</div>
              </div>

              <!-- Default benefits -->
              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex items-center p-4 bg-green-50 rounded-lg">
                  <svg class="w-8 h-8 text-green-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h4 class="font-semibold text-gray-900">Health Insurance</h4>
                    <p class="text-gray-600 text-sm">Comprehensive medical, dental & vision</p>
                  </div>
                </div>
                <div class="flex items-center p-4 bg-blue-50 rounded-lg">
                  <svg class="w-8 h-8 text-blue-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  <div>
                    <h4 class="font-semibold text-gray-900">401(k) Matching</h4>
                    <p class="text-gray-600 text-sm">Up to 6% company matching</p>
                  </div>
                </div>
                <div class="flex items-center p-4 bg-purple-50 rounded-lg">
                  <svg class="w-8 h-8 text-purple-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  <div>
                    <h4 class="font-semibold text-gray-900">Learning Budget</h4>
                    <p class="text-gray-600 text-sm">$2,000 annual learning allowance</p>
                  </div>
                </div>
                <div class="flex items-center p-4 bg-orange-50 rounded-lg">
                  <svg class="w-8 h-8 text-orange-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h4 class="font-semibold text-gray-900">Flexible PTO</h4>
                    <p class="text-gray-600 text-sm">Unlimited paid time off policy</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Related Jobs Section -->
            <div v-if="relatedJobs.length > 0" class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg class="w-6 h-6 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                Related Jobs in {{ job.category }}
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="relatedJob in relatedJobs" :key="relatedJob.id" 
                     class="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                     @click="navigateTo(`/jobs/${relatedJob.id}`)">
                  <h3 class="font-semibold text-gray-900 mb-2">{{ relatedJob.title }}</h3>
                  <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ relatedJob.details }}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-blue-600 font-medium">{{ relatedJob.category }}</span>
                    <span class="text-sm text-gray-500">{{ formatDate(relatedJob.expires_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-8 space-y-6">
              <!-- Quick Apply Card -->
              <div class="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg">
                <h3 class="text-xl font-bold mb-4">Quick Apply</h3>
                <p class="text-blue-100 mb-6 text-sm">
                  Ready to take the next step? Apply now and we'll get back to you within 24 hours.
                </p>
                <button @click="applyForJob" class="w-full bg-white hover:bg-gray-100 text-blue-600 py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Apply with Resume
                </button>
              </div>

              <!-- Job Summary -->
              <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Job Summary</h3>
                <div class="space-y-4">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Posted</span>
                    <span class="font-medium">{{ formatPostedDate(job.created_at) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Expires</span>
                    <span class="font-medium" :class="isExpiringSoon(job.expires_at) ? 'text-red-600' : ''">
                      {{ formatDate(job.expires_at) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Job Type</span>
                    <span class="font-medium">{{ job.job_type || 'Full-time' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Experience</span>
                    <span class="font-medium">{{ job.experience || '5+ years' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Salary</span>
                    <span class="font-medium">{{ job.salary || '$80k - $120k' }}</span>
                  </div>
                  <div v-if="job.remote_allowed !== undefined" class="flex justify-between">
                    <span class="text-gray-600">Remote Work</span>
                    <span class="font-medium" :class="job.remote_allowed ? 'text-green-600' : 'text-gray-600'">
                      {{ job.remote_allowed ? 'Available' : 'Not Available' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Skills Required -->
              <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Skills Required</h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="skill in getJobSkills" :key="skill" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {{ skill }}
                  </span>
                </div>
              </div>

              <!-- Share Job -->
              <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Share this job</h3>
                <div class="flex space-x-3">
                  <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200" title="Share on Twitter">
                    <svg class="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button class="flex-1 bg-blue-800 hover:bg-blue-900 text-white p-2 rounded-lg transition-colors duration-200" title="Share on LinkedIn">
                    <svg class="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button class="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-200" title="Share on WhatsApp">
                    <svg class="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.56-.01-.188 0-.495.074-.754.371-.26.297-.99.967-.99 2.357 0 1.39 1.013 2.732 1.155 2.921.142.19 2.001 3.053 4.848 4.283.677.292 1.206.466 1.616.596.681.213 1.301.183 1.791.111.546-.081 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.085"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container mx-auto px-4 py-16 text-center">
      <div class="max-w-md mx-auto">
        <svg class="w-24 h-24 mx-auto text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h2 class="text-2xl font-semibold text-gray-600 mb-2">Job not found</h2>
        <p class="text-gray-500 mb-6">The job you're looking for might have been removed or doesn't exist.</p>
        <button 
          @click="goBack"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          Back to Jobs
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useJobsStore } from '~/stores/jobs'

const route = useRoute()
const jobsStore = useJobsStore()

// Get job ID from route params
const jobId = computed(() => route.params.id)
const loading = ref(false)
const error = ref(null)

// Try to get job from store first, then fetch if not available
const job = computed(() => {
  return jobsStore.getJobById(jobId.value)
})

// Method to load job data
const loadJob = async () => {
  // First check if job exists in store
  if (job.value) {
    return // Job already available in store
  }

  // Job not in store, fetch it
  try {
    loading.value = true
    error.value = null
    await jobsStore.fetchJobById(jobId.value)
  } catch (err) {
    error.value = 'Job not found or failed to load'
    console.error('Error loading job:', err)
  } finally {
    loading.value = false
  }
}

// Load job when component mounts
onMounted(() => {
  loadJob()
})

// Watch for route changes (if user navigates to different job)
watch(jobId, () => {
  loadJob()
})

// Computed properties for easy access to job data
const jobTitle = computed(() => job.value?.title || '')
const jobDetails = computed(() => job.value?.details || '')
const jobCategory = computed(() => job.value?.category || '')
const jobExpiresAt = computed(() => job.value?.expires_at || '')

// You can also access related jobs from the same category
const relatedJobs = computed(() => {
  if (!job.value?.category) return []
  return jobsStore.getJobsByCategory(job.value.category)
    .filter(relatedJob => relatedJob.id !== jobId.value)
    .slice(0, 3) // Show only 3 related jobs
})

// Method to apply for job
const applyForJob = () => {
  // Your application logic here
  console.log('Applying for job:', job.value)
}

// Method to go back to jobs list
const goBack = () => {
  // Navigate back to jobs page with preserved filters
  const query = {}
  if (jobsStore.searchQuery) query.search = jobsStore.searchQuery
  if (jobsStore.selectedCategory) query.category = jobsStore.selectedCategory
  
  navigateTo({
    path: '/',
    query
  })
}
// Add these methods to your existing script:

// Method to get job skills - either from job data or default skills
const getJobSkills = computed(() => {
  if (job.value?.skills && Array.isArray(job.value.skills)) {
    return job.value.skills
  }
  if (job.value?.skills && typeof job.value.skills === 'string') {
    return job.value.skills.split(',').map(skill => skill.trim())
  }
  // Default skills based on category
  const defaultSkills = {
    'Technology': ['JavaScript', 'React', 'Node.js', 'CSS3', 'HTML5'],
    'Marketing': ['SEO', 'Google Analytics', 'Content Marketing', 'Social Media', 'PPC'],
    'Design': ['Figma', 'Adobe Creative Suite', 'UI/UX', 'Prototyping', 'Design Systems'],
    'Management': ['Leadership', 'Project Management', 'Strategy', 'Team Building', 'Communication'],
    'Sales': ['CRM', 'Lead Generation', 'Negotiation', 'Customer Relations', 'Sales Strategy'],
    'Finance': ['Excel', 'Financial Analysis', 'Accounting', 'Budgeting', 'Risk Management']
  }
  return defaultSkills[job.value?.category] || ['Communication', 'Problem Solving', 'Team Work', 'Adaptability']
})

// Method to format posted date
const formatPostedDate = (dateString) => {
  if (!dateString) return 'Recently'
  
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
  } else {
    const months = Math.floor(diffDays / 30)
    return months === 1 ? '1 month ago' : `${months} months ago`
  }
}

// Keep your existing utility methods and add these if you don't have them:
const formatDate = (dateString) => {
  if (!dateString) return 'Not specified'
  
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
  if (!dateString) return false
  
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
</script>