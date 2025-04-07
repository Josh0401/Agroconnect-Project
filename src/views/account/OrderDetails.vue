<template>
    <div>
      <!-- Button to open modal -->
      <button class="btn btn-sm text-muted" @click="openModal">
        <i class="bi bi-three-dots-vertical"></i>
      </button>
      
      <!-- Order Details Modal -->
      <div class="modal fade" ref="orderModal" tabindex="-1" aria-labelledby="orderDetailsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="orderDetailsModalLabel">Order Details - {{ order.productId }}</h5>
              <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- Order Summary -->
              <div class="card mb-4">
                <div class="card-header bg-light">
                  <h6 class="mb-0 fw-bold">Order Summary</h6>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3 mb-3">
                      <p class="text-muted mb-1 small">Order ID</p>
                      <p class="mb-0 fw-semibold">{{ order.productId }}</p>
                    </div>
                    <div class="col-md-3 mb-3">
                      <p class="text-muted mb-1 small">Date</p>
                      <p class="mb-0">{{ order.date }}</p>
                    </div>
                    <div class="col-md-3 mb-3">
                      <p class="text-muted mb-1 small">Status</p>
                      <span 
                        class="badge rounded-pill px-3 py-2" 
                        :class="order.status === 'Confirmed' ? 'bg-success' : 
                                 order.status === 'Pending' ? 'bg-secondary' : 
                                 order.status === 'Shipped' ? 'bg-primary' : 
                                 order.status === 'Delivered' ? 'bg-info' : 
                                 order.status === 'Cancelled' ? 'bg-danger' : 
                                 'bg-secondary'"
                      >
                        {{ order.status }}
                      </span>
                    </div>
                    <div class="col-md-3 mb-3">
                      <p class="text-muted mb-1 small">Expected Delivery</p>
                      <p class="mb-0">{{ expectedDeliveryDate }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Order Items and Details -->
              <div class="row">
                <!-- Left Column - Items -->
                <div class="col-md-7">
                  <div class="card mb-4">
                    <div class="card-header bg-light">
                      <h6 class="mb-0 fw-bold">Order Items</h6>
                    </div>
                    <div class="card-body p-0">
                      <div class="table-responsive">
                        <table class="table mb-0">
                          <thead class="table-light">
                            <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div class="d-flex align-items-center">
                                  <div class="ms-2">
                                    <p class="mb-0 fw-medium">{{ order.product }}</p>
                                    <p class="text-muted small mb-0">{{ order.productId }}</p>
                                  </div>
                                </div>
                              </td>
                              <td>₦{{ (order.total / order.quantity).toLocaleString() }}</td>
                              <td>{{ order.quantity }}</td>
                              <td>₦{{ order.total.toLocaleString() }}</td>
                            </tr>
                          </tbody>
                          <tfoot class="table-light">
                            <tr>
                              <td colspan="3" class="text-end fw-bold">Subtotal</td>
                              <td>₦{{ order.total.toLocaleString() }}</td>
                            </tr>
                            <tr>
                              <td colspan="3" class="text-end fw-bold">Shipping</td>
                              <td>₦{{ shippingCost.toLocaleString() }}</td>
                            </tr>
                            <tr>
                              <td colspan="3" class="text-end fw-bold">Tax</td>
                              <td>₦{{ taxAmount.toLocaleString() }}</td>
                            </tr>
                            <tr>
                              <td colspan="3" class="text-end fw-bold">Total</td>
                              <td class="fw-bold">₦{{ (order.total + shippingCost + taxAmount).toLocaleString() }}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
  
                <!-- Right Column - Delivery and Payment -->
                <div class="col-md-5">
                  <!-- Delivery Information -->
                  <div class="card mb-3">
                    <div class="card-header bg-light">
                      <h6 class="mb-0 fw-bold">Delivery Information</h6>
                    </div>
                    <div class="card-body">
                      <p class="fw-medium mb-1">{{ deliveryInfo.name }}</p>
                      <p class="mb-1">{{ deliveryInfo.address }}</p>
                      <p class="mb-1">{{ deliveryInfo.country }}, {{ deliveryInfo.zipCode }}</p>
                      <p class="mb-0">{{ deliveryInfo.phone }}</p>
                      
                      <hr class="my-3">
                      
                      <div v-if="order.status !== 'Delivered' && order.status !== 'Cancelled'">
                        <p class="mb-2 fw-medium">Delivery Status</p>
                        <div class="progress mb-2" style="height: 6px;">
                          <div 
                            class="progress-bar bg-success" 
                            :style="{ width: deliveryProgress + '%' }"
                            aria-valuenow="25" 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div class="d-flex justify-content-between small">
                          <span>Order Placed</span>
                          <span>Processing</span>
                          <span>Shipped</span>
                          <span>Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <!-- Payment Information -->
                  <div class="card">
                    <div class="card-header bg-light">
                      <h6 class="mb-0 fw-bold">Payment Information</h6>
                    </div>
                    <div class="card-body">
                      <div class="d-flex justify-content-between mb-2">
                        <span>Payment Method:</span>
                        <span>{{ paymentInfo.method }}</span>
                      </div>
                      <div class="d-flex justify-content-between mb-2">
                        <span>Transaction ID:</span>
                        <span>{{ paymentInfo.transactionId }}</span>
                      </div>
                      <div class="d-flex justify-content-between mb-2">
                        <span>Payment Date:</span>
                        <span>{{ order.date }}</span>
                      </div>
                      <div class="d-flex justify-content-between">
                        <span>Payment Status:</span>
                        <span class="badge bg-success rounded-pill px-3">Paid</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" @click="closeModal">Close</button>
              <button 
                v-if="order.status === 'Pending' || order.status === 'Processing' || order.status === 'Shipped'"
                type="button" 
                class="btn btn-success"
                @click="trackOrder"
              >
                Track Order
              </button>
              <button type="button" class="btn btn-primary" @click="reorder">Reorder</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // Import Bootstrap's modal functionality
  import { Modal } from 'bootstrap';
  
  export default {
    name: 'OrderDetails',
    props: {
      order: {
        type: Object,
        required: true
      },
      // Default delivery info can be overridden by parent component
      deliveryInfo: {
        type: Object,
        default: () => ({
          name: 'Joshua Joseph',
          address: '6140 Pari, Washington DC',
          country: 'United States',
          zipCode: '20033',
          phone: '+234 804 5555 7789'
        })
      },
      // Default payment info can be overridden by parent component
      paymentInfo: {
        type: Object,
        default: function() {
          return {
            method: 'Credit Card',
            transactionId: `#TXN${this.order?.id ? this.order.id + 5000 : '0000'}`
          };
        }
      }
    },
    data() {
      return {
        modal: null,
        shippingCost: 2000,
        taxAmount: 3000
      };
    },
    computed: {
      // Calculate expected delivery date (7 days after order date)
      expectedDeliveryDate() {
        const orderDate = new Date(this.order.date);
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(orderDate.getDate() + 7);
        
        return deliveryDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      },
      // Calculate delivery progress based on status
      deliveryProgress() {
        const statusMap = {
          'Pending': 25,
          'Processing': 50,
          'Shipped': 75,
          'Delivered': 100,
          'Confirmed': 50 // Same as processing for your case
        };
        
        return statusMap[this.order.status] || 0;
      }
    },
    mounted() {
      // Initialize Bootstrap modal
      this.modal = new Modal(this.$refs.orderModal);
    },
    methods: {
      openModal() {
        this.modal.show();
      },
      closeModal() {
        this.modal.hide();
      },
      trackOrder() {
        // Emit event to parent component
        this.$emit('track-order', this.order);
        this.closeModal();
      },
      reorder() {
        // Emit event to parent component
        this.$emit('reorder', this.order);
        this.closeModal();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Match the same styling from the main OrdersPage */
  .badge {
    font-weight: 500;
  }
  
  .card-header {
    padding: 0.75rem 1.25rem;
  }
  
  .btn-success {
    background-color: #14B8A6;
    border-color: #14B8A6;
  }
  
  .btn-success:hover {
    background-color: #0E9888;
    border-color: #0E9888;
  }
  
  .btn-primary {
    background-color: #6a5acd;
    border-color: #6a5acd;
  }
  
  .btn-primary:hover {
    background-color: #5849b8;
    border-color: #5849b8;
  }
  
  .modal-header, .modal-footer {
    border-color: #e0e0e0;
  }
  
  /* Progress bar labels styling */
  .progress {
    border-radius: 10px;
  }
  
  .progress-bar {
    border-radius: 10px;
  }
  </style>