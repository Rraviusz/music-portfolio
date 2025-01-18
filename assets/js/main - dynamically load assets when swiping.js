/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


/** Toggle On and Off Sections */
/** Other manually turned off things include navigation tabs of below section, address and call us in contact section. */
const config = {
  showStats: false, // Set to true to show the stats section
  showSkills: false, // Set to true to show the skills section
  showResume: false, // Set to true to show the resume section
  showServices: false, // Set to true to show the services section
  showTestimonials: false, // Set to true to show the testimonials section
  showDropdown: false, // Set to true to show the dropdown section
};

// Function to toggle visibility based on config values
window.onload = () => {
  if (!config.showStats) document.getElementById('stats').style.display = 'none';
  if (!config.showSkills) document.getElementById('skills').style.display = 'none';
  if (!config.showResume) document.getElementById('resume').style.display = 'none';
  if (!config.showServices) document.getElementById('services').style.display = 'none';
  if (!config.showTestimonials) document.getElementById('testimonials').style.display = 'none';
  if (!config.showDropdown) document.getElementById('dropdown').style.display = 'none';
};
/** End of Toggle On and Off Sections */

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// Added Swiping and Audio Player
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const project = urlParams.get('project');

  let slideIndex = 0;
  switch (project) {
    case 'mayat': slideIndex = 0; break;
    case 'tinyfighter': slideIndex = 1; break;
    case 'thefish': slideIndex = 2; break;
    case 'et-un-nouveau-depart': slideIndex = 3; break;
    case 'the-autumn-stream': slideIndex = 4; break;
    case 'into-the-wild-wild-west': slideIndex = 5; break;
    case 'their-most-reverenced': slideIndex = 6; break;
    case 'cyberwinter-race': slideIndex = 7; break;
    case 'leaving-in-reminiscence': slideIndex = 8; break;
    case 'journey-to-the-west': slideIndex = 9; break;
    case 'la-tragedie-epique': slideIndex = 10; break;
    case 'mut1201-composition': slideIndex = 11; break;
    case 'jumala': slideIndex = 12; break;
    case 'seansong': slideIndex = 13; break;
    case 'applicationpieces': slideIndex = 14; break;
    default: slideIndex = 0; // Default to the first slide if no match
  }

  const swiper = new Swiper('.swiper', {
    loop: false,
    speed: 600,
    autoplay: {
      delay: 300000, // 5min, 1000=1s
    },
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    initialSlide: slideIndex,
  });

  const audioPlayer = new Audio();
  const albumImage = document.getElementById('album-image');
  const trackTitle = document.getElementById('track-title');
  const projectNameElement = document.getElementById('popup-project-name');
  const popupPlayer = document.getElementById('audio-popup-player');
  const playPauseBtn = document.getElementById('play-pause');
  const minimizeButton = document.getElementById('minimize-button');
  const openAudioPopupBtn = document.getElementById('open-audio-popup');
  const currentTimeElem = document.getElementById('current-time');
  const totalTimeElem = document.getElementById('total-time');
  const progressBar = document.querySelector('.progress-bar');
  const progress = document.querySelector('.progress');
  const volumeSlider = document.getElementById('volume-slider');

  let isPlaying = false;
  let currentAudioSrc = ''; // Global state to track the currently playing audio

  // Unified function to handle both content and audio updates on slide change
  function updateContentAndAudio(index) {
    const activeSlide = swiper.slides[index];

    // Project Details Update (Text, Video, Gallery)
    const projectUrl = activeSlide.getAttribute('data-url');
    const title = activeSlide.getAttribute('data-title');
    const category = activeSlide.getAttribute('data-category');
    const date = activeSlide.getAttribute('data-date');
    const description = activeSlide.getAttribute('data-description');
    const audio = activeSlide.getAttribute('data-audio');
    const video = activeSlide.getAttribute('data-video');
    const galleryImages = activeSlide.getAttribute('data-gallery-images');
    const galleryCaptions = activeSlide.getAttribute('data-gallery-captions');

    // Update the URL dynamically
    if (projectUrl) {
      const newUrl = projectUrl;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }

    // Update project details
    const projectTitle = document.getElementById('project-title');
    const projectInfoCategory = document.querySelector('#project-info li:nth-of-type(1)');
    const projectInfoDate = document.querySelector('#project-info li:nth-of-type(2)');
    const projectDescription = document.getElementById('project-description');
    const audioSection = document.querySelector('.audio-section');
    const embedSection = document.querySelector('.embed-section');

    // Display project info
    if (projectTitle) projectTitle.textContent = title;
    if (projectInfoCategory) projectInfoCategory.innerHTML = `<strong>Category</strong>: ${category}`;
    if (projectInfoDate) projectInfoDate.innerHTML = `<strong>Project Date</strong>: ${date}`;
    if (projectDescription) projectDescription.innerHTML = `<strong>Description</strong>: ${description}`;

    // Handle Video vs Audio Section
    if (video) {
      if (embedSection) {
        embedSection.style.display = 'block';
        if (embedSection.querySelector('iframe')) {
          embedSection.querySelector('iframe').src = video;
        }
      }
      if (audioSection) audioSection.style.display = 'none'; // Hide audio if video is present
    } else if (audio) {
      if (audioSection) {
        audioSection.style.display = 'block';
        if (audioSection.querySelector('audio source')) {
          audioSection.querySelector('audio source').src = audio;
        }
      }
      if (embedSection) embedSection.style.display = 'none'; // Hide video if audio is present
    } else {
      if (audioSection) audioSection.style.display = 'none';
      if (embedSection) embedSection.style.display = 'none';
    }

    // Handle Gallery Content
    const smallGallery = document.querySelector('.small-swiper-gallery');
    const swiperWrapper = smallGallery.querySelector('.swiper-wrapper');
    if (galleryImages && galleryImages.trim() !== '') {
      const images = galleryImages.split(','); // Assume images are comma-separated
      const captions = galleryCaptions ? galleryCaptions.split(',') : [];

      // Clear previous images
      swiperWrapper.innerHTML = '';
      images.forEach((imgSrc, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'swiper-slide';
        slideDiv.innerHTML = `
          <img src="${imgSrc}" alt="Gallery Image" class="gallery-image">
          ${captions[index] ? `<div class="swiper-caption">${captions[index]}</div>` : ''}
        `;
        swiperWrapper.appendChild(slideDiv);
      });
      smallGallery.style.display = 'block';
      // Re-initialize Swiper with new images
      if (typeof smallGallerySwiper !== 'undefined' && smallGallerySwiper !== null) {
        smallGallerySwiper.destroy();
      }
      smallGallerySwiper = new Swiper('.small-swiper-gallery', {
        loop: true,
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true }
      });
    } else {
      smallGallery.style.display = 'none';
    }

    // Update Audio Player
    updateAudioPlayer(index);
}

  // Update Audio Player Logic
  function updateAudioPlayer(index) {
    const activeSlide = swiper.slides[index];
    const audioSrc = activeSlide.getAttribute('data-audio');
    const audioNames = activeSlide.getAttribute('data-audio-names');
    const title = activeSlide.getAttribute('data-title');
    const project = activeSlide.getAttribute('data-client');
    const imageSrc = activeSlide.querySelector('img') ? activeSlide.querySelector('img').src : '';

    if (audioSrc) {
      const audioSources = audioSrc.split(',').map(src => src.trim());
      const titles = audioNames ? audioNames.split(',').map(name => name.trim()) : [title];

      // Clear and regenerate the buttons for the current project
      createAudioTrackButtons(audioSources, titles);

      // Initialize the player with the first track of the current project
      audioPlayer.src = audioSources[0];
      trackTitle.textContent = titles[0];
      albumImage.src = imageSrc;
      projectNameElement.textContent = project;
      audioPlayer.load();
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }

  {
  // Update content and audio on slide change
  swiper.on('slideChange', () => {
    updateContentAndAudio(swiper.realIndex);
  });

    // Handle Small Gallery
    const smallGallery = document.querySelector('.small-swiper-gallery');
    const swiperWrapper = smallGallery.querySelector('.swiper-wrapper');

    // Check if galleryImages exist and if there are valid images
    if (galleryImages && galleryImages.trim() !== '') {
      const images = galleryImages.split(','); // Assume images are comma-separated
      const captions = galleryCaptions ? galleryCaptions.split(',') : [];

      // Clear previous images to avoid duplication
      swiperWrapper.innerHTML = '';

      if (images.length > 1) { // Ensure there are multiple images before showing the gallery
        // Inject new images with captions
        images.forEach((imgSrc, index) => {
          const slideDiv = document.createElement('div');
          slideDiv.className = 'swiper-slide';
          slideDiv.innerHTML = `
            <img src="${imgSrc}" alt="Gallery Image" class="gallery-image">
            ${captions[index] ? `<div class="swiper-caption">${captions[index]}</div>` : ''}
          `;
          swiperWrapper.appendChild(slideDiv);
        });

        // Show the gallery since there are multiple images
        smallGallery.style.display = 'block';

        // Check if Swiper is already initialized and destroy it if so
        if (typeof smallGallerySwiper !== 'undefined' && smallGallerySwiper !== null) {
          smallGallerySwiper.destroy(); // Destroy the previous Swiper instance
        }

        // Re-initialize the Swiper instance with new settings
        smallGallerySwiper = new Swiper('.small-swiper-gallery', {
          loop: true,
          speed: 600,
          slidesPerView: 1, // Show one image at a time
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });

        // Add click event listener for zoom-in functionality
        const galleryImages = document.querySelectorAll('.gallery-image');
        galleryImages.forEach(image => {
          image.addEventListener('click', () => {
            openImageZoom(image.src);
          });
        });

      } else {
        // Hide the gallery if no multiple images are present
        smallGallery.style.display = 'none';
      }
    } else {
      // Hide the gallery if galleryImages is null or undefined
      smallGallery.style.display = 'none';
    }
  }

  // Create Audio Track Buttons
  function createAudioTrackButtons(audioSources, titles) {
    const audioTrackButtonsContainer = document.getElementById('audio-track-buttons');
    audioTrackButtonsContainer.innerHTML = ''; // Clear any existing buttons

    audioSources.forEach((audioSrc, index) => {
        const button = document.createElement('button');
        const buttonText = document.createElement('span');
        buttonText.textContent = titles[index] || `Track ${index + 1}`;
        button.className = 'audio-track-button';

        button.appendChild(buttonText);

        button.addEventListener('click', () => {
            if (audioPlayer.src !== audioSrc) {
                audioPlayer.src = audioSrc;
                currentAudioSrc = audioSrc;

                audioPlayer.load();
                audioPlayer.play();
                trackTitle.textContent = titles[index];
            } else {
                audioPlayer.play();
            }

            if (popupPlayer) {
                popupPlayer.classList.add('active');
                popupPlayer.classList.remove('minimized');
            }

            if (minimizeButton) {
                minimizeButton.classList.remove('minimized');
            }
        });

        audioTrackButtonsContainer.appendChild(button);
    });
}


  // Zoom-in functionality
  function openImageZoom(src) {
    const modal = document.createElement('div');
    modal.id = 'image-zoom-modal';
    modal.innerHTML = `
      <span class="close">&times;</span>
      <img src="${src}" alt="Zoomed Image">
    `;
    document.body.appendChild(modal);

    modal.style.display = 'flex';

    // Close modal on click of close button
    modal.querySelector('.close').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Close modal on click outside the image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  // First Audio Player Code: Initialize the project details based on the initial slide index
  updateProjectDetails(slideIndex);
  updateAudioPlayer(slideIndex);

  function updateAudioPlayer(index) {
    const activeSlide = swiper.slides[index];
    const audioSrc = activeSlide.getAttribute('data-audio');
    const audioNames = activeSlide.getAttribute('data-audio-names');
    const title = activeSlide.getAttribute('data-title');
    const project = activeSlide.getAttribute('data-client');
    const imageSrc = activeSlide.querySelector('img') ? activeSlide.querySelector('img').src : '';

    // Reset the audio player for each project
    if (audioSrc && currentAudioSrc !== audioSrc) {
        currentAudioSrc = audioSrc;
        const audioSources = audioSrc.split(',').map(src => src.trim());
        const titles = audioNames ? audioNames.split(',').map(name => name.trim()) : [title];

        // Clear and regenerate the buttons for the current project
        createAudioTrackButtons(audioSources, titles);

        // Initialize the player with the first track of the current project
        audioPlayer.src = audioSources[0];
        currentAudioSrc = audioSources[0];
        trackTitle.textContent = titles[0];
        albumImage.src = imageSrc;
        projectNameElement.textContent = project;

        audioPlayer.load();
        audioPlayer.play();
    } else if (audioSrc) {
        // If the audioSrc is the same, just play the audio
        audioPlayer.play();
    }
}

  

  swiper.on('slideChange', () => {
    const realIndex = swiper.realIndex; 
    updateProjectDetails(swiper.realIndex);
    // Do not call updateAudioPlayer here to keep the current track playing
  });



  // Initialize the project details and audio player based on the initial slide index
  updateProjectDetails(slideIndex);
  updateAudioPlayer(slideIndex);

  // Back to Main Page from Details Page
  document.querySelector('.btn-back-to-portfolio').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    window.location.href = 'index.html#portfolio'; // Navigate to portfolio page
  });

  // Open the popup player
  if (openAudioPopupBtn) {
    openAudioPopupBtn.addEventListener('click', () => {
      const currentSlide = document.querySelector('.swiper-slide-active');
      if (!currentSlide) {
        console.error('No active slide found.');
        return;
      }

      const audioSrc = currentSlide.getAttribute('data-audio');
      const title = currentSlide.getAttribute('data-title');
      const project = currentSlide.getAttribute('data-client');
      const imageSrc = currentSlide.querySelector('img') ? currentSlide.querySelector('img').src : '';

      if (audioSrc && audioSrc !== currentAudioSrc) { // Only change if it's a new audio source
        audioPlayer.src = audioSrc;
        currentAudioSrc = audioSrc;

        if (trackTitle) trackTitle.textContent = title;
        if (projectNameElement) projectNameElement.textContent = project;
        if (albumImage) albumImage.src = imageSrc;

        audioPlayer.load();
        audioPlayer.play();
      } else {
        audioPlayer.play(); // Resume playback if already playing the current audio
      }

      if (popupPlayer) {
        popupPlayer.classList.add('active');
        popupPlayer.classList.remove('minimized');
      }

      if (minimizeButton) {
        minimizeButton.classList.remove('minimized');
      }
    });
  }

  // Minimize the popup player
  if (minimizeButton) {
    minimizeButton.addEventListener('click', () => {
      if (popupPlayer) {
        popupPlayer.classList.toggle('minimized');
      }
      minimizeButton.classList.toggle('minimized');
    });
  }

  // Play or pause audio
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
    });
  }

  // Event listeners for the audio player
  audioPlayer.addEventListener('play', () => {
    isPlaying = true;
    if (playPauseBtn) {
      playPauseBtn.querySelector('.play-icon').style.display = 'none';
      playPauseBtn.querySelector('.pause-icon').style.display = 'inline';
    }
  });

  audioPlayer.addEventListener('pause', () => {
    isPlaying = false;
    if (playPauseBtn) {
      playPauseBtn.querySelector('.play-icon').style.display = 'inline';
      playPauseBtn.querySelector('.pause-icon').style.display = 'none';
    }
  });

  audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    updateTimeDisplay(currentTime, duration);
    updateProgress(currentTime, duration);
  });

  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      const progressBarWidth = progressBar.offsetWidth;
      const clickX = e.offsetX;
      const duration = audioPlayer.duration;
      audioPlayer.currentTime = (clickX / progressBarWidth) * duration;
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      audioPlayer.volume = e.target.value;
    });
  }

  function updateTimeDisplay(currentTime, duration) {
    if (currentTimeElem && totalTimeElem) {
      currentTimeElem.textContent = formatTime(currentTime);
      totalTimeElem.textContent = formatTime(duration);
    }
  }

  function updateProgress(currentTime, duration) {
    if (progress) {
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;
    }
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

}); 
  

//Subpage Image Gallery
const gallerySwiper = new Swiper('.portfolio-gallery', {
  spaceBetween: 10,
  slidesPerView: 1,
  loop: true, // Allows infinite loop scrolling
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
});
