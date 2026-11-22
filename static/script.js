// emailjs.init({
//             publicKey: '6upSXP_XXdZIVKN27',
// });

// ========================================================
// DILIP BUILDCON (DBL) EXACT MATCH CLEAN HERO VIDEO SLIDER
// (5 Videos with 6s Duration & Smooth Horizontal Slide)
// ========================================================
const heroSlides = [
    {
        title: 'RAILWAY VIADUCT &amp;<br>TRACK <span class="highlight-yellow">WORKS</span>',
        desc: 'Elevated pier casting, civil construction, ABSS works (Amrit Bharat), Gati-Shakti, precast segmental box girder launching, ballastless track beds, and heavy axle-load rail corridors.'
    },
    {
        title: 'REAL ESTATE &amp;<br><span class="highlight-yellow">STRUCTURES</span>',
        desc: 'Multi-storey residential and commercial building construction with modern monolithic aluminum shuttering, deep piling, and sustainable utility planning.'
    },
    {
        title: 'GOVERNMENT &amp;<br>MUNICIPAL <span class="highlight-yellow">WORKS</span>',
        desc: 'Infrastructure tenders involving State RCD, RWD (Rural Works Department), and municipal civil works. Rate analysis, DPR preparation, and rigorous compliance with statutory standards.'
    },
    {
        title: 'BRIDGES &amp; ELEVATED<br>VIADUCT <span class="highlight-yellow">STRUCTURES</span>',
        desc: 'Major river crossings, pre-stressed girder launching, deep hydraulic rotary piling, and high-load flyover structural engineering.'
    },
    {
        title: 'CONSTRUCTION MANAGEMENT &amp;<br><span class="highlight-yellow">CPM</span>',
        desc: 'Critical path scheduling, DPR analysis, resource leveling, and systematic contractor-consultant coordination preventing cost slippages.'
    }
];

let currentSlideIdx = 0;
let slideIntervalTimer = null;
const SLIDE_DURATION = 6000; // Exact 6 seconds per video

function initTier1HeroCarousel() {
    const heroSection = document.getElementById('hero-tier1');
    if (!heroSection) return;

    const slides = heroSection.querySelectorAll('.hero-video-slide');
    if (!slides || slides.length === 0) return;

    const titleEl = document.getElementById('heroSlideTitle');
    const descEl = document.getElementById('heroSlideDesc');
    const dotBtns = heroSection.querySelectorAll('.dbl-dot');

    let isTransitioning = false;

    // Ensure all videos are muted & set to playsInline
    slides.forEach((slide, idx) => {
        const vid = slide.querySelector('video');
        if (vid) {
            vid.muted = true;
            vid.playsInline = true;
            if (idx === 0) {
                vid.play().catch(() => {});
            }
        }
        if (idx === 0) {
            slide.classList.add('active');
            slide.classList.remove('prev', 'no-trans');
        } else {
            slide.classList.remove('active', 'prev');
        }
    });

    function goToSlide(targetIdx) {
        if (isTransitioning) return;
        const prevIdx = currentSlideIdx;
        const nextIdx = (targetIdx + slides.length) % slides.length;
        if (nextIdx === prevIdx && slides[prevIdx].classList.contains('active')) return;

        isTransitioning = true;
        currentSlideIdx = nextIdx;

        const currentSlide = slides[prevIdx];
        const nextSlide = slides[nextIdx];

        // 1. Reset next slide to right (offscreen at 100%)
        nextSlide.classList.add('no-trans');
        nextSlide.classList.remove('prev', 'active');
        void nextSlide.offsetWidth; // Force layout reflow
        nextSlide.classList.remove('no-trans');

        // 2. Play next video smoothly
        const nextVid = nextSlide.querySelector('video');
        if (nextVid) {
            try {
                nextVid.currentTime = 0;
                nextVid.play().catch(() => {});
            } catch (e) {}
        }

        // 3. Smooth simultaneous horizontal translation
        requestAnimationFrame(() => {
            currentSlide.classList.remove('active');
            currentSlide.classList.add('prev'); // slides out to left (-100%)
            nextSlide.classList.add('active');  // slides in to center (0%)
        });

        // 4. Update text cleanly without bouncy translateY animation
        if (heroSlides[currentSlideIdx]) {
            if (titleEl) titleEl.innerHTML = heroSlides[currentSlideIdx].title;
            if (descEl) descEl.textContent = heroSlides[currentSlideIdx].desc;
        }

        // 5. Update circular dots
        dotBtns.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlideIdx);
        });

        // 6. Finish transition and cleanup previous slide
        setTimeout(() => {
            currentSlide.classList.remove('prev');
            currentSlide.classList.add('no-trans');
            void currentSlide.offsetWidth;
            currentSlide.classList.remove('no-trans');
            isTransitioning = false;
        }, 900);

        resetSlideTimer();
    }

    function nextSlide() {
        goToSlide(currentSlideIdx + 1);
    }

    function resetSlideTimer() {
        if (slideIntervalTimer) clearInterval(slideIntervalTimer);
        slideIntervalTimer = setInterval(nextSlide, SLIDE_DURATION);
    }

    // Attach Dot Clicks
    dotBtns.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            goToSlide(idx);
        });
    });

    // Start 6-second auto rotation
    resetSlideTimer();
}



// window.addEventListener('load',()=>{
//     const hero = document.querySelector(".hero");
//     const text = document.querySelector(".hero-content");
//     const image = document.querySelector(".Image");
//     // const nav = document.querySelector("nav")

//     setTimeout(() => {
//         hero.classList.add("show-bg");
//     }, 1000);

//     setTimeout(() => {
//         text.classList.add("show-text");  
//     }, 3000);

//      setTimeout(() => {
//         image.classList.add("showImage")
//         image.style.display = "block"
//         // nav.classList.add("shownav")
//      },4000);
// })

// window.addEventListener('load', () => {
//     const hero = document.querySelector(".hero");
//     const text = document.querySelector(".hero-content");
//     const image = document.querySelector(".Image");

//     setTimeout(() => {
//         hero.classList.add("show-bg");
//     }, 100);

//     setTimeout(() => {
//         text.classList.add("show-text");  
//     }, 1000);

//     setTimeout(() => {
//         image.classList.add("showImage");
//         image.style.display = "block";
//     }, 2000);
// });



// --- Corporate & Project Stats Counter (Smooth 0 to Target Animation) ---
function initStatsCounters() {
    const counterSections = document.querySelectorAll("#counter, .corporate-stats-section");
    if (!counterSections.length) return;

    function animateSection(section) {
        const counters = section.querySelectorAll(".corporate-stats-number, .count");
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute("data-target")) || 0;
            // Suffix defaults to "+" unless explicitly set (empty data-suffix="" gives no suffix, e.g. for "1980")
            const hasExplicitSuffix = counter.hasAttribute("data-suffix");
            const suffix = hasExplicitSuffix ? counter.getAttribute("data-suffix") : "+";
            const prefix = counter.getAttribute("data-prefix") || "";
            const noComma = counter.hasAttribute("data-no-comma") || (target >= 1000 && target <= 2100 && suffix === "");
            const duration = 2000; // 2 seconds animation
            let startTime = null;

            counter.textContent = prefix + "0" + suffix;

            function animateCount(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // easeOutCubic curve for smooth natural deceleration
                const ease = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(ease * target);
                const displayVal = noComma ? currentVal.toString() : currentVal.toLocaleString('en-US');

                counter.textContent = prefix + displayVal + suffix;

                if (progress < 1) {
                    requestAnimationFrame(animateCount);
                } else {
                    const finalVal = noComma ? target.toString() : target.toLocaleString('en-US');
                    counter.textContent = prefix + finalVal + suffix;
                }
            }

            requestAnimationFrame(animateCount);
        });
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSection(entry.target);
                    observer.unobserve(entry.target); // animate once when scrolled into view
                }
            });
        }, {
            threshold: 0.25
        });

        counterSections.forEach(sec => observer.observe(sec));
    } else {
        counterSections.forEach(sec => animateSection(sec));
    }
}

// Global fallback alias for legacy calls
window.startCounting = function() {
    const sections = document.querySelectorAll("#counter, .corporate-stats-section");
    sections.forEach(sec => {
        const counters = sec.querySelectorAll(".corporate-stats-number, .count");
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute("data-target")) || 0;
            const suffix = counter.hasAttribute("data-suffix") ? counter.getAttribute("data-suffix") : "+";
            const noComma = counter.hasAttribute("data-no-comma") || (target >= 1000 && target <= 2100 && suffix === "");
            const displayVal = noComma ? target.toString() : target.toLocaleString('en-US');
            counter.textContent = displayVal + suffix;
        });
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStatsCounters);
} else {
    initStatsCounters();
}


// function sendEmail(){ 
    
//         let fname = document.getElementById("firstname").value.trim();
//         let lname = document.getElementById("lastname").value.trim();
//         let email = document.getElementById("email").value.trim();
//         let number = document.getElementById("number").value.trim();
//         let bhk_group = document.querySelector('input[name="bhk"]:checked')?.value || " ";
//         let project = document.getElementById("project").value;
//         let message = document.getElementById("message").value.trim();

//         let params = {
//             first_name: fname,
//             last_name: lname,
//             from_email: email,
//             from_number: number,
//             from_bhk:bhk_group,
//             from_project:project,
//             message: message
//         }

//     emailjs
//     .send('service_f234mci', 'template_43z54fb', params)
//     .then(()=>{
//         alert('Email Successfully Submitted ✅')
//         document.getElementById("form").reset();    
//     })
//     .catch(()=>{
//         alert("Email can not send!")
//     })
   
// }

let expertIndex = 0;

function slide(direction) {
  const track = document.getElementById("expertTrack");
  if (!track || !track.children.length) return;
  const card = track.children[0];
  const computedGap = parseFloat(window.getComputedStyle(track).gap) || 20;

  const cardWidth = card.offsetWidth + computedGap;
  const totalCards = track.children.length;
  const viewportWidth = track.parentElement ? track.parentElement.offsetWidth : 940;
  const visibleCards = Math.max(1, Math.floor((viewportWidth + computedGap) / cardWidth));
  const maxIndex = Math.max(0, totalCards - visibleCards);

  expertIndex += direction;

  if (expertIndex < 0) expertIndex = maxIndex;
  else if (expertIndex > maxIndex) expertIndex = 0;

  track.style.transform = `translateX(-${expertIndex * cardWidth}px)`;
}

// Mobile Touch Swipe & Tap-to-Flip Support for Expertise Carousel
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("expertTrack");
  if (!track) return;

  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        slide(1); // swipe left -> next card
      } else {
        slide(-1); // swipe right -> prev card
      }
    }
  }, { passive: true });

  // Mobile Tap to Flip Card
  const cards = track.querySelectorAll(".flip-card");
  cards.forEach(function (c) {
    c.addEventListener("click", function () {
      if (window.innerWidth <= 991) {
        c.classList.toggle("flipped");
      }
    });
  });

  // Re-align on resize or orientation change
  window.addEventListener("resize", function () {
    const card = track.children[0];
    if (!card) return;
    const computedGap = parseFloat(window.getComputedStyle(track).gap) || 20;
    const cardWidth = card.offsetWidth + computedGap;
    const totalCards = track.children.length;
    const viewportWidth = track.parentElement ? track.parentElement.offsetWidth : 940;
    const visibleCards = Math.max(1, Math.floor((viewportWidth + computedGap) / cardWidth));
    const maxIndex = Math.max(0, totalCards - visibleCards);
    if (expertIndex > maxIndex) expertIndex = maxIndex;
    track.style.transform = `translateX(-${expertIndex * cardWidth}px)`;
  });
});

// copyright

document.getElementById("year").textContent = new Date().getFullYear();


// Select the scroll button
const scrollBtn = document.querySelector(".scroll-btn");

// window.addEventListener("scroll", function () {
//     if (window.scrollY > 200) {
//         scrollBtn.style.display = "block";
//     } else {
//         scrollBtn.style.display = "none";
//     }
// });

// function scrollBtn(){
//     window.scrollTo({
//         top: 0,
//         behavior: "smooth"
//     });
// }
// scrollBtn.addEventListener("click", function () {
    
// });

// scroll up homepage button js code
const scrollWrapper = document.querySelector('.scrollWrapper');
if (scrollWrapper && scrollWrapper.children.length > 0) {
    const items = [...scrollWrapper.children];
    items.forEach((item) => {
        const clonedItem = item.cloneNode(true);
        scrollWrapper.appendChild(clonedItem);
    });
}

// ========================================================
// COST CALCULATOR (Safe Guarded Initialization)
// ========================================================
function initCostCalculator() {
    const lengthInput = document.getElementById("length");
    const widthInput = document.getElementById("width");
    if (!lengthInput || !widthInput) return;

    let totalArea = 0;
    const reduction = 150; 
    let reductionApplied = false;

    lengthInput.addEventListener("input", calculateTotalArea);
    widthInput.addEventListener("input", calculateTotalArea);

    function calculateTotalArea() {
        const length = parseInt(lengthInput.value) || 0;
        const width = parseInt(widthInput.value) || 0;
        totalArea = length * width;
        const totalAreaInput = document.getElementById("totalAreaInput");
        if (totalAreaInput) totalAreaInput.value = totalArea;
        reductionApplied = false;
        updateCosts();
    }

    // Navbar buttons logic
    const floorButtons = document.querySelectorAll(".floor-btn");
    floorButtons.forEach(btn => {
        btn.addEventListener("click", function(){
            floorButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            showFloors(parseInt(this.dataset.floor));
        });
    });

    function showFloors(selectedFloor) {
        for(let i=0;i<4;i++){
            const card = document.getElementById("floor"+i);
            card.style.display = i <= selectedFloor ? "block" : "none";
        }
        updateCosts();
    }

    function updateCosts() {
        let totalBefore = 0;
        let totalAfter = 0;

        for(let i=0;i<4;i++){
            const card = document.getElementById("floor"+i);
            if(card.style.display === "block"){
                const select = card.querySelector("select");
                let rate = parseInt(select.value);

                // Show informational popup once
                if(i>0 && totalArea >=1200 && !reductionApplied){
                    alert("Total area ≥ 1200 sq.ft. ₹150 per sq.ft will be reduced automatically for eligible floors (Ground floor excluded).");
                    reductionApplied = true;
                }

               const costBefore = totalArea * rate;
                let effectiveArea = totalArea;

                // Apply area reduction only for upper floors & only once
                if (i > 0 && totalArea >= 1200 && reductionApplied) {
                    effectiveArea = totalArea - reduction; // 1200 → 1050
                }

                const costAfter = effectiveArea * rate;


                card.querySelector(".costBefore").innerText = costBefore.toLocaleString();
                card.querySelector(".costAfter").innerText = costAfter.toLocaleString();

                totalBefore += costBefore;
                totalAfter += costAfter;
            }
        }

        const totalBeforeEl = document.getElementById("totalBefore");
        const totalAfterEl = document.getElementById("totalAfter");
        const savingCostEl = document.getElementById("savingCost");
        if (totalBeforeEl) totalBeforeEl.innerText = totalBefore.toLocaleString();
        if (totalAfterEl) totalAfterEl.innerText = totalAfter.toLocaleString();
        if (savingCostEl) savingCostEl.innerText = (totalBefore - totalAfter).toLocaleString();
    }

    // Initialize default
    calculateTotalArea();
    showFloors(0);
}









// ========================================================
// THEME TOGGLE (WHITE & BLACK MODE)
// ========================================================
function initTheme() {
    const savedTheme = localStorage.getItem('ms_theme');
    const isDark = savedTheme === 'dark';
    
    if (isDark) {
        document.documentElement.classList.add('dark-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
        document.body.classList.remove('dark-theme');
    }
    
    // Inject floating button if not present
    if (!document.getElementById('floatingThemeToggle')) {
        const floatBtn = document.createElement('button');
        floatBtn.id = 'floatingThemeToggle';
        floatBtn.className = 'floating-theme-toggle';
        floatBtn.onclick = toggleTheme;
        floatBtn.setAttribute('aria-label', 'Toggle White / Black Mode');
        document.body.appendChild(floatBtn);
    }
    
    updateThemeUI(isDark);
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    document.documentElement.classList.toggle('dark-theme', isDark);
    localStorage.setItem('ms_theme', isDark ? 'dark' : 'light');
    updateThemeUI(isDark);
}

function updateThemeUI(isDark) {
    const floatBtn = document.getElementById('floatingThemeToggle');
    if (floatBtn) {
        if (isDark) {
            floatBtn.classList.add('is-dark');
            floatBtn.innerHTML = '<i class="fa-solid fa-sun" style="color:#f59e0b;"></i> <span>White</span>';
            floatBtn.setAttribute('title', 'Switch to White (Light) Mode');
        } else {
            floatBtn.classList.remove('is-dark');
            floatBtn.innerHTML = '<i class="fa-solid fa-moon" style="color:#f59e0b;"></i> <span>Black</span>';
            floatBtn.setAttribute('title', 'Switch to Black (Dark) Mode');
        }
    }
    
    const btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach(btn => {
        if (isDark) {
            btn.classList.add('is-dark');
            btn.setAttribute('title', 'Switch to White (Light) Mode');
        } else {
            btn.classList.remove('is-dark');
            btn.setAttribute('title', 'Switch to Black (Dark) Mode');
        }
    });
}

// ========================================================
// MOBILE NAVIGATION (HAMBURGER & SLIDE-DOWN DRAWER)
// ========================================================
function initMobileNav() {
    const menuToggles = document.querySelectorAll('.menu-toggle');
    const nav = document.querySelector('.hero-header nav') || document.querySelector('header nav');
    if (!nav) return;

    // Create backdrop overlay if not present
    let overlay = document.querySelector('.mobile-nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        document.body.appendChild(overlay);
    }

    function toggleMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const isOpen = nav.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active', isOpen);
        document.body.classList.toggle('mobile-menu-open', isOpen);

        menuToggles.forEach(btn => {
            btn.classList.toggle('active', isOpen);
            const icon = btn.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    function closeMenu() {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
            menuToggles.forEach(btn => {
                btn.classList.remove('active');
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        }
    }

    menuToggles.forEach(btn => {
        btn.onclick = toggleMenu;
    });

    if (overlay) {
        overlay.onclick = closeMenu;
    }

    // Close menu when clicking links that navigate to a page
    const links = nav.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // If it's a parent of dropdown on mobile, handle accordion
            const parentDropdown = link.closest('.nav-dropdown');
            if (parentDropdown && link.parentElement === parentDropdown && parentDropdown.querySelector('.dropdown-menu')) {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    e.stopPropagation();
                    parentDropdown.classList.toggle('mobile-expanded');
                    return;
                }
            }
            closeMenu();
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // Handle window resize: close mobile menu if resized to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    });
}

// ========================================================
// ABOUT US 2-SECOND HORIZONTAL IMAGE SLIDER
// ========================================================
function initAboutSlider() {
    const track = document.getElementById('aboutSliderTrack');
    if (!track) return;

    const dots = document.querySelectorAll('.about-dot');
    const allSlides = track.querySelectorAll('.about-slide');
    const totalSlides = allSlides.length;
    const totalOriginalSlides = Math.max(1, totalSlides - 1);
    let currentIdx = 0;
    let sliderTimer = null;
    let isTransitioning = false;

    function moveTo(idx) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIdx = idx;

        // Slide width in percent: each slide is 100 / totalSlides %
        track.style.transition = 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
        track.style.transform = `translate3d(-${currentIdx * (100 / totalSlides)}%, 0, 0)`;

        // Update dots
        const dotIdx = currentIdx % totalOriginalSlides;
        dots.forEach((d, i) => d.classList.toggle('active', i === dotIdx));

        setTimeout(() => {
            // If we reached the clone slide
            if (currentIdx === totalOriginalSlides) {
                track.style.transition = 'none';
                currentIdx = 0;
                track.style.transform = 'translate3d(0%, 0, 0)';
                void track.offsetWidth; // Force reflow
            }
            isTransitioning = false;
        }, 660);
    }

    function next() {
        moveTo(currentIdx + 1);
    }

    function resetTimer() {
        if (sliderTimer) clearInterval(sliderTimer);
        sliderTimer = setInterval(next, 2000); // Exact 2 seconds per slide
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            moveTo(idx);
            resetTimer();
        });
    });

    // Pause on hover
    const wrapper = document.getElementById('aboutSliderWrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', () => clearInterval(sliderTimer));
        wrapper.addEventListener('mouseleave', resetTimer);
    }

    // Start 2-second auto-slide
    resetTimer();
}

function initAll() {
    initTheme();
    initMobileNav();
    initCostCalculator();
    initTier1HeroCarousel();
    initAboutSlider();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
window.addEventListener('load', initAll);
