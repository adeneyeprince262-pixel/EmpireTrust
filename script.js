// Smooth scroll effect for nav links
console.log("✅ script.js is connected");
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');

    // Only prevent default if it's a same-page link (starts with #)
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  });
});


// Navbar scroll animation
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 60) {
    header.style.background = 'rgba(255,255,255,0.95)';
    header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
  } else {
    header.style.background = 'rgba(255,255,255,0.9)';
    header.style.boxShadow = 'none';
  }
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
}

// =============================
// PRODUCTS DROPDOWN
// =============================
(function () {
  const productsDropdown = document.querySelector('.dropdown');
  if (!productsDropdown) return;

  const toggle = productsDropdown.querySelector('a');
  const menu = productsDropdown.querySelector('.dropdown-menu');
  if (!toggle || !menu) return;

  // Helper to close all dropdowns
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu.show').forEach(m => {
      m.classList.remove('show');
      const parent = m.closest('.dropdown');
      if (parent) parent.classList.remove('open');
    });
  }

  // Toggle dropdown on click
  toggle.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = menu.classList.contains('show');

    // Close all dropdowns first
    closeAllDropdowns();

    // Toggle current one
    if (!isOpen) {
      menu.classList.add('show');
      productsDropdown.classList.add('open');
    } else {
      menu.classList.remove('show');
      productsDropdown.classList.remove('open');
    }
  });

  // Close dropdown on outside click
  document.addEventListener('click', e => {
    if (!productsDropdown.contains(e.target)) {
      menu.classList.remove('show');
      productsDropdown.classList.remove('open');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      menu.classList.remove('show');
      productsDropdown.classList.remove('open');
    }
  });

  // Close when clicking dropdown links
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('show');
      productsDropdown.classList.remove('open');
    });
  });
})();


// Loan Calculator
function calculateLoan() {
  const loanType = document.getElementById('loanType').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const tenor = parseInt(document.getElementById('tenor').value);

  // Validation
  if (!amount || amount < 10000) {
    alert("Please enter a loan amount above ₦10,000");
    return;
  }
  if (!tenor || tenor < 1 || tenor > 24) {
    alert("Please enter a valid tenor between 1 and 24 months.");
    return;
  }

  // Monthly flat interest rates
  const rates = {
    payday: 0.04,   // 4%
    payroll: 0.04,  // 4%
    sme: 0.045,     // 4.5%
    asset: 0.045,   // 4.5%
    school: 0.045   // 4.5%
  };

  const rate = rates[loanType];
  if (!rate) {
    alert("Please select a valid loan type.");
    return;
  }

  // Flat rate interest calculation
  const totalInterest = amount * rate * tenor;
  const totalRepayment = amount + totalInterest;
  const monthlyRepayment = totalRepayment / tenor;

  // Display results
  document.getElementById('monthly-payment').innerText =
    "₦" + monthlyRepayment.toLocaleString(undefined, { minimumFractionDigits: 2 });
  document.getElementById('total-interest').innerText =
    "₦" + totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 });
  document.getElementById('total-repayment').innerText =
    "₦" + totalRepayment.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

// Loan CTA Modal (with fade-in animation + background blur)
const loanModal = document.getElementById('loanModal');
const ctaButton = document.querySelector('.loan-cta .btn-primary');

if (ctaButton && loanModal) {
  ctaButton.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.add('modal-open');
    loanModal.style.display = 'flex';
    setTimeout(() => loanModal.classList.add('show'), 10);
  });
}

function closeModal() {
  loanModal.classList.remove('show');
  document.body.classList.remove('modal-open');
  setTimeout(() => (loanModal.style.display = 'none'), 300);
}

function sendEmail(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const purpose = document.getElementById('purpose').value;

  const subject = `Loan Inquiry from ${name}`;
  const body = `Name: ${name}%0D%0APhone: ${phone}%0D%0AEmail: ${email}%0D%0APurpose: ${purpose}`;

  window.location.href = `mailto:loan@empiretrustmfb.com?subject=${subject}&body=${body}`;
  closeModal();
}

// Smooth scroll to the "Download Our App" section after navigating from another page
window.addEventListener("DOMContentLoaded", function () {
  if (window.location.hash === "#download-app") {
    setTimeout(() => {
      const section = document.querySelector("#download-app");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 500);
  }
});

// Initialize AOS Animations
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
      duration: 600,    
      offset: 80,         
      easing: "ease-out", 
      once: true 
  });
});

/* ===== LIGHTBOX SCRIPT ===== */
(function () {
  // run after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.gallery-grid img'));
    if (!images.length) return; // nothing to do

    // Lightbox elements (must match HTML you added)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const btnClose = lightbox.querySelector('.lb-close');
    const btnPrev = lightbox.querySelector('.lb-prev');
    const btnNext = lightbox.querySelector('.lb-next');

    let currentIndex = -1;

    // open function
    function openAt(index) {
      const img = images[index];
      if (!img) return;
      currentIndex = index;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.classList.add('show');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    // close function
    function closeLB() {
      lightbox.classList.remove('show');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      // clear src to release memory on some browsers
      lightboxImg.src = '';
      currentIndex = -1;
    }

    // next / prev
    function showNext() {
      if (images.length === 0) return;
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt || '';
    }
    function showPrev() {
      if (images.length === 0) return;
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt || '';
    }

    // attach click to each gallery image
    images.forEach((img, i) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', (e) => {
        // ignore if inside a figure that contains a video etc — but yours are images so ok
        openAt(i);
      });
    });

    // controls
    btnClose.addEventListener('click', closeLB);
    btnNext.addEventListener('click', showNext);
    btnPrev.addEventListener('click', showPrev);

    // click outside image to close
    lightbox.addEventListener('click', (e) => {
      // if click target is the overlay (lightbox) or close button area
      if (e.target === lightbox) closeLB();
    });

    // keyboard support: Esc, ArrowLeft, ArrowRight
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('show')) return;
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });

    // Prevent image drag from selecting text or navigating
    lightboxImg.addEventListener('dragstart', (e) => e.preventDefault());
  });
})();

/* ===== LIGHTBOX ZOOM FEATURE ===== */
document.addEventListener("DOMContentLoaded", () => {
  const lightboxImg = document.querySelector(".lightbox-img");
  if (!lightboxImg) return;

  let scale = 1;
  let isDragging = false;
  let startX, startY;
  let translateX = 0;
  let translateY = 0;

  // Zoom with mouse wheel
  lightboxImg.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    if (e.deltaY < 0) {
      scale = Math.min(scale + zoomSpeed, 3); // zoom in limit
    } else {
      scale = Math.max(scale - zoomSpeed, 1); // zoom out limit
      if (scale === 1) {
        translateX = 0;
        translateY = 0;
      }
    }
    updateTransform();
  });

  // Drag to move image while zoomed in
  lightboxImg.addEventListener("mousedown", (e) => {
    if (scale === 1) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    lightboxImg.style.cursor = "grabbing";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    lightboxImg.style.cursor = scale === 1 ? "default" : "grab";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
  });

  // Double-click to reset zoom
  lightboxImg.addEventListener("dblclick", () => {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  });

  function updateTransform() {
    lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    lightboxImg.style.transition = "transform 0.1s ease-out";
  }
});

// Careers Application Modal
const openBtn = document.getElementById("openApplicationForm");
const modal = document.getElementById("applicationModal");
const closeBtn = document.getElementById("closeApplicationForm");
const form = modal.querySelector("form");
const formContent = modal.querySelector(".application-content");

if (openBtn && modal && closeBtn && form) {
  // Open modal
  openBtn.addEventListener("click", () => {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default page reload
    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        // Clear the form
        form.reset();

        // Show success message
        formContent.innerHTML = `
          <span class="close-modal" id="closeApplicationForm">&times;</span>
          <h2>Application Submitted!</h2>
          <p>Thank you for your application. We will review your submission and get back to you shortly.</p>
        `;

        // Reattach close button functionality
        const newCloseBtn = formContent.querySelector("#closeApplicationForm");
        if (newCloseBtn) {
          newCloseBtn.addEventListener("click", () => {
            modal.classList.remove("show");
            document.body.style.overflow = "";
          });
        }
      })
      .catch(() => {
        alert("There was an error submitting the form. Please try again.");
      });
  });
}



