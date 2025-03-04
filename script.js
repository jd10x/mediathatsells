document.addEventListener("DOMContentLoaded", () => {
  // Floating Navigation
  const floatingNav = document.getElementById("floating-nav")
  const servicesSection = document.getElementById("services")
  const portfolioSection = document.getElementById("portfolio")
  const founderSection = document.getElementById("founder")
  const faqSection = document.querySelector(".faqs")
  const footerSection = document.querySelector(".footer")
  const footerContactSection = document.querySelector(".footer-contact") // Updated line
  const navLinks = document.querySelectorAll(".nav-link")
  const navIndicator = document.querySelector(".nav-indicator")

  // Floating CTA
  const floatingCta = document.getElementById("floating-cta")
  const ctaButton = floatingCta.querySelector(".cta-button")

  // Testimonial Bubbles
  const testimonialBubbles = document.querySelectorAll(".testimonial-bubble")
  const testimonialDots = document.querySelector(".testimonial-dots")

  // Testimonial texts
  const testimonialTexts = [
    "MediaThatSells transformed our marketing approach. Their data-driven strategies increased our conversion rates by 65% and reduced our customer acquisition costs significantly.",
    "The team at MediaThatSells doesn't just deliver results; they transfer knowledge. We're now able to manage much of our marketing in-house thanks to their training.",
    "Their AI-powered solutions have saved us countless hours and improved our targeting precision. The ROI speaks for itself - 300% increase in just 4 months.",
    "What sets MediaThatSells apart is their holistic approach. They don't just focus on one channel - they created an integrated strategy that works across all touchpoints.",
    "From day one, they understood our brand voice and target audience. The content they created resonated perfectly and helped us establish a strong market presence.",
  ]

  // Process Timeline
  const timelineProgress = document.querySelector(".timeline-progress")
  const processSteps = document.querySelectorAll(".process-step")

  // Portfolio Tabs
  const portfolioTabs = document.querySelectorAll(".portfolio-tab")
  const portfolioContents = document.querySelectorAll(".portfolio-content")

  // FAQ Items
  const faqItems = document.querySelectorAll(".faq-item")

  // Counter Animation
  const counters = document.querySelectorAll(".counter")
  const metricCards = document.querySelectorAll(".metric-card")

  // Initialize the page
  initPage()

  // Scroll event listener
  window.addEventListener("scroll", handleScroll)

  function initPage() {
    // Create testimonial dots
    createTestimonialDots()

    // Set up event listeners
    setupEventListeners()

    // Initialize FAQ items
    initFAQs()

    // Initialize testimonial bubbles
    initTestimonialBubbles()

    // Trigger initial scroll check
    handleScroll()
  }

  function createTestimonialDots() {
    for (let i = 0; i < testimonialBubbles.length; i++) {
      const dot = document.createElement("div")
      dot.classList.add("testimonial-dot")
      if (i === 0) dot.classList.add("active")
      dot.dataset.index = i
      testimonialDots.appendChild(dot)

      dot.addEventListener("click", () => {
        activateTestimonialBubble(i)
      })
    }
  }

  function setupEventListeners() {
    // Portfolio tabs
    portfolioTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabId = tab.dataset.tab
        switchPortfolioTab(tab, tabId)
      })
    })

    // Window resize
    window.addEventListener("resize", () => {
      updateNavIndicator()
    })

    // Navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href").substring(1)
        const targetSection = document.getElementById(targetId)

        // Set this link as active immediately
        navLinks.forEach(l => l.classList.remove("active"))
        link.classList.add("active")
        updateNavIndicator()

        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: "smooth",
        })
      })
    })

    // CTA buttons
    document.querySelectorAll(".cta-button").forEach((button) => {
      button.addEventListener("click", () => {
        alert("Thank you for your interest! This would open a booking form in a real implementation.")
      })
    })
  }

  function handleScroll() {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.body.scrollHeight
    
    // Check if we're at the very bottom of the footer (past contact links)
    const footerContactBottom = footerContactSection ? 
      footerContactSection.getBoundingClientRect().bottom : 0
    const isAtBottomOfFooter = footerContactBottom <= windowHeight // Updated line

    // Handle floating navigation visibility
    if (servicesSection && scrollPosition >= servicesSection.offsetTop - 200) {
      floatingNav.classList.add("visible")

      // Check if we're near the footer to hide the nav
      const footerTop = footerSection.getBoundingClientRect().top
      const faqBottom = faqSection.getBoundingClientRect().bottom

      if (footerTop < windowHeight) {
        floatingNav.classList.add("fade-out")
      } else if (faqBottom > 0) {
        floatingNav.classList.remove("fade-out")
      }

      // Update active nav link
      updateActiveNavLink(scrollPosition)
    } else {
      floatingNav.classList.remove("visible")
    }

    // Handle floating CTA visibility and animation
    if (portfolioSection && scrollPosition >= portfolioSection.offsetTop + portfolioSection.offsetHeight) {
      floatingCta.classList.add("visible")
      
      // Check if we're at the bottom of the footer (past contact links)
      if (isAtBottomOfFooter) { // Updated line
        ctaButton.classList.add("footer-active")
      } else {
        ctaButton.classList.remove("footer-active")
      }
    } else {
      floatingCta.classList.remove("visible")
    }

    // Animate counters when in view
    animateCountersInView()

    // Animate process timeline
    animateProcessTimeline()
  }

  function updateActiveNavLink(scrollPosition) {
    let activeSection = "services"

    if (portfolioSection && scrollPosition >= portfolioSection.offsetTop - 200) {
      activeSection = "portfolio"
    }
    
    if (founderSection && scrollPosition >= founderSection.offsetTop - 200) {
      activeSection = "founder"
    }

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${activeSection}`) {
        link.classList.add("active")
      }
    })

    updateNavIndicator()
  }

  function updateNavIndicator() {
    const activeLink = document.querySelector(".nav-link.active")
    if (activeLink) {
      navIndicator.style.width = `${activeLink.offsetWidth}px`
      navIndicator.style.left = `${activeLink.offsetLeft}px`
    }
  }

  function switchPortfolioTab(clickedTab, tabId) {
    // Update active tab
    portfolioTabs.forEach((tab) => {
      tab.classList.remove("active")
    })
    clickedTab.classList.add("active")

    // Show corresponding content
    portfolioContents.forEach((content) => {
      content.classList.remove("active")
    })

    const contentElement = document.getElementById(`${tabId}-content`)
    contentElement.classList.add("active")

    // If metrics tab is clicked, animate the counters
    if (tabId === "metrics") {
      animateMetricsCounters()
    }
  }

  function animateMetricsCounters() {
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.textContent)
      let count = 0
      const duration = 2000 // ms
      const interval = Math.floor(duration / target)

      // Reset counter
      counter.textContent = "0"

      const timer = setInterval(() => {
        count++
        counter.textContent = count

        if (count >= target) {
          clearInterval(timer)
        }
      }, interval)

      // Add animated class to parent card
      const metricCard = counter.closest(".metric-card")
      if (metricCard) {
        metricCard.classList.add("animated")
      }
    })
  }

  function initFAQs() {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      question.addEventListener("click", () => {
        item.classList.toggle("active")
      })
    })
  }

  function animateCountersInView() {
    counters.forEach((counter) => {
      const counterSection = counter.closest(".metrics-grid")
      if (!counterSection) return

      const sectionTop = counterSection.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (
        sectionTop < windowHeight - 100 &&
        !counter.classList.contains("animated") &&
        document.getElementById("metrics-content").classList.contains("active")
      ) {
        counter.classList.add("animated")
        animateMetricsCounters()
      }
    })
  }

  function animateProcessTimeline() {
    if (!timelineProgress || !processSteps.length) return

    const aboutSection = document.querySelector(".about")
    if (!aboutSection) return

    const aboutTop = aboutSection.getBoundingClientRect().top
    const aboutHeight = aboutSection.offsetHeight
    const windowHeight = window.innerHeight

    // Calculate how far we've scrolled through the section
    // Accelerate the animation to complete by halfway through
    let scrollPercentage = 0

    if (aboutTop < windowHeight && aboutTop > -aboutHeight) {
      // We're viewing the section - accelerate to finish by halfway
      scrollPercentage = (windowHeight - aboutTop) / (windowHeight + aboutHeight / 2)
      scrollPercentage = Math.min(Math.max(scrollPercentage, 0), 1)

      // Update the progress line
      timelineProgress.style.height = `${scrollPercentage * 100}%`

      // Update active steps
      processSteps.forEach((step, index) => {
        const stepThreshold = index / (processSteps.length - 1)
        if (scrollPercentage >= stepThreshold) {
          step.classList.add("active")
        } else {
          step.classList.remove("active")
        }
      })
    }
  }

  function initTestimonialBubbles() {
    // Show first bubble initially
    activateTestimonialBubble(0)

    // Set a timer to cycle through bubbles
    setInterval(() => {
      const currentIndex = Number.parseInt(document.querySelector(".testimonial-bubble.active").dataset.index)
      const nextIndex = (currentIndex + 1) % testimonialBubbles.length
      activateTestimonialBubble(nextIndex)
    }, 8000)
  }

  function activateTestimonialBubble(index) {
    // Hide all bubbles
    testimonialBubbles.forEach((bubble) => {
      bubble.classList.remove("active")
    })

    // Update dots
    document.querySelectorAll(".testimonial-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index)
    })

    // Show and animate the selected bubble
    const selectedBubble = testimonialBubbles[index]
    selectedBubble.classList.add("active")

    // Get the text element
    const textElement = selectedBubble.querySelector(".typing-text")
    const cursorElement = selectedBubble.querySelector(".typing-cursor")

    // Clear existing text
    textElement.textContent = ""

    // Get the text to type
    const textToType = testimonialTexts[index]

    // Type the text character by character
    let charIndex = 0
    const typingSpeed = 30 // milliseconds per character

    function typeNextChar() {
      if (charIndex < textToType.length) {
        textElement.textContent += textToType.charAt(charIndex)
        charIndex++
        setTimeout(typeNextChar, typingSpeed)
      }
    }

    // Start typing
    typeNextChar()
  }
})
