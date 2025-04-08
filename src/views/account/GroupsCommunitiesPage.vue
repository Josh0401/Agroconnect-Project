<template>
    <div class="container-fluid h-100">
      <div class="row h-100">
        <!-- Sidebar - similar to other account pages -->
        <div class="col-md-3 col-lg-2 bg-light sidebar py-3">
          <div class="d-flex align-items-center pb-3 mb-3 border-bottom">
            <router-link to="/market" class="text-decoration-none">
              <img
                src="../../assets/Agroconnect.png"
                alt="AgroEase Logo"
                height="40"
                class="me-2"
              />
            </router-link>
          </div>
          
          <ul class="nav flex-column">
            <li class="nav-item">
            <router-link to="/market" class="nav-link text-dark">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart me-2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {{ t.backToMarketplace || 'Back to Marketplace' }}
            </router-link>
          </li>
            <li class="nav-item">
              <router-link to="/account/profile" class="nav-link text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user me-2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {{ t.profile || 'Profile' }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/account/orders" class="nav-link text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag me-2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {{ t.orders || 'Orders' }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/account/transactions" class="nav-link text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-credit-card me-2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                {{ t.transactions || 'Transactions' }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/account/groups-communities" class="nav-link active bg-success text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users me-2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                {{ t.groupsCommunities || 'Groups' }}
              </router-link>
            </li>
            <li class="nav-item mt-4">
              <a href="/login" class="nav-link text-dark" @click.prevent="logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out me-2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                {{ t.logout || 'Logout' }}
              </a>
            </li>
          </ul>
        </div>
  
        <!-- Main Content -->
        <div class="col-md-9 col-lg-10 p-4">
          <div class="container">
            <h2 class="mb-4">{{ t.groupsCommunities || 'Groups & Communities' }}</h2>
            
            <!-- Tabs for different views -->
            <ul class="nav nav-tabs mb-4">
              <li class="nav-item">
                <a class="nav-link" id="act" :class="{ active: activeTab === 'myGroups' }" href="#myGroups" data-bs-toggle="tab" @click="activeTab = 'myGroups'">{{ t.myGroups || 'My Groups' }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="act" :class="{ active: activeTab === 'discover' }" href="#discover" data-bs-toggle="tab" @click="activeTab = 'discover'">{{ t.discover || 'Discover' }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="act" :class="{ active: activeTab === 'createGroup' }" href="#createGroup" data-bs-toggle="tab" @click="activeTab = 'createGroup'">{{ t.createNew || 'Create New' }}</a>
              </li>
            </ul>
            
            <!-- Tab content -->
            <div class="tab-content">
              <!-- My Groups tab -->
              <div class="tab-pane fade" :class="{ 'show active': activeTab === 'myGroups' }" id="myGroups">
                <div class="row mb-4">
                  <div class="col-12">
                    <!-- Empty state or groups list -->
                    <div v-if="myGroups.length === 0" class="text-center p-5 bg-light rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users mb-3 text-muted">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <h4>{{ t.noGroupsYet || 'You haven\'t joined any groups yet' }}</h4>
                      <p class="text-muted">{{ t.discoverGroupsMsg || 'Discover and join agricultural communities to connect with farmers and experts' }}</p>
                      <button class="btn btn-success mt-2" @click="activeTab = 'discover'">
                        {{ t.discoverGroups || 'Discover Groups' }}
                      </button>
                    </div>
  
                    <!-- List of joined groups (show when there are groups) -->
                    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                      <div v-for="(group, index) in myGroups" :key="index" class="col">
                        <div class="card h-100">
                          <div class="card-body">
                            <h5 class="card-title">{{ group.name }}</h5>
                            <p class="card-text text-muted">{{ group.members }} {{ t.members || 'members' }}</p>
                            <p class="card-text">{{ group.description }}</p>
                          </div>
                          <div class="card-footer bg-white border-0">
                            <button class="btn btn-sm btn-success" @click="openGroupChat(group.id)">{{ t.viewGroup || 'View Group' }}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Discover tab -->
              <div class="tab-pane fade" :class="{ 'show active': activeTab === 'discover' }" id="discover">
                <!-- Search and filters -->
                <div class="row mb-4">
                  <div class="col-md-8">
                    <div class="input-group">
                      <input type="text" class="form-control" :placeholder="t.searchGroups || 'Search groups...'" v-model="searchQuery">
                      <button class="btn btn-success" type="button" @click="searchGroups">{{ t.search || 'Search' }}</button>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <select class="form-select" v-model="filterCategory" @change="filterGroups">
                      <option value="all">{{ t.allCategories || 'All Categories' }}</option>
                      <option value="Crops">{{ t.crops || 'Crops' }}</option>
                      <option value="Livestock">{{ t.livestock || 'Livestock' }}</option>
                      <option value="Technology">{{ t.technology || 'Technology' }}</option>
                      <option value="Markets">{{ t.markets || 'Markets' }}</option>
                    </select>
                  </div>
                </div>
                
                <!-- List of public groups -->
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                  <div v-for="(group, index) in filteredGroups" :key="index" class="col">
                    <div class="card h-100">
                      <div class="card-body">
                        <span class="badge bg-light text-success mb-2">{{ group.category }}</span>
                        <h5 class="card-title">{{ group.name }}</h5>
                        <p class="card-text text-muted">{{ group.members }} {{ t.members || 'members' }}</p>
                        <p class="card-text">{{ group.description }}</p>
                      </div>
                      <div class="card-footer bg-white border-0">
                        <button class="btn btn-sm btn-success" @click="joinGroup(group.id)">{{ t.join || 'Join' }}</button>
                        <button class="btn btn-sm btn-outline-secondary ms-2" @click="showGroupDetails(group)">{{ t.learnMore || 'Learn More' }}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Create New Group tab -->
              <div class="tab-pane fade" :class="{ 'show active': activeTab === 'createGroup' }" id="createGroup">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title mb-4">{{ t.createNewGroup || 'Create a New Community Group' }}</h5>
                    <form @submit.prevent="createGroup">
                      <div class="mb-3">
                        <label for="groupName" class="form-label">{{ t.groupName || 'Group Name' }}*</label>
                        <input type="text" class="form-control" id="groupName" required v-model="newGroup.name">
                      </div>
                      
                      <div class="mb-3">
                        <label for="groupCategory" class="form-label">{{ t.category || 'Category' }}*</label>
                        <select class="form-select" id="groupCategory" required v-model="newGroup.category">
                          <option value="Crops">{{ t.crops || 'Crops' }}</option>
                          <option value="Livestock">{{ t.livestock || 'Livestock' }}</option>
                          <option value="Technology">{{ t.technology || 'Technology' }}</option>
                          <option value="Markets">{{ t.markets || 'Markets' }}</option>
                          <option value="Education">{{ t.education || 'Education' }}</option>
                          <option value="Other">{{ t.other || 'Other' }}</option>
                        </select>
                      </div>
                      
                      <div class="mb-3">
                        <label for="groupDescription" class="form-label">{{ t.groupDescription || 'Description' }}*</label>
                        <textarea class="form-control" id="groupDescription" rows="4" required v-model="newGroup.description"></textarea>
                      </div>
                      
                      <div class="mb-3">
                        <label for="groupPrivacy" class="form-label">{{ t.privacySettings || 'Privacy Settings' }}*</label>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="privacyOptions" id="publicGroup" value="public" v-model="newGroup.privacy" checked>
                          <label class="form-check-label" for="publicGroup">
                            {{ t.publicGroup || 'Public - Anyone can see and join the group' }}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="privacyOptions" id="privateGroup" value="private" v-model="newGroup.privacy">
                          <label class="form-check-label" for="privateGroup">
                            {{ t.privateGroup || 'Private - Only members can see content, requires approval to join' }}
                          </label>
                        </div>
                      </div>
                      
                      <div class="mb-3">
                        <label for="groupImage" class="form-label">{{ t.groupImage || 'Group Image' }}</label>
                        <input type="file" class="form-control" id="groupImage">
                      </div>
                      
                      <div class="mb-3">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="termsAgree" required>
                          <label class="form-check-label" for="termsAgree">
                            {{ t.agreeToTerms || 'I agree to the community guidelines and terms of service' }}
                          </label>
                        </div>
                      </div>
                      
                      <button type="submit" class="btn btn-success">{{ t.createGroup || 'Create Group' }}</button>
                      <button type="button" class="btn btn-outline-secondary ms-2" @click="cancelCreate">{{ t.cancel || 'Cancel' }}</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Group Details Modal -->
    <div class="modal fade" id="groupDetailsModal" tabindex="-1" aria-labelledby="groupDetailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="groupDetailsModalLabel">{{ selectedGroup.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <div class="card border-0">
                  <div class="card-body text-center">
                    <div class="bg-light p-3 rounded-circle d-inline-block mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users text-success">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h5>{{ selectedGroup.members }} {{ t.members || 'members' }}</h5>
                    <p class="text-muted">{{ selectedGroup.createdDate }}</p>
                    <span class="badge bg-light text-success">{{ selectedGroup.category }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <h5>{{ t.about || 'About' }}</h5>
                <p>{{ selectedGroup.description }}</p>
                
                <h5 class="mt-4">{{ t.groupRules || 'Group Rules' }}</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item border-0 ps-0" v-for="(rule, index) in selectedGroup.rules" :key="index">
                    <strong>{{ index + 1 }}.</strong> {{ rule }}
                  </li>
                </ul>
                
                <h5 class="mt-4">{{ t.recentActivities || 'Recent Activities' }}</h5>
                <div class="list-group">
                  <div class="list-group-item border-0 ps-0" v-for="(activity, index) in selectedGroup.recentActivities" :key="index">
                    <small class="text-muted">{{ activity.date }}</small>
                    <p class="mb-0">{{ activity.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">{{ t.close || 'Close' }}</button>
            <button type="button" class="btn btn-success" @click="joinGroup(selectedGroup.id)">{{ t.joinGroup || 'Join Group' }}</button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Group Chat Modal -->
    <div class="modal fade" id="groupChatModal" tabindex="-1" aria-labelledby="groupChatModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-fullscreen-lg-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="groupChatModalLabel">{{ currentChatGroup.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-0">
            <div class="container-fluid">
              <div class="row">
                <!-- Member list sidebar -->
                <div class="col-md-3 border-end p-0">
                  <div class="p-3 bg-light">
                    <h6 class="mb-2">{{ t.members || 'Members' }} ({{ currentChatGroup.members }})</h6>
                    <div class="input-group input-group-sm mb-2">
                      <input type="text" class="form-control" :placeholder="t.searchMembers || 'Search members...'">
                      <button class="btn btn-outline-secondary" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="member-list overflow-auto" style="max-height: 400px;">
                    <div v-for="(member, index) in currentChatGroup.memberList" :key="index" class="d-flex align-items-center p-2 border-bottom">
                      <div class="flex-shrink-0">
                        <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                          {{ member.name.charAt(0) }}
                        </div>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <p class="mb-0">{{ member.name }}</p>
                        <small class="text-muted">{{ member.status }}</small>
                      </div>
                      <div v-if="member.isAdmin" class="ms-auto">
                        <span class="badge bg-success">Admin</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Chat area -->
                <div class="col-md-9 p-0 d-flex flex-column" style="height: 70vh;">
                  <!-- Chat messages -->
                  <div class="flex-grow-1 p-3 overflow-auto" style="max-height: calc(70vh - 80px);">
                    <div v-for="(message, index) in currentChatGroup.messages" :key="index" class="mb-3">
                      <div :class="message.isOwnMessage ? 'ms-auto text-end' : ''">
                        <small class="text-muted d-block">{{ message.sender }} - {{ message.time }}</small>
                        <div :class="[
                          'p-3 rounded-3 d-inline-block', 
                          message.isOwnMessage ? 'bg-success text-white' : 'bg-light'
                        ]" style="max-width: 75%;">
                          {{ message.content }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Chat input -->
                  <div class="border-top p-3">
                    <div class="input-group">
                      <input type="text" class="form-control" :placeholder="t.typeMessage || 'Type a message...'" v-model="newMessage">
                      <button class="btn btn-success" type="button" @click="sendMessage">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        {{ t.send || 'Send' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { translations } from "../../translations";
  import { Modal, Tab } from 'bootstrap';
  
  export default {
    name: "GroupsCommunitiesPage",
    data() {
      return {
        // Language properties
        currentLanguage: 'en',
        t: translations.en,
        
        // Tab control
        activeTab: 'myGroups',
        
        // Group data
        myGroups: [
          {
            id: 1,
            name: "Urban Farmers Network",
            category: "Crops",
            members: 147,
            description: "A community of urban farmers sharing tips, challenges and successes in city farming.",
            lastActive: "2 hours ago"
          },
          {
            id: 2,
            name: "Sustainable Agriculture Forum",
            category: "Technology",
            members: 283,
            description: "Discussing sustainable farming practices and eco-friendly agricultural technologies.",
            lastActive: "Yesterday"
          }
        ],
        searchQuery: '',
        filterCategory: 'all',
        
        // Sample discover groups data
        allDiscoverGroups: [
          {
            id: 3,
            name: "Organic Farming Collective",
            category: "Crops",
            members: 328,
            description: "A community of farmers practicing organic and sustainable farming methods.",
            createdDate: "Founded Jan 2023",
            rules: [
              "Share knowledge respectfully",
              "No promotion of harmful chemicals",
              "Support beginners with constructive advice"
            ],
            recentActivities: [
              { date: "Apr 2, 2025", description: "Webinar on natural pest control methods" },
              { date: "Mar 28, 2025", description: "New resource guide on organic certification" },
              { date: "Mar 15, 2025", description: "Group discussion on companion planting" }
            ]
          },
          {
            id: 4,
            name: "Livestock Innovations",
            category: "Livestock",
            members: 145,
            description: "Discussing modern approaches to livestock management and welfare.",
            createdDate: "Founded Mar 2024",
            rules: [
              "Focus on animal welfare in all discussions",
              "Share science-based information only",
              "Respect different farming approaches"
            ],
            recentActivities: [
              { date: "Apr 5, 2025", description: "Virtual tour of an innovative cattle farm" },
              { date: "Mar 30, 2025", description: "Discussion on sustainable feed options" },
              { date: "Mar 22, 2025", description: "Webinar on livestock health monitoring technology" }
            ]
          },
          {
            id: 5,
            name: "AgriTech Forum",
            category: "Technology",
            members: 532,
            description: "Exploring new technologies and innovations in agriculture.",
            createdDate: "Founded Nov 2022",
            rules: [
              "Share knowledge in an accessible way for all tech levels",
              "No promotional posts without admin approval",
              "Credit sources for shared information"
            ],
            recentActivities: [
              { date: "Apr 7, 2025", description: "Discussion on new drone mapping technology" },
              { date: "Apr 3, 2025", description: "Expert AMA on IoT for small-scale farming" },
              { date: "Mar 25, 2025", description: "Shared resource guide on affordable farm tech" }
            ]
          },
          {
            id: 6,
            name: "Market Trends & Pricing",
            category: "Markets",
            members: 267,
            description: "Stay updated on market trends, pricing, and distribution channels.",
            createdDate: "Founded Jun 2023",
            rules: [
              "Share market information with supporting evidence",
              "No price fixing or collusion discussions",
              "Respect confidential business information"
            ],
            recentActivities: [
              { date: "Apr 6, 2025", description: "Monthly price trend report posted" },
              { date: "Apr 1, 2025", description: "Discussion on new export opportunities" },
              { date: "Mar 20, 2025", description: "Webinar on direct-to-consumer sales channels" }
            ]
          },
          {
            id: 7,
            name: "Sustainable Irrigation",
            category: "Crops",
            members: 184,
            description: "Water conservation techniques and sustainable irrigation systems.",
            createdDate: "Founded Sep 2023",
            rules: [
              "Focus on water conservation and sustainability",
              "Share practical implementation tips",
              "Provide references for technical information"
            ],
            recentActivities: [
              { date: "Apr 4, 2025", description: "Case study on drip irrigation implementation" },
              { date: "Mar 27, 2025", description: "Discussion on rainwater harvesting systems" },
              { date: "Mar 18, 2025", description: "Virtual workshop on irrigation scheduling" }
            ]
          },
          {
            id: 8,
            name: "Urban Farming Network",
            category: "Crops",
            members: 219,
            description: "Connecting urban farmers and discussing city farming challenges.",
            createdDate: "Founded Apr 2024",
            rules: [
              "Respect space constraints and urban regulations in advice",
              "Share resources accessible to urban environments",
              "Support inclusive community garden initiatives"
            ],
            recentActivities: [
              { date: "Apr 5, 2025", description: "Virtual tour of rooftop garden in Berlin" },
              { date: "Mar 31, 2025", description: "Discussion on dealing with city regulations" },
              { date: "Mar 24, 2025", description: "Resource guide on container gardening" }
            ]
          }
        ],
        filteredGroups: [],
        
        // Selected group for details
        selectedGroup: {
          id: null,
          name: '',
          category: '',
          members: 0,
          description: '',
          createdDate: '',
          rules: [],
          recentActivities: []
        },
        
        // Current group for chat
        currentChatGroup: {
          id: null,
          name: '',
          members: 0,
          memberList: [],
          messages: []
        },
        
        // New message
        newMessage: '',
        
        // New group form data
        newGroup: {
          name: '',
          category: 'Crops',
          description: '',
          privacy: 'public'
        }
      };
    },
    methods: {
      // Group creation
      createGroup() {
        // Here you would implement the API call to create a new group
        alert('Group created successfully!');
        // Reset form after submission
        this.newGroup = {
          name: '',
          category: 'Crops',
          description: '',
          privacy: 'public'
        };
        // Switch to My Groups tab
        this.activeTab = 'myGroups';
      },
      
      cancelCreate() {
        // Reset form and go back to My Groups
        this.newGroup = {
          name: '',
          category: 'Crops',
          description: '',
          privacy: 'public'
        };
        this.activeTab = 'myGroups';
      },
      
      // Group chat functionality
      openGroupChat(groupId) {
        // Find the group data
        const group = this.myGroups.find(g => g.id === groupId);
        
        if (group) {
          // Set up chat data
          this.currentChatGroup = {
            id: group.id,
            name: group.name,
            members: group.members,
            memberList: [
              { name: "Jane Smith", status: "Online", isAdmin: true },
              { name: "John Doe", status: "Online", isOnline: true },
              { name: "Michael Brown", status: "Last seen 1hr ago" },
              { name: "Sara Wilson", status: "Last seen yesterday" },
              { name: "Robert Johnson", status: "Online", isOnline: true },
              { name: "Emma Davis", status: "Last seen 3hrs ago" },
              { name: "David Miller", status: "Online", isOnline: true }
            ],
            messages: [
              { sender: "System", content: "Welcome to the " + group.name + " group chat!", time: "9:00 AM", isOwnMessage: false },
              { sender: "Jane Smith", content: "Has anyone tried the new organic fertilizer from GreenLife?", time: "9:15 AM", isOwnMessage: false },
              { sender: "John Doe", content: "Yes, I've been using it for my tomatoes. The results are excellent!", time: "9:20 AM", isOwnMessage: false },
              { sender: "You", content: "I'm planning to try it next month. Any tips for first-time users?", time: "9:25 AM", isOwnMessage: true },
              { sender: "Jane Smith", content: "Start with half the recommended amount and increase gradually. It's quite potent.", time: "9:30 AM", isOwnMessage: false },
              { sender: "Michael Brown", content: "Also, it works best when applied in the evening. I learned that the hard way!", time: "9:35 AM", isOwnMessage: false },
              { sender: "You", content: "Thanks for the tips! I'll keep that in mind.", time: "9:40 AM", isOwnMessage: true }
            ]
          };
          
          // Two options:
          // 1. Show the modal chat (current implementation)
          const chatModalEl = document.getElementById('groupChatModal');
          if (chatModalEl) {
            const chatModal = new Modal(chatModalEl);
            chatModal.show();
          }
          
          // 2. Alternative: Navigate to a dedicated chat page (commented out for now)
          // this.$router.push(`/account/groups-communities/chat/${groupId}`);
        }
      },
      
      sendMessage() {
        if (this.newMessage.trim() !== '') {
          // Add the new message to the chat
          this.currentChatGroup.messages.push({
            sender: "You",
            content: this.newMessage,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            isOwnMessage: true
          });
          
          // Clear the input
          this.newMessage = '';
          
          // Simulate a response after a delay (for demo purposes)
          setTimeout(() => {
            this.currentChatGroup.messages.push({
              sender: "Jane Smith",
              content: "Thanks for sharing! Anyone else have experience with this?",
              time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
              isOwnMessage: false
            });
          }, 2000);
        }
      },
      
      // Group discovery functionality
      showGroupDetails(group) {
        this.selectedGroup = group;
        const detailsModalEl = document.getElementById('groupDetailsModal');
        if (detailsModalEl) {
          const detailsModal = new Modal(detailsModalEl);
          detailsModal.show();
        }
      },
      
      joinGroup(groupId) {
        // Find the group in the discover list
        const group = this.allDiscoverGroups.find(g => g.id === groupId);
        
        if (group) {
          // Check if already joined
          const alreadyJoined = this.myGroups.some(g => g.id === groupId);
          
          if (!alreadyJoined) {
            // Add to my groups
            this.myGroups.push({
              id: group.id,
              name: group.name,
              category: group.category,
              members: group.members + 1, // Increment as we're joining
              description: group.description,
              lastActive: "Just now"
            });
            
            // Update the member count in the discover list
            group.members += 1;
            
            // Show confirmation
            alert('You have successfully joined the group!');
            
            // Switch to My Groups tab
            this.activeTab = 'myGroups';
            
            // Close modal if open
            const modalElement = document.getElementById('groupDetailsModal');
            if (modalElement) {
              const modal = Modal.getInstance(modalElement);
              if (modal) {
                modal.hide();
              }
            }
          } else {
            alert('You are already a member of this group');
          }
        }
      },
      
      // Search and filter
      searchGroups() {
        this.filterGroups();
      },
      
      filterGroups() {
        if (this.filterCategory === 'all' && this.searchQuery === '') {
          // No filters applied, show all
          this.filteredGroups = [...this.allDiscoverGroups];
        } else {
          // Apply filters
          this.filteredGroups = this.allDiscoverGroups.filter(group => {
            // Category filter
            const categoryMatch = this.filterCategory === 'all' || group.category === this.filterCategory;
            
            // Search filter
            const searchMatch = this.searchQuery === '' || 
                                group.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                                group.description.toLowerCase().includes(this.searchQuery.toLowerCase());
            
            return categoryMatch && searchMatch;
          });
        }
      },
      
      logout() {
        // Implement logout functionality
        this.$router.push('/login');
      }
    },
    mounted() {
      // Load saved language preference if available
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang && translations[savedLang]) {
        this.currentLanguage = savedLang;
        this.t = translations[savedLang];
      }
      
      // Initialize the filtered groups
      this.filteredGroups = [...this.allDiscoverGroups];
      
      // Initialize Bootstrap components
      this.$nextTick(() => {
        // Initialize any Bootstrap components that need JS initialization
        const tabElements = document.querySelectorAll('[data-bs-toggle="tab"]');
        tabElements.forEach(tabEl => {
          new Tab(tabEl);
        });
      });
    },
    
    // Add watch to handle tab changes from buttons
    watch: {
      activeTab(newTab) {
        // Activate the corresponding bootstrap tab
        const tabTrigger = document.querySelector(`[href="#${newTab}"]`);
        if (tabTrigger) {
          const bsTab = new Tab(tabTrigger);
          bsTab.show();
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .sidebar {
    min-height: 100vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    color:#198754 !important;
  }
  
  .nav-link:hover {
    background-color: #f8f9fa;
  }
  
  .nav-link.active {
    font-weight: bold;
    color:#fff !important;
  }

  .nav-link#act {
    font-weight: bold;
    color:#198754 !important;
  }
  .feather {
    width: 16px;
    height: 16px;
  }
  
  .card {
    transition: transform 0.2s ease;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  /* Chat styles */
  .member-list {
    max-height: 60vh;
  }
  
  /* Responsive adjustments for mobile */
  @media (max-width: 768px) {
    .sidebar {
      min-height: auto;
    }
    
    .member-list {
      max-height: 200px;
    }
  }
  </style>