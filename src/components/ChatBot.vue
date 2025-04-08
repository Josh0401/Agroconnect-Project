<!-- Improved ChatBot.vue with better multilingual support -->
<template>
    <div class="chatbot-container" :class="{ 'is-open': isChatOpen }">
      <!-- Chat Button -->
      <button 
        class="chat-button" 
        @click="toggleChat"
        :aria-label="t.chatWithUs || 'Chat with us'"
      >
        <div v-if="!isChatOpen" class="chat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div v-else class="close-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </button>
  
      <!-- Chat Panel -->
      <div class="chat-panel" v-show="isChatOpen">
        <div class="chat-header">
          <div class="chat-title">
            <img src="../assets/Agroconnect.png" height="24" class="me-2" />
            <span>{{ t.chatWithUs || 'Chat with us' }}</span>
          </div>
          
          <!-- Language selector in chat header -->
          <div class="chat-language-selector">
            <select v-model="chatLanguage" @change="changeLanguage" class="language-select">
              <option value="en">🇬🇧 EN</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="es">🇪🇸 ES</option>
              <option value="km">🇲🇺 KM</option>
            </select>
          </div>
        </div>
        
        <div class="chat-messages" ref="chatMessages">
          <div v-for="(message, index) in messages" :key="index" 
               :class="['message', message.sender === 'bot' ? 'bot-message' : 'user-message']">
            <div class="message-content">{{ message.text }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
          <div v-if="isTyping" class="message bot-message typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <div class="chat-input">
          <input 
            type="text" 
            v-model="userInput" 
            @keyup.enter="sendMessage"
            :placeholder="t.typeMessage || 'Type your message...'"
          />
          <button @click="sendMessage" class="send-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChatBot',
    props: {
      t: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        isChatOpen: false,
        userInput: '',
        isTyping: false,
        chatLanguage: 'en', // Default language
        messages: [],
        lastResponseType: '', // Track the type of last bot response
        chatResponses: {
          en: {
            welcomeMessage: 'Hello! How can I help you with your agricultural shopping today?',
            greeting: 'Hello! How can I help you today?',
            productRecommendation: 'Based on current trends, our Hybrid Coconut Seedlings and White Maize are very popular choices!',
            shippingInfo: 'We typically deliver within 3-5 business days. Shipping costs depend on your location and order size.',
            paymentInfo: 'We accept credit cards, digital wallets, and bank transfers. All payments are secured with industry-standard encryption.',
            discountInfo: 'We currently have a 10% discount on first-time orders. Use code WELCOME10 at checkout!',
            contactInfo: 'You can reach our customer support at support@agroconnect.com or call us at +1-234-567-8900.',
            returnPolicy: 'We offer a 30-day return policy for most products. Please check our Return Policy page for detailed information.',
            thanksResponse: "You're welcome! It's my pleasure to assist you. Is there anything else I can help you with?",
            yesResponse: "Great! What would you like to know more about? Our products, shipping, payment options, or something else?",
            noResponse: "Alright! Thank you for chatting with us today. Feel free to come back anytime you have questions about our agricultural products!",
            fallbackResponse: "I'm not sure I understand that question. Can you try rephrasing it, or ask about our products, shipping, payment options, or special offers?",
            typeMessage: 'Type your message...',
            chatWithUs: 'Chat with us'
          },
          fr: {
            welcomeMessage: 'Bonjour ! Comment puis-je vous aider avec vos achats agricoles aujourd\'hui ?',
            greeting: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
            productRecommendation: 'Selon les tendances actuelles, nos Plants de Cocotier Hybride et Maïs Blanc sont des choix très populaires !',
            shippingInfo: 'Nous livrons généralement dans un délai de 3 à 5 jours ouvrables. Les frais d\'expédition dépendent de votre emplacement et de la taille de votre commande.',
            paymentInfo: 'Nous acceptons les cartes de crédit, les portefeuilles numériques et les virements bancaires. Tous les paiements sont sécurisés avec un cryptage aux normes industrielles.',
            discountInfo: 'Nous offrons actuellement une remise de 10% sur les premières commandes. Utilisez le code WELCOME10 lors du paiement !',
            contactInfo: 'Vous pouvez joindre notre service client à support@agroconnect.com ou nous appeler au +1-234-567-8900.',
            returnPolicy: 'Nous offrons une politique de retour de 30 jours pour la plupart des produits. Veuillez consulter notre page Politique de retour pour des informations détaillées.',
            thanksResponse: "De rien ! C'est un plaisir de vous aider. Y a-t-il autre chose que je puisse faire pour vous ?",
            yesResponse: "Parfait ! Sur quoi aimeriez-vous en savoir plus ? Nos produits, la livraison, les options de paiement, ou autre chose ?",
            noResponse: "D'accord ! Merci d'avoir discuté avec nous aujourd'hui. N'hésitez pas à revenir quand vous aurez des questions sur nos produits agricoles !",
            fallbackResponse: "Je ne suis pas sûr de comprendre cette question. Pouvez-vous la reformuler, ou demander des informations sur nos produits, l'expédition, les options de paiement ou les offres spéciales ?",
            typeMessage: 'Tapez votre message...',
            chatWithUs: 'Discutez avec nous'
          },
          es: {
            welcomeMessage: '¡Hola! ¿Cómo puedo ayudarte hoy con tus compras agrícolas?',
            greeting: '¡Hola! ¿Cómo puedo ayudarte hoy?',
            productRecommendation: '¡Según las tendencias actuales, nuestras Plántulas de Coco Híbrido y Maíz Blanco son opciones muy populares!',
            shippingInfo: 'Normalmente entregamos en 3-5 días hábiles. Los costos de envío dependen de su ubicación y del tamaño del pedido.',
            paymentInfo: 'Aceptamos tarjetas de crédito, billeteras digitales y transferencias bancarias. Todos los pagos están protegidos con encriptación estándar de la industria.',
            discountInfo: '¡Actualmente tenemos un 10% de descuento en pedidos por primera vez. Use el código WELCOME10 al finalizar la compra!',
            contactInfo: 'Puede contactar con nuestro servicio de atención al cliente en support@agroconnect.com o llamarnos al +1-234-567-8900.',
            returnPolicy: 'Ofrecemos una política de devolución de 30 días para la mayoría de los productos. Consulte nuestra página de Política de devoluciones para obtener información detallada.',
            thanksResponse: "¡De nada! Es un placer ayudarte. ¿Hay algo más en lo que pueda asistirte?",
            yesResponse: "¡Excelente! ¿Sobre qué te gustaría saber más? ¿Nuestros productos, envíos, opciones de pago, o algo más?",
            noResponse: "¡Muy bien! Gracias por chatear con nosotros hoy. No dudes en volver cuando tengas preguntas sobre nuestros productos agrícolas.",
            fallbackResponse: "No estoy seguro de entender esa pregunta. ¿Puede reformularla o preguntar sobre nuestros productos, envío, opciones de pago u ofertas especiales?",
            typeMessage: 'Escribe tu mensaje...',
            chatWithUs: 'Chatea con nosotros'
          },
          km: {
            welcomeMessage: 'Bonzour! Kuma mo kapav ed ou avek ou bann lachat agrikol zordi?',
            greeting: 'Bonzour! Kuma mo kapav ed ou zordi?',
            productRecommendation: 'Dapre bann tandans aktyel, nou bann Plan Koko Ibrid ek Mayi Blan zot bann swa ki bien popiler!',
            shippingInfo: 'Normalman nou livre dan 3-5 zour travay. Fre livrezon depann lor ou landrwa ek dimansyon ou komand.',
            paymentInfo: 'Nou aksepte kart kredi, porfeye nimerik, ek transfer labank. Tou bann peman sekirize avek ankripsyon nivo indistriyel.',
            discountInfo: 'Aktyelman nou ena enn rabe 10% lor premye komand. Servi kod WELCOME10 kan ou pe peye!',
            contactInfo: 'Ou kapav kontakte nou sipor klian lor support@agroconnect.com ousa apel nou lor +1-234-567-8900.',
            returnPolicy: 'Nou ofer enn politik retour 30 zour pou laplipar prodwi. Tanpri verifye nou paz Politik Retour pou plis detay.',
            thanksResponse: "Pa gagne traka! Li enn plezir pou ed ou. Ena lezot zafer mo kapav fer pou ou?",
            yesResponse: "Bien! Ki zafer ou ti anvi kone plis? Nou bann prodwi, livrezon, fason pou peye, ou lezot kiksoz?",
            noResponse: "Dakor! Mersi pou finn koze avek nou zordi. Pa ezite retourn kan ou ena kestion lor nou bann prodwi agrikol!",
            fallbackResponse: "Mo pa sir mo konpran sa kestion la. Eski ou kapav reekrir li, ousa demann lor nou bann prodwi, livrezon, opsyon peman, ou bann lofer spesial?",
            typeMessage: 'Tap ou mesaz...',
            chatWithUs: 'Koze avek nou'
          }
        }
      };
    },
    methods: {
      toggleChat() {
        this.isChatOpen = !this.isChatOpen;
      },
      
      sendMessage() {
        if (!this.userInput.trim()) return;
        
        // Add user message
        this.messages.push({
          text: this.userInput,
          sender: 'user',
          timestamp: new Date()
        });
        
        const userQuestion = this.userInput;
        this.userInput = '';
        
        // Simulate bot typing
        this.isTyping = true;
        
        // Scroll to bottom
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        
        // Process the message and get response
        setTimeout(() => {
          this.processBotResponse(userQuestion);
        }, 1000);
      },
      
      processBotResponse(question) {
        // Get responses based on current chat language
        const responses = this.chatResponses[this.chatLanguage];
        
        let botResponse = '';
        const lowerCaseQuestion = question.toLowerCase();
        
        // Define multilingual keyword map
        const keywordMap = {
          greetings: {
            en: ['hi', 'hello', 'hey', 'greetings'],
            fr: ['bonjour', 'salut', 'coucou', 'bonsoir'],
            es: ['hola', 'buenos dias', 'buenas', 'saludos'],
            km: ['bonzour', 'salam', 'kuma ou le', 'ki manera']
          },
          products: {
            en: ['product', 'recommend', 'suggestion', 'popular'],
            fr: ['produit', 'recommand', 'suggestion', 'populaire'],
            es: ['producto', 'recomiend', 'sugerencia', 'popular'],
            km: ['prodwi', 'rekomand', 'sijesion', 'popiler']
          },
          shipping: {
            en: ['shipping', 'delivery', 'ship', 'arrive'],
            fr: ['expédition', 'livraison', 'envoyer', 'arriver'],
            es: ['envío', 'entrega', 'enviar', 'llegar'],
            km: ['livrezon', 'expedision', 'anvway', 'arive']
          },
          payment: {
            en: ['payment', 'pay', 'money', 'card'],
            fr: ['paiement', 'payer', 'argent', 'carte'],
            es: ['pago', 'pagar', 'dinero', 'tarjeta'],
            km: ['peman', 'peye', 'larzan', 'kart']
          },
          discount: {
            en: ['discount', 'offer', 'sale', 'coupon'],
            fr: ['réduction', 'offre', 'vente', 'coupon'],
            es: ['descuento', 'oferta', 'venta', 'cupón'],
            km: ['rabé', 'lofer', 'promosion', 'kupan']
          },
          contact: {
            en: ['contact', 'support', 'help', 'reach'],
            fr: ['contact', 'support', 'aide', 'joindre'],
            es: ['contacto', 'soporte', 'ayuda', 'contactar'],
            km: ['kontak', 'sipor', 'led', 'zwen']
          },
          returns: {
            en: ['return', 'refund', 'cancel', 'money back'],
            fr: ['retour', 'remboursement', 'annuler', 'rembourser'],
            es: ['devolución', 'reembolso', 'cancelar', 'devolver'],
            km: ['retour', 'ranboursman', 'anile', 'larzan anarie']
          },
          thanks: {
            en: ['thank', 'thanks', 'thank you', 'grateful', 'appreciate'],
            fr: ['merci', 'remercie', 'remercier', 'gratitude'],
            es: ['gracias', 'agradecido', 'agradecer', 'agradezco'],
            km: ['mersi', 'agradir', 'mersi bien', 'mersi bokou']
          },
          yes: {
            en: ['yes', 'yeah', 'yep', 'sure', 'okay', 'ok'],
            fr: ['oui', 'ouais', 'bien sûr', 'd\'accord'],
            es: ['sí', 'claro', 'por supuesto', 'vale', 'ok'],
            km: ['wi', 'ankor', 'dakor', 'korek']
          },
          no: {
            en: ['no', 'nope', 'nah', 'not really', 'nothing'],
            fr: ['non', 'pas vraiment', 'rien', 'ça ira'],
            es: ['no', 'nada', 'no realmente', 'estoy bien'],
            km: ['non', 'pa bezwin', 'pa vraiman', 'mo bien']
          }
        };
        
        // Check for keywords in any language
        const matchesKeyword = (category) => {
          for (const lang in keywordMap[category]) {
            if (keywordMap[category][lang].some(keyword => lowerCaseQuestion.includes(keyword))) {
              return true;
            }
          }
          return false;
        };
        
        // Determine response based on matched keywords
        if (matchesKeyword('greetings')) {
          botResponse = responses.greeting;
        } else if (matchesKeyword('products')) {
          botResponse = responses.productRecommendation;
        } else if (matchesKeyword('shipping')) {
          botResponse = responses.shippingInfo;
        } else if (matchesKeyword('payment')) {
          botResponse = responses.paymentInfo;
        } else if (matchesKeyword('discount')) {
          botResponse = responses.discountInfo;
        } else if (matchesKeyword('contact')) {
          botResponse = responses.contactInfo;
        } else if (matchesKeyword('returns')) {
          botResponse = responses.returnPolicy;
        } else if (matchesKeyword('thanks')) {
          botResponse = responses.thanksResponse;
          // Set a flag to track that we just responded to thanks
          this.lastResponseType = 'thanks';
        } else if (matchesKeyword('yes') && this.lastResponseType === 'thanks') {
          botResponse = responses.yesResponse;
          this.lastResponseType = '';
        } else if (matchesKeyword('no') && this.lastResponseType === 'thanks') {
          botResponse = responses.noResponse;
          this.lastResponseType = '';
        } else {
          botResponse = responses.fallbackResponse;
          this.lastResponseType = '';
        }
        
        // Add bot response
        this.isTyping = false;
        this.messages.push({
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        });
        
        // Scroll to bottom after adding new message
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      
      scrollToBottom() {
        if (this.$refs.chatMessages) {
          this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
        }
      },
      
      formatTime(date) {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      },
      
      changeLanguage() {
        // Reset messages when language changes
        this.messages = [{
          text: this.chatResponses[this.chatLanguage].welcomeMessage,
          sender: 'bot',
          timestamp: new Date()
        }];
  
        // Sync with the site's language
        localStorage.setItem('preferredLanguage', this.chatLanguage);
        this.$emit('language-changed', this.chatLanguage);
      },
      
      // Initialize messages with welcome message in the current language
      initializeChat() {
        this.messages = [{
          text: this.chatResponses[this.chatLanguage].welcomeMessage,
          sender: 'bot',
          timestamp: new Date()
        }];
      }
    },
    mounted() {
      // Initialize chat with the welcome message
      this.initializeChat();
      
      // Load saved language preference if available
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang && this.chatResponses[savedLang]) {
        this.chatLanguage = savedLang;
        this.initializeChat();
      }
    },
    watch: {
      isChatOpen(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      },
      // Watch for language changes from parent component
      t: {
        handler(newVal) {
          // If the language in parent component changes, update chat language too
          if (this.t && Object.keys(this.t).length > 0) {
            // Try to detect the current language
            const currentLang = localStorage.getItem('preferredLanguage');
            if (currentLang && this.chatResponses[currentLang]) {
              this.chatLanguage = currentLang;
              this.initializeChat();
            }
          }
        },
        deep: true
      }
    }
  };
  </script>
  
  <style scoped>
  .chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  .chat-button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #198754;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }
  
  .chat-button:hover {
    background-color: #146c43;
    transform: scale(1.05);
  }
  
  .chat-panel {
    position: absolute;
    bottom: 70px;
    right: 0;
    width: 350px;
    height: 500px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .chat-header {
    background-color: white;
    color: #198754;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .chat-title {
    display: flex;
    align-items: center;
    font-weight: 600;
  }
  
  .chat-language-selector {
    display: flex;
    align-items: center;
  }
  
  .language-select {
    padding: 2px 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    color: #333;
    cursor: pointer;
    font-size: 12px;
  }
  
  .chat-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    background-color: #f7f7f9;
    display: flex;
    flex-direction: column;
  }
  
  .message {
    margin-bottom: 12px;
    max-width: 80%;
    display: flex;
    flex-direction: column;
  }
  
  .bot-message {
    align-self: flex-start;
  }
  
  .user-message {
    align-self: flex-end;
    margin-left: auto;
  }
  
  .message-content {
    padding: 10px 15px;
    border-radius: 18px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    word-wrap: break-word;
  }
  
  .bot-message .message-content {
    background-color: #f1f1f1;
    color: #333;
  }
  
  .user-message .message-content {
    background-color: #198754;
    color: white;
  }
  
  .message-time {
    font-size: 0.7rem;
    color: #777;
    margin-top: 2px;
    align-self: flex-end;
  }
  
  .chat-input {
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: white;
    border-top: 1px solid #e9ecef;
  }
  
  .chat-input input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ced4da;
    border-radius: 20px;
    font-size: 14px;
    outline: none;
    background-color: #f8f9fa;
    color: #333;
  }
  
  .chat-input input:focus {
    border-color: #198754;
  }
  
  .send-button {
    background-color: transparent;
    border: none;
    color: #198754;
    margin-left: 10px;
    cursor: pointer;
    padding: 5px;
  }
  
  .send-button:hover {
    color: #146c43;
  }
  
  /* Typing indicator */
  .typing-indicator {
    display: flex;
    align-items: center;
    padding: 15px;
  }
  
  .typing-indicator span {
    height: 10px;
    width: 10px;
    float: left;
    margin: 0 1px;
    background-color: #198754;
    display: block;
    border-radius: 50%;
    opacity: 0.4;
  }
  
  .typing-indicator span:nth-of-type(1) {
    animation: 1s blink infinite 0.3333s;
  }
  
  .typing-indicator span:nth-of-type(2) {
    animation: 1s blink infinite 0.6666s;
  }
  
  .typing-indicator span:nth-of-type(3) {
    animation: 1s blink infinite 0.9999s;
  }
  
  @keyframes blink {
    50% {
      opacity: 1;
    }
  }
  
  @media (max-width: 480px) {
    .chat-panel {
      width: 300px;
      right: 0;
    }
  }
  </style>