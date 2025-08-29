/* ===============================================
   PART 1: VARIABLE DECLARATIONS AND CONDITIONALS
   =============================================== */

// Global variables for application state
let currentGalleryIndex = 0;
let visitorCount = 1;
let totalServices = 0;
const businessHours = {
    monday: { open: 9, close: 19 },
    tuesday: { open: 9, close: 19 },
    wednesday: { open: 9, close: 19 },
    thursday: { open: 9, close: 19 },
    friday: { open: 9, close: 19 },
    saturday: { open: 8, close: 18 },
    sunday: { open: null, close: null } // Closed on Sunday
};

// Service data array
const servicesData = [
    {
        icon: "✂️",
        title: "Protective Styling",
        description: "Beautiful braids, twists, and updos that protect and nurture your natural hair while keeping you stylish.",
        basePrice: 80,
        featured: true
    },
    {
        icon: "💧",
        title: "Deep Conditioning",
        description: "Intensive treatments to restore moisture and strength to damaged hair.",
        basePrice: 65,
        featured: false
    },
    {
        icon: "🌿",
        title: "Natural Hair Care",
        description: "Specialized cutting, styling and maintenance for natural textures.",
        basePrice: 55,
        featured: false
    },
    {
        icon: "💫",
        title: "Loc Maintenance",
        description: "Expert care for all stages of your loc journey from start to finish.",
        basePrice: 75,
        featured: false
    },
    {
        icon: "💡",
        title: "Hair Consultations",
        description: "Personalized advice on products, routines, and styling options.",
        basePrice: 40,
        featured: false
    },
    {
        icon: "🎨",
        title: "Color Services",
        description: "Safe, professional coloring techniques for natural and relaxed hair.",
        basePrice: 120,
        featured: false
    }
];

// Gallery data array
const galleryData = [
    { title: "Protective Braids", category: "Before/After" },
    { title: "Twist Out", category: "Natural Styling" },
    { title: "Loc Maintenance", category: "Loc Journey" },
    { title: "Hair Highlights", category: "Color Work" },
    { title: "Cornrow Styles", category: "Protective" },
    { title: "Wash & Go", category: "Natural" },
    { title: "Bantu Knots", category: "Styling" },
    { title: "Hair Treatment", category: "Care" }
];

// Hair care tips array
const hairCareTips = [
    {
        title: "Daily Moisture",
        description: "Keep your hair hydrated with leave-in conditioners and water-based moisturizers."
    },
    {
        title: "Gentle Handling",
        description: "Use wide-tooth combs and avoid excessive manipulation to prevent breakage."
    },
    {
        title: "Night Protection",
        description: "Sleep with a silk or satin pillowcase or bonnet to reduce friction."
    },
    {
        title: "Regular Trims",
        description: "Trim your hair every 8-12 weeks to maintain healthy ends."
    },
    {
        title: "Deep Conditioning",
        description: "Use deep conditioning treatments weekly to maintain hair health."
    },
    {
        title: "Heat Protection",
        description: "Always use heat protectant when styling with heated tools."
    }
];

// Check if user is a returning visitor using conditionals
if (localStorage.getItem('visitCount')) {
    visitorCount = parseInt(localStorage.getItem('visitCount')) + 1;
} else {
    visitorCount = 1;
}
localStorage.setItem('visitCount', visitorCount);

/* ===============================================
   PART 2: CUSTOM FUNCTIONS (At least 2)
   =============================================== */

/**
 * Function 1: Generate personalized greeting based on time of day
 * Uses conditionals to determine appropriate greeting
 */
function generateGreeting() {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    let greeting = "";
    let timeOfDay = "";
    
    // Conditional statements to determine time of day
    if (hour >= 5 && hour < 12) {
        timeOfDay = "morning";
        greeting = "Good morning! Ready to start your day with beautiful hair?";
    } else if (hour >= 12 && hour < 17) {
        timeOfDay = "afternoon";
        greeting = "Good afternoon! Time for a hair transformation?";
    } else if (hour >= 17 && hour < 21) {
        timeOfDay = "evening";
        greeting = "Good evening! Let us help you look stunning tonight!";
    } else {
        timeOfDay = "night";
        greeting = "Working late? Don't forget to protect your hair while you sleep!";
    }
    
    return { greeting, timeOfDay };
}

/**
 * Function 2: Calculate service price with multipliers
 * Takes service data and user preferences to calculate total cost
 */
function calculateServicePrice(serviceTitle, hairLength, addTreatment) {
    // Find the selected service
    const service = servicesData.find(s => s.title === serviceTitle);
    if (!service) return 0;
    
    let totalPrice = service.basePrice;
    
    // Apply hair length multiplier using conditionals
    if (hairLength === "medium") {
        totalPrice *= 1.2;
    } else if (hairLength === "long") {
        totalPrice *= 1.5;
    }
    // Short hair uses base price (1.0x multiplier)
    
    // Add deep conditioning treatment if selected
    if (addTreatment) {
        totalPrice += 25;
    }
    
    return Math.round(totalPrice);
}

/**
 * Function 3: Check business hours status
 * Determines if the salon is currently open or closed
 */
function checkBusinessStatus() {
    const now = new Date();
    const dayOfWeek = now.toLocaleLowerCase().substring(0, 3);
    const currentHour = now.getHours();
    
    // Convert day names for our businessHours object
    const dayMap = {
        'sun': 'sunday',
        'mon': 'monday',
        'tue': 'tuesday',
        'wed': 'wednesday',
        'thu': 'thursday',
        'fri': 'friday',
        'sat': 'saturday'
    };
    
    const today = dayMap[dayOfWeek];
    const todayHours = businessHours[today];
    
    // Check if closed on Sunday
    if (todayHours.open === null) {
        return { status: "Closed", message: "We're closed on Sundays" };
    }
    
    // Check if currently within business hours
    if (currentHour >= todayHours.open && currentHour < todayHours.close) {
        return { 
            status: "Open", 
            message: `We're open until ${todayHours.close}:00` 
        };
    } else {
        return { 
            status: "Closed", 
            message: `We open at ${todayHours.open}:00` 
        };
    }
}

/**
 * Function 4: Get random hair care tip
 * Returns a random tip from the tips array
 */
function getRandomTip() {
    const randomIndex = Math.floor(Math.random() * hairCareTips.length);
    return hairCareTips[randomIndex];
}

/* ===============================================
   PART 3: LOOP EXAMPLES (At least 2)
   =============================================== */

/**
 * Loop 1: FOR loop to generate service cards
 * Iterates through services data to create HTML elements
 */
function generateServiceCards() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = ''; // Clear existing content
    
    // FOR loop to iterate through all services
    for (let i = 0; i < servicesData.length; i++) {
        const service = servicesData[i];
        
        const serviceCard = document.createElement('div');
        serviceCard.className = service.featured ? 'service-card featured' : 'service-card';
        
        serviceCard.innerHTML = `
            <div class="service-icon">${service.icon}</div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
            <div class="service-price">From $${service.basePrice}</div>
        `;
        
        // Add click event listener
        serviceCard.addEventListener('click', () => {
            alert(`You selected ${service.title}! Call us to book this service.`);
        });
        
        servicesGrid.appendChild(serviceCard);
    }
    
    totalServices = servicesData.length;
}

/**
 * Loop 2: WHILE loop for animated counter
 * Creates animated counting effect for statistics
 */
function animateCounter(elementId, targetValue, duration = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentValue = 0;
    const increment = targetValue / (duration / 50); // Update every 50ms
    let startTime = Date.now();
    
    // WHILE loop for counter animation
    function updateCounter() {
        const elapsedTime = Date.now() - startTime;
        
        while (currentValue < targetValue && elapsedTime < duration) {
            currentValue += increment;
            if (currentValue > targetValue) currentValue = targetValue;
            
            element.textContent = Math.floor(currentValue);
            
            if (elapsedTime >= duration) {
                element.textContent = targetValue;
                break;
            }
            
            setTimeout(updateCounter, 50);
            break; // Exit while loop to allow setTimeout to work
        }
        
        if (currentValue >= targetValue) {
            element.textContent = targetValue;
        }
    }
    
    updateCounter();
}

/**
 * Loop 3: FOR...OF loop to populate service dropdown
 * Populates select elements with service options
 */
function populateServiceDropdowns() {
    const serviceSelects = [
        document.getElementById('serviceSelect'),
        document.getElementById('bookingService')
    ];
    
    // FOR...OF loop to iterate through each select element
    for (const selectElement of serviceSelects) {
        if (!selectElement) continue;
        
        // Clear existing options (keep the first placeholder option)
        while (selectElement.children.length > 1) {
            selectElement.removeChild(selectElement.lastChild);
        }
        
        // FOR...OF loop to add service options
        for (const service of servicesData) {
            const option = document.createElement('option');
            option.value = service.title;
            option.textContent = `${service.title} - From $${service.basePrice}`;
            selectElement.appendChild(option);
        }
    }
}

/* ===============================================
   PART 4: DOM INTERACTIONS (At least 3)
   =============================================== */

/**
 * DOM Interaction 1: Mobile menu toggle
 * Manipulates navigation menu visibility
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navList = document.getElementById('navList');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Change button text based on menu state
            if (navList.classList.contains('active')) {
                this.textContent = '✕';
            } else {
                this.textContent = '☰';
            }
        });
    }
}

/**
 * DOM Interaction 2: Gallery navigation
 * Controls gallery image display and navigation
 */
function initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryInfo = document.getElementById('galleryInfo');
    
    if (!galleryGrid) return;
    
    // Generate gallery items
    galleryGrid.innerHTML = '';
    
    for (let i = 0; i < galleryData.length; i++) {
        const galleryItem = document.createElement('div');
        galleryItem.className = i === currentGalleryIndex ? 'gallery-item active' : 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-placeholder">
                <span>${galleryData[i].category}</span>
                <p>${galleryData[i].title}</p>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    }
    
    // Update gallery info
    if (galleryInfo) {
        galleryInfo.textContent = `${currentGalleryIndex + 1} of ${galleryData.length}`;
    }
    
    // Previous button event listener
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentGalleryIndex > 0) {
                currentGalleryIndex--;
                updateGalleryDisplay();
            }
        });
    }
    
    // Next button event listener
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentGalleryIndex < galleryData.length - 1) {
                currentGalleryIndex++;
                updateGalleryDisplay();
            }
        });
    }
    
    // Update button states
    updateGalleryButtons();
}

/**
 * DOM Interaction 3: Form handling and validation
 * Handles booking form submission with validation
 */
function initializeBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    const bookingMessage = document.getElementById('bookingMessage');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('clientName').value.trim();
            const email = document.getElementById('clientEmail').value.trim();
            const service = document.getElementById('bookingService').value;
            
            // Validate form data using conditionals
            if (!name || !email || !service) {
                showBookingMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showBookingMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate successful booking
            showBookingMessage(
                `Thank you ${name}! Your ${service} appointment request has been received. We'll contact you shortly.`, 
                'success'
            );
            
            // Clear form
            bookingForm.reset();
        });
    }
}

/**
 * DOM Interaction 4: Price calculator
 * Interactive price calculation based on user selections
 */
function initializePriceCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    const priceResult = document.getElementById('priceResult');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const serviceSelect = document.getElementById('serviceSelect');
            const hairLength = document.getElementById('hairLength');
            const addTreatment = document.getElementById('addTreatment');
            const totalPriceSpan = document.getElementById('totalPrice');
            
            if (!serviceSelect.value) {
                alert('Please select a service first.');
                return;
            }
            
            const calculatedPrice = calculateServicePrice(
                serviceSelect.value,
                hairLength.value,
                addTreatment.checked
            );
            
            if (totalPriceSpan) {
                totalPriceSpan.textContent = calculatedPrice;
            }
            
            if (priceResult) {
                priceResult.style.display = 'block';
                priceResult.classList.add('slide-up');
            }
        });
    }
}

/* ===============================================
   HELPER FUNCTIONS
   =============================================== */

function updateGalleryDisplay() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryInfo = document.getElementById('galleryInfo');
    
    // Update active gallery item
    galleryItems.forEach((item, index) => {
        if (index === currentGalleryIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Update gallery info
    if (galleryInfo) {
        galleryInfo.textContent = `${currentGalleryIndex + 1} of ${galleryData.length}`;
    }
    
    updateGalleryButtons();
}

function updateGalleryButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentGalleryIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentGalleryIndex === galleryData.length - 1;
    }
}

function showBookingMessage(message, type) {
    const bookingMessage = document.getElementById('bookingMessage');
    if (bookingMessage) {
        bookingMessage.textContent = message;
        bookingMessage.className = `booking-message ${type}`;
        bookingMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            bookingMessage.style.display = 'none';
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayRandomTip() {
    const tipsList = document.getElementById('tipsList');
    if (!tipsList) return;
    
    // Clear existing tips
    tipsList.innerHTML = '';
    
    // Get random tip
    const randomTip = getRandomTip();
    
    // Create tip element
    const tipElement = document.createElement('div');
    tipElement.className = 'tip-item fade-in';
    tipElement.innerHTML = `
        <h4>${randomTip.title}</h4>
        <p>${randomTip.description}</p>
    `;
    
    tipsList.appendChild(tipElement);
}

/* ===============================================
   INITIALIZATION AND EVENT LISTENERS
   =============================================== */

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Afro-puff Hairstudio website loaded successfully!');
    
    // Initialize greeting message
    const greetingData = generateGreeting();
    const greetingElement = document.getElementById('greetingMessage');
    if (greetingElement) {
        greetingElement.textContent = greetingData.greeting;
        greetingElement.classList.add('fade-in');
    }
    
    // Initialize business status
    const businessStatus = checkBusinessStatus();
    const statusElement = document.getElementById('businessStatus');
    if (statusElement) {
        statusElement.textContent = businessStatus.status;
        statusElement.className = businessStatus.status.toLowerCase();
        statusElement.title = businessStatus.message;
    }
    
    // Initialize visitor count
    const visitorElement = document.getElementById('visitorCount');
    if (visitorElement) {
        visitorElement.textContent = visitorCount;
    }
    
    // Generate service cards and populate dropdowns
    generateServiceCards();
    populateServiceDropdowns();
    
    // Initialize interactive components
    initializeMobileMenu();
    initializeGallery();
    initializeBookingForm();
    initializePriceCalculator();
    
    // Update service counter
    const serviceCounterElement = document.getElementById('serviceCounter');
    if (serviceCounterElement) {
        serviceCounterElement.textContent = `We offer ${totalServices} professional services`;
    }
    
    // Animate statistics counters
    setTimeout(() => {
        animateCounter('clientCount', 500);
        animateCounter('experienceYears', 5);
        animateCounter('servicesCount', totalServices);
    }, 500);
    
    // Initialize random tip display
    displayRandomTip();
    
    // Random tip button event listener
    const randomTipBtn = document.getElementById('randomTipBtn');
    if (randomTipBtn) {
        randomTipBtn.addEventListener('click', displayRandomTip);
    }
    
    // Hero button event listeners
    const bookNowBtn = document.getElementById('bookNowBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    console.log('All JavaScript functionality initialized successfully!');
});