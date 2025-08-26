// Journey data with romantic messages and photos for each destination
const journeyData = [
    {
        id: 'cape-town',
        title: 'Cape Town, South Africa 🌍',
        message: 'Where your journey begins... Under Table Mountain\'s watchful gaze, your adventure starts with endless possibilities ahead. Every sunset here whispers of the magic that awaits you.',
        photo: 'public/photos/cath1.jpg',
        pathId: 'path1'
    },
    {
        id: 'india',
        title: 'India ✈️',
        message: 'Back to the land of vibrant celebrations... Returning to India for a beautiful wedding, where colors dance in the air and love fills every moment. Among the festivities and joy, you shine brighter than any celebration.',
        photo: 'public/photos/Cath4.jpg',
        pathId: 'path2'
    },
    {
        id: 'australia',
        title: 'Australia 🐨✨',
        message: 'Home is where your heart rests... Back in the land down under, surrounded by familiar faces and places you love. The Southern Cross shines brighter when you\'re beneath it.',
        photo: 'public/photos/Cath3.jpg',
        pathId: 'path3'
    },
    {
        id: 'south-africa',
        title: 'South Africa - February ❤️',
        message: 'Where our paths finally meet... The circle completes as you return to where it all began. But this time, something magical is waiting for you here.',
        photo: 'public/photos/Cath2.jpg',
        pathId: null
    }
];

let currentStep = 0;
let noButtonClickCount = 0;

// Initialize the app
function init() {
    // Try to play background music (will need user interaction first)
    const music = document.getElementById('background-music');
    if (music) {
        music.volume = 0.3;
    }
}

// Start the journey
function startJourney() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const journeyScreen = document.getElementById('journey-screen');
    
    welcomeScreen.classList.remove('active');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        journeyScreen.classList.add('active');
        journeyScreen.style.display = 'flex';
        
        // Start the first location after a brief delay
        setTimeout(() => {
            showLocation(0);
        }, 1000);
    }, 500);
}

// Show location details
function showLocation(stepIndex) {
    if (stepIndex >= journeyData.length) {
        showProposal();
        return;
    }
    
    const location = journeyData[stepIndex];
    const point = document.getElementById(location.id);
    const card = document.getElementById('location-card');
    const title = document.getElementById('location-title');
    const message = document.getElementById('location-message');
    const photo = document.getElementById('location-photo');
    
    // Animate the journey point
    point.classList.add('active');
    
    // Show the flight path if it exists
    if (location.pathId) {
        const path = document.getElementById(location.pathId);
        if (path) {
            setTimeout(() => {
                path.classList.add('animate');
            }, 500);
        }
    }
    
    // Show location card with details
    setTimeout(() => {
        title.textContent = location.title;
        message.textContent = location.message;
        photo.src = location.photo;
        
        // Add photo hover effect for hearts
        setupPhotoHeartEffect(photo);
        
        card.classList.remove('hidden');
        
        // Add some sparkle effects
        createSparkles(point);
    }, 1000);
    
    currentStep = stepIndex;
}

// Continue to next location
function nextLocation() {
    const card = document.getElementById('location-card');
    card.classList.add('hidden');
    
    setTimeout(() => {
        showLocation(currentStep + 1);
    }, 500);
}

// Show the proposal screen
function showProposal() {
    const journeyScreen = document.getElementById('journey-screen');
    const proposalScreen = document.getElementById('proposal-screen');
    
    journeyScreen.classList.remove('active');
    setTimeout(() => {
        journeyScreen.style.display = 'none';
        proposalScreen.classList.add('active');
        proposalScreen.style.display = 'flex';
        
        // Add some romantic effects
        createFloatingHearts();
    }, 500);
}

// Handle YES button click
function handleYes() {
    const proposalScreen = document.getElementById('proposal-screen');
    const celebrationScreen = document.getElementById('celebration-screen');
    
    // Play celebration sound if available
    playSound('celebration');
    
    proposalScreen.classList.remove('active');
    setTimeout(() => {
        proposalScreen.style.display = 'none';
        celebrationScreen.classList.add('active');
        celebrationScreen.style.display = 'flex';
        
        // Start celebration animations
        startCelebration();
    }, 500);
}

// Handle NO button click (make it run away!)
function handleNo() {
    const noBtn = document.getElementById('no-btn');
    noButtonClickCount++;
    
    // Make the button harder to catch each time
    noBtn.classList.add('running');
    
    // Change button text to be more playful
    const playfulTexts = [
        'NO (Really?)',
        'NO (Come on...)',
        'NO (You sure?)',
        'NO (Pretty please?)',
        'NO (I\'ll wait...)',
        "Are you sure? 🥺",
        "Really? 💔",
        "Think again! 😢",
        "Please? 🙏",
        "One more chance? 💕",
        "Don't go! 😭",
        "Wait! 🏃‍♀️",
        "Come back! 💨",
        "Catch me! 😜"
    ];
    
    if (noButtonClickCount < playfulTexts.length) {
        noBtn.textContent = playfulTexts[noButtonClickCount - 1];
    } else {
        const randomMessage = playfulTexts[Math.floor(Math.random() * playfulTexts.length)];
        noBtn.textContent = randomMessage;
    }
    
    // Make the button run away to random positions on screen
    const buttonWidth = noBtn.offsetWidth || 120;
    const buttonHeight = noBtn.offsetHeight || 50;
    
    // Get safe boundaries (leave more margin on mobile)
    const isMobile = window.innerWidth <= 768;
    const margin = isMobile ? 40 : 20; // Larger margin on mobile
    const maxX = Math.max(margin, window.innerWidth - buttonWidth - margin);
    const maxY = Math.max(margin, window.innerHeight - buttonHeight - margin);
    
    // Generate random position (avoid center area on mobile for better UX)
    let randomX, randomY;
    if (isMobile) {
        // On mobile, prefer edges and corners for more dramatic effect
        const preferEdge = Math.random() > 0.3;
        if (preferEdge) {
            randomX = Math.random() > 0.5 ? margin : maxX - margin;
            randomY = Math.random() * (maxY - margin) + margin;
        } else {
            randomX = Math.random() * (maxX - margin) + margin;
            randomY = Math.random() > 0.5 ? margin : maxY - margin;
        }
    } else {
        randomX = Math.random() * (maxX - margin) + margin;
        randomY = Math.random() * (maxY - margin) + margin;
    }
    
    // Apply the runaway animation
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    noBtn.style.zIndex = '9999';
    
    // Add a little shake effect before moving
    noBtn.style.animation = 'shake 0.2s ease-in-out';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 200);
    
    // Add a little shake to the YES button to draw attention
    const yesBtn = document.getElementById('yes-btn');
    yesBtn.style.animation = 'heartbeat 0.5s ease-in-out';
    setTimeout(() => {
        yesBtn.style.animation = '';
    }, 500);
}

// Start celebration with fireworks and hearts
function startCelebration() {
    createFireworks();
    createCelebrationHearts();
    
    // Continue creating effects for a while
    const effectInterval = setInterval(() => {
        createFireworks();
        createCelebrationHearts();
    }, 1000);
    
    // Stop after 10 seconds
    setTimeout(() => {
        clearInterval(effectInterval);
    }, 10000);
}

// Create sparkle effects around journey points
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const container = document.querySelector('.map-container');
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.left = rect.left + rect.width/2 + 'px';
            sparkle.style.top = rect.top + rect.height/2 + 'px';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#ffd93d';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 30 + Math.random() * 20;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            sparkle.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 1 },
                { transform: `translate(${endX}px, ${endY}px) scale(1)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'ease-out'
            });
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 800);
        }, i * 100);
    }
}

// Create floating hearts for romantic effect
function createFloatingHearts() {
    const heartsInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = ['💕', '💖', '💗', '💝'][Math.floor(Math.random() * 4)];
        heart.className = 'floating-heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (1 + Math.random()) + 'rem';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }, 500);
    
    // Stop after 5 seconds
    setTimeout(() => {
        clearInterval(heartsInterval);
    }, 5000);
}

// Create fireworks effect
function createFireworks() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#ff9ff3'];
    const container = document.querySelector('.fireworks-container');
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.2;
            
            // Create multiple particles for each firework
            for (let j = 0; j < 12; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework';
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                const angle = (j / 12) * Math.PI * 2;
                const distance = 50 + Math.random() * 100;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                
                particle.animate([
                    { transform: 'translate(0, 0) scale(0)', opacity: 1 },
                    { transform: `translate(${endX}px, ${endY}px) scale(1)`, opacity: 1 },
                    { transform: `translate(${endX * 1.5}px, ${endY * 1.5}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 1000 + Math.random() * 500,
                    easing: 'ease-out'
                });
                
                container.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 1500);
            }
        }, i * 200);
    }
}

// Create celebration hearts
function createCelebrationHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = ['💕', '💖', '💗', '💝', '❤️'][Math.floor(Math.random() * 5)];
            heart.className = 'floating-heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (1.5 + Math.random()) + 'rem';
            heart.style.animationDuration = (2 + Math.random()) + 's';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 200);
    }
}

// Setup photo heart effect on hover
function setupPhotoHeartEffect(photoElement) {
    if (!photoElement) return;
    
    const photoHeartsContainer = photoElement.parentElement.querySelector('.photo-hearts');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile, use touch events for better responsiveness
        photoElement.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent default touch behavior
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createPhotoHeart(photoHeartsContainer);
                }, i * 150);
            }
        });
        
        // Add tap effect for more hearts
        photoElement.addEventListener('click', (e) => {
            e.preventDefault();
            for (let i = 0; i < 5; i++) { // More hearts on mobile for better visual feedback
                setTimeout(() => {
                    createPhotoHeart(photoHeartsContainer);
                }, i * 80);
            }
        });
    } else {
        // Desktop hover and click effects
        photoElement.addEventListener('mouseenter', () => {
            // Create multiple hearts when hovering
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createPhotoHeart(photoHeartsContainer);
                }, i * 200);
            }
        });
        
        // Also create hearts on click
        photoElement.addEventListener('click', () => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createPhotoHeart(photoHeartsContainer);
                }, i * 100);
            }
        });
    }
}

// Create individual photo heart
function createPhotoHeart(container) {
    const heart = document.createElement('div');
    heart.textContent = ['💕', '💖', '💗'][Math.floor(Math.random() * 3)];
    heart.className = 'photo-heart';
    heart.style.left = (20 + Math.random() * 60) + '%';
    heart.style.top = (20 + Math.random() * 60) + '%';
    heart.style.fontSize = (1 + Math.random() * 0.5) + 'rem';
    
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Play sound effects (placeholder for future audio files)
function playSound(type) {
    // This would play different sounds based on type
    // For now, we'll just try to play the background music
    const music = document.getElementById('background-music');
    if (music && music.paused) {
        music.play().catch(e => {
            console.log('Audio play failed:', e);
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    init();
    initializeBackgroundMusic();
});

// Initialize background music
function initializeBackgroundMusic() {
    const music = document.getElementById('backgroundMusic');
    if (music) {
        // Set volume to a comfortable level
        music.volume = 0.3;
        
        // Try to play the music
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Background music started successfully');
            }).catch(error => {
                console.log('Autoplay prevented by browser. Music will start on user interaction.');
                
                // Add event listener to start music on first user interaction
                const startMusicOnInteraction = () => {
                    music.play().then(() => {
                        console.log('Background music started after user interaction');
                    }).catch(e => console.log('Could not start music:', e));
                    
                    // Remove the event listeners after first interaction
                    document.removeEventListener('click', startMusicOnInteraction);
                    document.removeEventListener('touchstart', startMusicOnInteraction);
                };
                
                document.addEventListener('click', startMusicOnInteraction);
                document.addEventListener('touchstart', startMusicOnInteraction);
            });
        }
    }
}

// Add click event to enable audio (browsers require user interaction)
document.addEventListener('click', function() {
    const music = document.getElementById('background-music');
    if (music && music.paused) {
        music.play().catch(e => {
            console.log('Audio play failed:', e);
        });
    }
}, { once: true });