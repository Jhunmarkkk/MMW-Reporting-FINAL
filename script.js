// Smooth Parallax Scroll Effects with Animation Reset + Morphing Features + Grainy Design
// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button based on scroll position
function handleBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;
    
    if (window.pageYOffset > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
}

// Fullscreen Toggle Function
function toggleFullscreen() {
    const elem = document.documentElement;
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const fullscreenIcon = document.getElementById('fullscreenIcon');
    const fullscreenExitIcon = document.getElementById('fullscreenExitIcon');
    
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        // Enter fullscreen
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        
        fullscreenIcon.style.display = 'none';
        fullscreenExitIcon.style.display = 'block';
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
        fullscreenIcon.style.display = 'block';
        fullscreenExitIcon.style.display = 'none';
    }
}

// Listen for fullscreen changes to update icon
document.addEventListener('fullscreenchange', updateFullscreenIcon);
document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
document.addEventListener('mozfullscreenchange', updateFullscreenIcon);
document.addEventListener('MSFullscreenChange', updateFullscreenIcon);

function updateFullscreenIcon() {
    const fullscreenIcon = document.getElementById('fullscreenIcon');
    const fullscreenExitIcon = document.getElementById('fullscreenExitIcon');
    
    const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    
    if (isFullscreen) {
        fullscreenIcon.style.display = 'none';
        fullscreenExitIcon.style.display = 'block';
    } else {
        fullscreenIcon.style.display = 'block';
        fullscreenExitIcon.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // DEVICE DETECTION - Mobile/Tablet Check
    // ========================================
    
    function detectMobileDevice() {
        // Check for touch capability
        const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Check user agent for mobile/tablet
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
        
        // Check screen width (tablets and phones are typically < 1024px)
        const isSmallScreen = window.innerWidth < 1024;
        
        // Consider it mobile if it has touch AND (is mobile UA OR small screen)
        return hasTouchScreen && (isMobileUA || isSmallScreen);
    }
    
    const isMobileDevice = detectMobileDevice();
    
    // ========================================
    // CUSTOM CURSOR SYSTEM (Desktop Only)
    // ========================================
    
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    // Hide cursor elements on mobile devices
    if (isMobileDevice && cursor && cursorDot) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    }
    
    if (cursor && cursorDot && !isMobileDevice) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let dotX = 0;
        let dotY = 0;
        
        // Smooth cursor animation
        function animateCursor() {
            // Outer ring follows with slight delay (smooth lag)
            const ringSpeed = 0.35;
            cursorX += (mouseX - cursorX) * ringSpeed;
            cursorY += (mouseY - cursorY) * ringSpeed;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            // Inner dot follows more quickly
            const dotSpeed = 0.6;
            dotX += (mouseX - dotX) * dotSpeed;
            dotY += (mouseY - dotY) * dotSpeed;
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
            
            // Check background color at cursor position for visibility
            if (document.elementFromPoint && mouseX > 0 && mouseY > 0) {
                const elementUnderCursor = document.elementFromPoint(mouseX, mouseY);
                if (elementUnderCursor) {
                    const bgColor = window.getComputedStyle(elementUnderCursor).backgroundColor;
                    const bgBrightness = getBrightness(bgColor);
                    
                    // If background is bright/white, enhance cursor visibility
                    if (bgBrightness > 200) {
                        cursor.style.boxShadow = 
                            '-20px 0 30px rgba(255, 255, 255, 0.15), ' +
                            '20px 0 30px rgba(255, 255, 255, 0.15), ' +
                            '0 0 40px rgba(255, 255, 255, 0.1), ' +
                            '0 0 0 3px rgba(0, 0, 0, 0.5), ' +
                            '0 0 0 4px rgba(255, 255, 255, 0.9), ' +
                            '0 0 15px rgba(0, 0, 0, 0.3)';
                        cursor.style.borderColor = 'rgba(0, 0, 0, 0.8)';
                        cursorDot.style.boxShadow = 
                            '0 0 10px rgba(255, 255, 255, 0.8), ' +
                            '0 0 20px rgba(255, 255, 255, 0.4), ' +
                            '0 0 0 2px rgba(0, 0, 0, 0.7), ' +
                            '0 0 0 3px rgba(255, 255, 255, 1)';
                        cursorDot.style.background = 'rgba(0, 0, 0, 0.9)';
                    } else {
                        // Reset to normal white cursor for dark backgrounds
                        cursor.style.boxShadow = 
                            '-20px 0 30px rgba(255, 255, 255, 0.15), ' +
                            '20px 0 30px rgba(255, 255, 255, 0.15), ' +
                            '0 0 40px rgba(255, 255, 255, 0.1), ' +
                            '0 0 0 2px rgba(0, 0, 0, 0.3), ' +
                            '0 0 0 3px rgba(255, 255, 255, 0.9)';
                        cursor.style.borderColor = 'rgba(255, 255, 255, 0.9)';
                        cursorDot.style.boxShadow = 
                            '0 0 10px rgba(255, 255, 255, 0.8), ' +
                            '0 0 20px rgba(255, 255, 255, 0.4), ' +
                            '0 0 0 1px rgba(0, 0, 0, 0.5), ' +
                            '0 0 0 2px rgba(255, 255, 255, 1)';
                        cursorDot.style.background = 'rgba(255, 255, 255, 1)';
                    }
                }
            }
            
            requestAnimationFrame(animateCursor);
        }
        
        // Helper function to calculate brightness from RGB color
        function getBrightness(rgb) {
            // Handle rgb/rgba format
            const match = rgb.match(/\d+/g);
            if (match && match.length >= 3) {
                const r = parseInt(match[0]);
                const g = parseInt(match[1]);
                const b = parseInt(match[2]);
                // Calculate perceived brightness
                return (r * 299 + g * 587 + b * 114) / 1000;
            }
            return 128; // Default to medium brightness
        }
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Click animation effect
        document.addEventListener('click', (e) => {
            // Create ripple effect at cursor position
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            
            // Position at cursor
            ripple.style.left = dotX + 'px';
            ripple.style.top = dotY + 'px';
            
            document.body.appendChild(ripple);
            
            // Trigger animation immediately
            requestAnimationFrame(() => {
                ripple.classList.add('active');
            });
            
            // Remove after animation completes (0.6s + buffer)
            setTimeout(() => {
                ripple.remove();
            }, 650);
            
            // Enhanced pulse effect to cursor itself - scale down then bounce back
            cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
            cursor.style.opacity = '0.8';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.8)';
            cursorDot.style.opacity = '0.9';
            
            setTimeout(() => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.opacity = '1';
            }, 250);
        });
        
        // Expand cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .btn, .cta-button, .quiz-button, .admin-delete-btn, ' +
            'input[type="button"], input[type="submit"], .flip-card, ' +
            '.quiz-option, [onclick], .clickable'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.width = 'calc(var(--cursor-size) * 1.4)';
                cursor.style.height = 'calc(var(--cursor-size) * 1.4)';
                cursor.style.borderColor = 'rgba(255, 255, 255, 1)';
                cursor.style.borderWidth = '2.5px';
                cursor.style.background = 'radial-gradient(circle at center, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.12) 50%, transparent 100%)';
                cursor.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)';
                cursorDot.style.width = 'calc(var(--cursor-dot-size) * 1.5)';
                cursorDot.style.height = 'calc(var(--cursor-dot-size) * 1.5)';
                cursorDot.style.boxShadow = '0 0 12px rgba(255, 255, 255, 1), 0 0 24px rgba(255, 255, 255, 0.7), 0 0 36px rgba(255, 255, 255, 0.4)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.width = 'var(--cursor-size)';
                cursor.style.height = 'var(--cursor-size)';
                cursor.style.borderColor = 'rgba(255, 255, 255, 0.95)';
                cursor.style.borderWidth = '2px';
                cursor.style.background = 'transparent';
                cursor.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.4), 0 0 50px rgba(255, 255, 255, 0.25), 0 0 80px rgba(255, 255, 255, 0.15), 0 0 120px rgba(255, 255, 255, 0.08), inset 0 0 30px rgba(255, 255, 255, 0.05)';
                cursorDot.style.width = 'var(--cursor-dot-size)';
                cursorDot.style.height = 'var(--cursor-dot-size)';
                cursorDot.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.6), 0 0 24px rgba(255, 255, 255, 0.3)';
            });
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
        
        // Start cursor animation
        animateCursor();
    }
    
    // ========================================
    // GRAINY TEXTURE CANVAS GENERATION
    // ========================================
    
    function generateGrainCanvas() {
        const canvas = document.getElementById('grainCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationFrame;
        let frame = 0;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function drawGrain() {
            const width = canvas.width;
            const height = canvas.height;
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Optimize grain generation - use smaller resolution for performance
            const grainScale = 3; // Reduce resolution by this factor for better performance
            const grainWidth = Math.floor(width / grainScale);
            const grainHeight = Math.floor(height / grainScale);
            
            // Create grain pattern at reduced resolution
            const imageData = ctx.createImageData(grainWidth, grainHeight);
            const data = imageData.data;
            const grainIntensity = 0.15;
            
            for (let i = 0; i < data.length; i += 4) {
                // Generate random noise
                const noise = (Math.random() - 0.5) * grainIntensity;
                const value = Math.floor(128 + noise * 255);
                
                // Apply noise to RGB channels (grayscale)
                data[i] = value;     // R
                data[i + 1] = value; // G
                data[i + 2] = value; // B
                data[i + 3] = 70;   // A (opacity)
            }
            
            // Draw at reduced resolution and scale up for pixelated effect
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = grainWidth;
            tempCanvas.height = grainHeight;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.putImageData(imageData, 0, 0);
            
            // Scale up with pixelated rendering (no smoothing)
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(tempCanvas, 0, 0, width, height);
            
            // Regenerate grain pattern periodically for subtle animation
            frame++;
            const updateDelay = 60; // Update pattern every ~60ms (~16fps for grain animation)
            setTimeout(() => requestAnimationFrame(drawGrain), updateDelay);
        }
        
        resizeCanvas();
        drawGrain();
        
        window.addEventListener('resize', () => {
            resizeCanvas();
        });
    }
    
    // Initialize grain canvas
    generateGrainCanvas();
    
    // ========================================
    // GRAIN INTENSITY RESPONSIVE TO SCROLL
    // ========================================
    
    let grainScrollVelocity = 0;
    let lastGrainScroll = window.scrollY;
    const grainOverlay = document.querySelector('.grain-overlay');
    const grainTexture = document.querySelector('.grain-texture');
    const grainCanvas = document.getElementById('grainCanvas');
    
    function updateGrainEffect() {
        const currentScroll = window.scrollY;
        grainScrollVelocity = Math.abs(currentScroll - lastGrainScroll);
        lastGrainScroll = currentScroll;
        
        if (grainOverlay && grainTexture && grainCanvas) {
            // Calculate scroll intensity (0-1)
            const scrollIntensity = Math.min(grainScrollVelocity / 30, 1);
            
            // Increase grain visibility during scroll
            const baseOpacity = 0.25;
            const scrollOpacity = baseOpacity + (scrollIntensity * 0.15);
            grainOverlay.style.opacity = Math.min(scrollOpacity, 0.4);
            
            // Speed up grain animation during scroll
            const baseAnimationSpeed = 8;
            const scrollAnimationSpeed = Math.max(baseAnimationSpeed - (scrollIntensity * 3), 4);
            grainOverlay.style.animationDuration = `${scrollAnimationSpeed}s`;
            
            // Increase texture opacity during scroll
            const textureBaseOpacity = 0.12;
            const textureScrollOpacity = textureBaseOpacity + (scrollIntensity * 0.08);
            grainTexture.style.opacity = Math.min(textureScrollOpacity, 0.2);
            
            // Increase canvas opacity during scroll
            const canvasBaseOpacity = 0.08;
            const canvasScrollOpacity = canvasBaseOpacity + (scrollIntensity * 0.05);
            grainCanvas.style.opacity = Math.min(canvasScrollOpacity, 0.15);
        }
        
        requestAnimationFrame(updateGrainEffect);
    }
    
    // Start grain effect update loop
    updateGrainEffect();
    
    // ========================================
    // GRAIN INTERACTION ON MOUSE MOVEMENT
    // ========================================
    
    let grainMouseTimeout;
    document.addEventListener('mousemove', () => {
        if (grainOverlay) {
            grainOverlay.style.opacity = '0.3';
            
            clearTimeout(grainMouseTimeout);
            grainMouseTimeout = setTimeout(() => {
                grainOverlay.style.opacity = '0.25';
            }, 800);
        }
    });
    
    // Pulse grain on click/interaction
    document.addEventListener('click', () => {
        if (grainOverlay && grainTexture) {
            grainOverlay.style.opacity = '0.35';
            grainTexture.style.opacity = '0.18';
            
            setTimeout(() => {
                grainOverlay.style.opacity = '0.25';
                grainTexture.style.opacity = '0.12';
            }, 400);
        }
    });
    
    // Initialize hero animation on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('active');
        }, 300);
    }

    // ========================================
    // FLIP CARD FUNCTIONALITY
    // ========================================
    
    // Global flip card function
    window.flipCard = function(cardElement) {
        cardElement.classList.toggle('flipped');
    };
    
    // Add smooth reveal animation for flip cards
    const flipCards = document.querySelectorAll('.flip-card');
    const flipCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Reset first to retrigger animation
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                // Reset when out of view
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
            }
        });
    }, { threshold: 0.2 });
    
    flipCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        flipCardObserver.observe(card);
        
        // Reset flip on scroll out
        const cardSection = card.closest('.flip-cards-section');
        if (cardSection) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        // Reset all cards when section is out of view
                        const cardsInSection = entry.target.querySelectorAll('.flip-card');
                        cardsInSection.forEach(c => {
                            c.classList.remove('flipped');
                        });
                    }
                });
            }, { threshold: 0 });
            
            sectionObserver.observe(cardSection);
        }
    });

    // ========================================
    // MORPHING BLOB GENERATION & ANIMATION
    // ========================================
    
    // Generate smooth blob SVG path
    function generateBlobPath(centerX, centerY, radius, points = 6) {
        const angleStep = (Math.PI * 2) / points;
        let path = 'M';
        const coords = [];
        
        for (let i = 0; i <= points; i++) {
            const angle = i * angleStep;
            const radiusVariation = radius * (0.7 + Math.random() * 0.6);
            const x = centerX + Math.cos(angle) * radiusVariation;
            const y = centerY + Math.sin(angle) * radiusVariation;
            coords.push({ x, y });
        }
        
        // Create smooth curve using quadratic bezier
        for (let i = 0; i < coords.length - 1; i++) {
            const curr = coords[i];
            const next = coords[i + 1];
            const xc = (curr.x + next.x) / 2;
            const yc = (curr.y + next.y) / 2;
            
            if (i === 0) {
                path += `${curr.x},${curr.y} `;
            }
            path += `Q${curr.x},${curr.y} ${xc},${yc} `;
        }
        
        path += 'Z';
        return path;
    }
    
    // Animate background morphing blobs
    function animateMorphBlobs() {
        const blobs = document.querySelectorAll('.morph-blob');
        
        blobs.forEach((blob, index) => {
            const animate = () => {
                const path1 = generateBlobPath(500, 500, 200 + index * 50, 6 + index);
                const path2 = generateBlobPath(500, 500, 200 + index * 50, 6 + index);
                
                blob.setAttribute('d', path1);
                
                setTimeout(() => {
                    blob.style.transition = 'd 4s ease-in-out';
                    blob.setAttribute('d', path2);
                }, 100);
                
                setTimeout(animate, 4000 + index * 500);
            };
            
            setTimeout(animate, index * 1000);
        });
    }
    
    // Animate floating morph blobs in features section
    function animateFloatingMorphs() {
        const floatMorphs = document.querySelectorAll('.float-morph .morph-path');
        
        floatMorphs.forEach((morph, index) => {
            const animate = () => {
                const path = generateBlobPath(100, 100, 60, 5 + (index % 3));
                morph.setAttribute('d', path);
                setTimeout(animate, 3000 + index * 400);
            };
            
            setTimeout(animate, index * 600);
        });
    }
    
    // Initialize morphing animations
    animateMorphBlobs();
    animateFloatingMorphs();

    // ========================================
    // ULTRA-SMOOTH PARALLAX SYSTEM WITH EASING
    // ========================================
    
    // Easing functions for smooth transitions
    const easing = {
        // Smooth ease-out (for natural deceleration)
        easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
        // Smooth ease-in-out
        easeInOutCubic: (t) => t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2,
        // Spring-like easing
        easeOutElastic: (t) => {
            const c4 = (2 * Math.PI) / 3;
            return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
        },
        // Smooth exponential
        easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    };
    
    // Smooth scroll interpolation system
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let scrollVelocity = 0;
    let lastScrollTime = Date.now();
    let ticking = false;
    
    // Track scroll momentum
    let scrollHistory = [];
    const maxHistoryLength = 5;
    
    function updateScrollHistory(scrollY) {
        const now = Date.now();
        scrollHistory.push({ scrollY, time: now });
        if (scrollHistory.length > maxHistoryLength) {
            scrollHistory.shift();
        }
    }
    
    function calculateVelocity() {
        if (scrollHistory.length < 2) return 0;
        const latest = scrollHistory[scrollHistory.length - 1];
        const oldest = scrollHistory[0];
        const timeDiff = (latest.time - oldest.time) || 1;
        const scrollDiff = latest.scrollY - oldest.scrollY;
        return scrollDiff / timeDiff;
    }
    
    // Interpolated parallax update with smooth transitions
    function updateParallax() {
        const now = Date.now();
        const deltaTime = Math.min((now - lastScrollTime) / 1000, 0.033); // Cap at ~30fps minimum
        lastScrollTime = now;
        
        // Use actual scroll position directly for immediate response
        const easedScrollY = targetScrollY;
        
        // Hero section parallax layers
        const heroLayers = document.querySelectorAll('.hero-section .parallax-bg');
        heroLayers.forEach((layer, index) => {
            const speed = (index + 1) * 0.3;
            const parallaxY = easedScrollY * speed;
            
            // Direct transform without CSS transition for immediate response
            layer.style.transition = 'none';
            layer.style.transform = `translateY(${parallaxY}px)`;
            layer.style.willChange = 'transform';
        });

        // Final section parallax layers
        const finalLayers = document.querySelectorAll('.cta-section .parallax-bg');
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            const ctaTop = ctaSection.offsetTop;
            const ctaScroll = easedScrollY - ctaTop;
            finalLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.2;
                const parallaxY = ctaScroll * speed;
                layer.style.transition = 'none';
                layer.style.transform = `translateY(${parallaxY}px)`;
                layer.style.willChange = 'transform';
            });
        }

        // Background patterns parallax
        const bgPatterns = document.querySelectorAll('.parallax-bg-image');
        bgPatterns.forEach((pattern) => {
            const section = pattern.closest('section');
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionScroll = easedScrollY - sectionTop + window.innerHeight / 2;
                const parallaxY = sectionScroll * 0.15;
                pattern.style.transition = 'none';
                pattern.style.transform = `translateY(${parallaxY}px)`;
                pattern.style.willChange = 'transform';
            }
        });

        // Floating shapes parallax
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const section = shape.closest('section');
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionScroll = easedScrollY - sectionTop + window.innerHeight / 2;
                const speed = 0.1 + (index * 0.05);
                const rotation = sectionScroll * 0.05;
                const parallaxY = sectionScroll * speed;
                shape.style.transition = 'none';
                shape.style.transform = `translateY(${parallaxY}px) rotate(${rotation}deg)`;
                shape.style.willChange = 'transform';
            }
        });

        // Parallax image layers
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        parallaxLayers.forEach((layer) => {
            const section = layer.closest('.parallax-images-section');
            if (section) {
                const rect = section.getBoundingClientRect();
                const scrollPercent = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
                
                // Apply easing to scroll percent for smoother transitions
                const easedPercent = easing.easeOutCubic(scrollPercent);
                
                if (layer.classList.contains('deep')) {
                    const translateY = easedPercent * 150;
                    layer.style.transition = 'none';
                    layer.style.transform = `translateZ(-100px) scale(1.1) translateY(${translateY}px)`;
                } else if (layer.classList.contains('medium')) {
                    const translateY = easedPercent * 100;
                    layer.style.transition = 'none';
                    layer.style.transform = `translateZ(-50px) scale(1.05) translateY(${translateY}px)`;
                } else if (layer.classList.contains('close')) {
                    const translateY = easedPercent * 50;
                    layer.style.transition = 'none';
                    layer.style.transform = `translateZ(0px) translateY(${translateY}px)`;
                }
                layer.style.willChange = 'transform';
            }
        });

        // Logic objects parallax with smooth interpolation
        const logicObjects = document.querySelectorAll('.logic-objects-hero, .section-logic-objects');
        logicObjects.forEach((container) => {
            const section = container.closest('section');
            if (!section) return;
            
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionScroll = easedScrollY - sectionTop;
            const scrollPercent = Math.max(0, Math.min(1, sectionScroll / (sectionHeight * 0.8)));
            
            // Binary codes parallax
            const binaryCodes = container.querySelectorAll('.binary-code');
            binaryCodes.forEach((binary, index) => {
                const speed = 0.25 + (index * 0.08);
                const parallaxY = sectionScroll * speed;
                binary.style.transition = 'none';
                binary.style.transform = `translateY(${parallaxY}px)`;
                binary.style.willChange = 'transform';
            });
            
            // Logic gates parallax
            const logicGates = container.querySelectorAll('.logic-gate');
            logicGates.forEach((gate, index) => {
                const speed = 0.2 + (index * 0.06);
                const parallaxY = sectionScroll * speed;
                const rotation = sectionScroll * 0.015;
                gate.style.transition = 'none';
                gate.style.transform = `translateY(${parallaxY}px) rotate(${rotation}deg)`;
                gate.style.willChange = 'transform';
            });
            
            // Math symbols parallax
            const mathSymbols = container.querySelectorAll('.math-symbol');
            mathSymbols.forEach((symbol, index) => {
                const speed = 0.18 + (index * 0.05);
                const parallaxY = sectionScroll * speed;
                symbol.style.transition = 'none';
                symbol.style.transform = `translateY(${parallaxY}px)`;
                symbol.style.willChange = 'transform';
            });
            
            // Circuit elements parallax
            const circuitNodes = container.querySelectorAll('.circuit-node');
            circuitNodes.forEach((node, index) => {
                const speed = 0.22 + (index * 0.07);
                const parallaxY = sectionScroll * speed;
                node.style.transition = 'none';
                node.style.transform = `translateY(${parallaxY}px)`;
                node.style.willChange = 'transform';
            });
            
            const circuitLines = container.querySelectorAll('.circuit-line');
            circuitLines.forEach((line, index) => {
                const speed = 0.15 + (index * 0.05);
                const parallaxY = sectionScroll * speed;
                line.style.transition = 'none';
                line.style.transform = `translateY(${parallaxY}px)`;
                line.style.willChange = 'transform';
            });
        });

        // End animation loop
        ticking = false;
    }

    // Enhanced scroll handler with momentum tracking
    function onScroll() {
        const scrollY = window.scrollY;
        targetScrollY = scrollY;
        updateScrollHistory(scrollY);
        scrollVelocity = calculateVelocity();
        
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateParallax);
        }
    }

    // Smooth scroll start
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Show/hide back to top button on scroll
    window.addEventListener('scroll', handleBackToTopButton, { passive: true });
    // Check on initial load
    handleBackToTopButton();
    
    // Initial parallax update
    updateParallax();

    // ========================================
    // UNIVERSAL ANIMATION OBSERVER SYSTEM
    // Smooth In/Out Transitions for All Elements
    // ========================================
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class first to reset animation
                entry.target.classList.remove('active');
                // Use requestAnimationFrame to ensure the removal happens before adding
                requestAnimationFrame(() => {
                    entry.target.classList.add('active');
                });
            } else {
                // Remove active class when element leaves viewport (for reset)
                entry.target.classList.remove('active');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe ALL containers and elements
    const allAnimatableElements = document.querySelectorAll(
        // Sections and containers
        'section, .section-content, .container, .section-container, .section-3-container, .classification-container, .credits-container, .quiz-container-wrapper, ' +
        // Cards and components
        '.card, .credits-card, .quiz-question-card, .flip-card, .definition-card, .example-card, .concept-card, ' +
        '.compound-example-card, .intro-card, .classification-card, .feature-card, .team-member, ' +
        // Text elements
        'h1, h2, h3, h4, h5, h6, .section-title, .subsection-title, .subsection-subtitle, ' +
        '.cta-title, .cta-text, .credits-title, .quiz-main-title, .section-title-main, ' +
        // Buttons and inputs
        'button, .btn, .cta-button, .quiz-button, .submit-quiz-button, .source-link, .back-top-button, ' +
        'input, textarea, .name-input, select, ' +
        // Tables
        'table, .truth-table, tr, td, th, ' +
        // Lists
        'ul li, ol li, .examples-list li, .cta-summary li, .notes-list li, ' +
        // Media
        'img, svg, .logic-gate svg, .card-icon svg, ' +
        // Grid items
        '.grid-item, .features-grid .feature-card, .credits-grid .credits-card, ' +
        '.flip-cards-container .flip-card-wrapper, ' +
        // Other components
        '.operator-item, .progress-bar-container, .progress-bar-fill, .back-to-top, ' +
        '.results-card, .cta-content'
    );

    allAnimatableElements.forEach((element, index) => {
        // Add staggered delay for better visual effect
        setTimeout(() => {
            observer.observe(element);
        }, index * 10);
    });

    // Also observe existing animated elements
    const existingAnimatedElements = document.querySelectorAll(
        '.slide-in-left, .slide-in-right, .fade-in-up, .scale-in, .zoom-in, ' +
        '.rotate-in, .bounce-in, .grid-item, .section-heading, ' +
        '.large-title, .large-subtitle, .cta-title, .cta-text, .cta-button, ' +
        '.overlay-text, .split-left, .split-right, .feature-card, .section-header, ' +
        '.definition-card, .example-card, .concept-card, .compound-example-card, .intro-card, ' +
        '.classification-card, .classification-section, .classification-container, .classification-header, ' +
        '.examples-category, .classification-guide-box, .quiz-header, ' +
        '.name-input-section, .progress-section, .results-section'
    );
    
    // On mobile, immediately show classification section to ensure visibility
    if (isMobileDevice) {
        const classificationSection = document.querySelector('.classification-section');
        const classificationContainer = document.querySelector('.classification-container');
        if (classificationSection) {
            classificationSection.classList.add('active');
            // Force visibility
            setTimeout(() => {
                classificationSection.style.opacity = '1';
                classificationSection.style.transform = 'translateY(0)';
            }, 100);
        }
        if (classificationContainer) {
            classificationContainer.classList.add('active');
            setTimeout(() => {
                classificationContainer.style.opacity = '1';
                classificationContainer.style.transform = 'translateY(0)';
            }, 150);
        }
    }

    existingAnimatedElements.forEach(element => {
        observer.observe(element);
    });

    // ========================================
    // INTERACTIVE ANIMATIONS
    // Click, Hover, and Touch Effects
    // ========================================
    
    // Add ripple effect on click for all interactive elements
    function createRipple(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
        `;
        
        if (!element.style.position || element.style.position === 'static') {
            element.style.position = 'relative';
        }
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Add ripple to all clickable elements
    document.querySelectorAll('.card, .btn, button, .cta-button, .quiz-button, .source-link, .back-top-button, .team-member, .feature-card').forEach(element => {
        element.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    // Enhanced hover effects with tilt
    document.querySelectorAll('.card, .credits-card, .feature-card, .team-member, .flip-card-wrapper').forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `translateY(-5px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Smooth scroll reveal for paragraphs and spans
    document.querySelectorAll('p, span').forEach((element, index) => {
        observer.observe(element);
    });
    
    // Animate list items with staggered delay
    document.querySelectorAll('ul, ol, .examples-list, .cta-summary, .notes-list').forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    });
    
    // Animate table rows with staggered delay
    document.querySelectorAll('table, .truth-table').forEach(table => {
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.style.transitionDelay = `${index * 0.05}s`;
            observer.observe(row);
        });
    });
    
    // Add CSS for ripple animation if not exists
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize elements already in viewport on page load
    function initializeVisibleElements() {
        const elements = document.querySelectorAll(
            'section, .container, .card, h1, h2, h3, h4, h5, h6, p, button, .btn'
        );
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                // Small delay for smoother initial load
                setTimeout(() => {
                    element.classList.add('active');
                }, 100);
            }
        });
    }
    
    // Run on page load
    initializeVisibleElements();
    
    // Also run after a short delay to catch dynamically loaded content
    setTimeout(initializeVisibleElements, 500);

    // ========================================
    // ADMIN LOGIN & DASHBOARD SYSTEM
    // ========================================
    
    // Admin credentials mapping (username -> email)
    // You'll need to create these users in Firebase Console first
    const ADMIN_EMAILS = {
        'jhunmark_admin': 'jhunmark@admin.mmw',
        'angel_admin': 'angel@admin.mmw',
        'juliana_admin': 'juliana@admin.mmw'
    };
    const ADMIN_PASSWORD = 'bsit-s4a';
    
    // Show admin login modal
    window.showAdminLogin = function() {
        const modal = document.getElementById('adminLoginModal');
        modal.classList.add('show');
        document.getElementById('adminUsername').focus();
    };
    
    // Close admin login modal
    window.closeAdminLogin = function() {
        const modal = document.getElementById('adminLoginModal');
        modal.classList.remove('show');
        document.getElementById('adminUsername').value = '';
        document.getElementById('adminPassword').value = '';
        document.getElementById('adminError').style.display = 'none';
    };
    
    // Close modal when clicking outside
    document.getElementById('adminLoginModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeAdminLogin();
        }
    });
    
    // Allow Enter key to submit (with check)
    const adminPasswordInput = document.getElementById('adminPassword');
    if (adminPasswordInput) {
        adminPasswordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                adminLogin();
            }
        });
    }
    
    // Also allow Enter on username field
    const adminUsernameInput = document.getElementById('adminUsername');
    if (adminUsernameInput) {
        adminUsernameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('adminPassword').focus();
            }
        });
    }
    
    // Admin login function with Firebase Authentication
    window.adminLogin = async function() {
        const usernameOrEmail = document.getElementById('adminUsername').value.trim();
        const password = document.getElementById('adminPassword').value;
        const errorDiv = document.getElementById('adminError');
        
        if (!usernameOrEmail || !password) {
            errorDiv.textContent = 'Please enter both username/email and password';
            errorDiv.style.display = 'block';
            return;
        }
        
        // Check if Firebase Auth is available
        if (!window.firebaseAuth || !window.firebaseAuthMethods) {
            errorDiv.textContent = 'Firebase Authentication is not available. Please refresh the page.';
            errorDiv.style.display = 'block';
            return;
        }
        
        // Determine email - check if it's already an email or a username
        let email;
        let displayUsername;
        
        if (usernameOrEmail.includes('@')) {
            // User entered an email directly
            email = usernameOrEmail;
            // Find username from email for display
            displayUsername = Object.keys(ADMIN_EMAILS).find(
                key => ADMIN_EMAILS[key] === email
            ) || email.split('@')[0];
        } else {
            // User entered a username, map to email
            email = ADMIN_EMAILS[usernameOrEmail];
            displayUsername = usernameOrEmail;
            
            if (!email) {
                errorDiv.textContent = 'Invalid username. Use: jhunmark_admin, angel_admin, juliana_admin, or enter your email directly (e.g., jhunmark@admin.mmw)';
                errorDiv.style.display = 'block';
                return;
            }
        }
        
        try {
            // Show loading state
            errorDiv.style.display = 'none';
            const submitBtn = document.querySelector('.admin-submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;
            
            // Sign in with Firebase Auth using email and password
            const { signInWithEmailAndPassword } = window.firebaseAuthMethods;
            const userCredential = await signInWithEmailAndPassword(window.firebaseAuth, email, password);
            
            // Verify the user was authenticated
            if (!userCredential || !userCredential.user) {
                throw new Error('Authentication failed - no user returned');
            }
            
            // Verify this is an admin email
            const userEmail = userCredential.user.email;
            const isAdminEmail = Object.values(ADMIN_EMAILS).includes(userEmail);
            
            if (!isAdminEmail && !userEmail?.endsWith('@admin.mmw')) {
                // Sign out if not an admin
                await window.firebaseAuthMethods.signOut(window.firebaseAuth);
                throw new Error('This account is not authorized as an admin');
            }
            
            // Successful login
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', displayUsername);
            localStorage.setItem('adminEmail', userEmail);
            closeAdminLogin();
            showAdminDashboard();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'Login failed. Please try again.';
            
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'User not found. Please verify the email exists in Firebase Console: ' + email;
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Invalid password. Please check your password.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email format: ' + email;
            } else if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid credentials. Please check your email and password.';
            } else if (error.code === 'auth/network-request-failed') {
                errorMessage = 'Network error. Please check your connection.';
            } else if (error.message && error.message.includes('not authorized')) {
                errorMessage = error.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            errorDiv.textContent = errorMessage;
            errorDiv.style.display = 'block';
            
            // Reset button
            const submitBtn = document.querySelector('.admin-submit-btn');
            submitBtn.textContent = 'Login';
            submitBtn.disabled = false;
        }
    };
    
    // Show admin dashboard
    function showAdminDashboard() {
        document.body.style.overflow = 'hidden';
        const dashboard = document.getElementById('adminDashboard');
        dashboard.style.display = 'block';
        // Hide fullscreen button when dashboard is open
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
            fullscreenBtn.style.display = 'none';
        }
        loadStudentData();
    }
    
    // Load student data from Firebase Firestore (with localStorage fallback)
    async function loadStudentData() {
        const cardsGrid = document.getElementById('studentsCardsGrid');
        const totalStudentsEl = document.getElementById('totalStudents');
        const averageScoreEl = document.getElementById('averageScore');
        const highestScoreEl = document.getElementById('highestScore');
        
        let students = [];
        
        // Try to load from Firebase first
        if (window.firebaseDB && window.firebaseFirestore) {
            try {
                const { collection, getDocs, query, orderBy } = window.firebaseFirestore;
                const q = query(collection(window.firebaseDB, 'quizResults'), orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                
                students = querySnapshot.docs.map(docSnapshot => {
                    const data = docSnapshot.data();
                    // Convert Firestore Timestamp to ISO string
                    const date = data.date?.toDate ? data.date.toDate().toISOString() : new Date(data.timestamp).toISOString();
                    return {
                        id: docSnapshot.id, // Store Firebase document ID for deletion
                        name: data.name,
                        score: data.score,
                        total: data.total,
                        percentage: data.percentage,
                        grade: data.grade,
                        date: date,
                        timestamp: data.timestamp || Date.parse(date)
                    };
                });
                console.log('Loaded ' + students.length + ' students from Firebase');
            } catch (error) {
                console.error('Error loading from Firebase:', error);
                // Fallback to localStorage
                students = JSON.parse(localStorage.getItem('quizStudents') || '[]');
            }
        } else {
            // Fallback to localStorage if Firebase is not available
            students = JSON.parse(localStorage.getItem('quizStudents') || '[]');
        }
        
        if (students.length === 0) {
            if (cardsGrid) {
                cardsGrid.innerHTML = '<div class="admin-no-data">No student records found</div>';
            }
            if (totalStudentsEl) totalStudentsEl.textContent = '0';
            if (averageScoreEl) {
                averageScoreEl.innerHTML = `
                    <span class="admin-stat-percentage">0%</span>
                    <span class="admin-stat-fraction">0/10</span>
                `;
            }
            if (highestScoreEl) {
                highestScoreEl.innerHTML = `
                    <span class="admin-stat-percentage">0%</span>
                    <span class="admin-stat-fraction">0/10</span>
                `;
            }
            return;
        }
        
        // Sort by timestamp (newest first) - already sorted if from Firebase
        students.sort((a, b) => b.timestamp - a.timestamp);
        
        // Calculate statistics
        const total = students.length;
        const sum = students.reduce((acc, student) => acc + parseFloat(student.percentage), 0);
        const average = (sum / total).toFixed(1);
        const highest = Math.max(...students.map(s => parseFloat(s.percentage))).toFixed(1);
        
        // Calculate actual scores (fractions)
        const totalQuestions = students.length > 0 ? parseInt(students[0].total) : 10; // Default to 10
        
        // Average actual score
        const averageScoreSum = students.reduce((acc, student) => acc + parseInt(student.score), 0);
        const averageActualScore = Math.round(averageScoreSum / total);
        
        // Highest actual score
        const highestStudent = students.reduce((max, student) => {
            const maxPercentage = parseFloat(max.percentage);
            const currentPercentage = parseFloat(student.percentage);
            return currentPercentage > maxPercentage ? student : max;
        }, students[0]);
        const highestActualScore = highestStudent ? parseInt(highestStudent.score) : 0;
        const highestTotal = highestStudent ? parseInt(highestStudent.total) : totalQuestions;
        
        // Update display
        if (totalStudentsEl) totalStudentsEl.textContent = total;
        if (averageScoreEl) {
            averageScoreEl.innerHTML = `
                <span class="admin-stat-percentage">${average}%</span>
                <span class="admin-stat-fraction">${averageActualScore}/${totalQuestions}</span>
            `;
        }
        if (highestScoreEl) {
            highestScoreEl.innerHTML = `
                <span class="admin-stat-percentage">${highest}%</span>
                <span class="admin-stat-fraction">${highestActualScore}/${highestTotal}</span>
            `;
        }
        
        // Populate cards
        if (cardsGrid) {
            students.forEach((student, index) => {
                // Format date and time
                const dateObj = new Date(student.date);
                const date = dateObj.toLocaleDateString();
                const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const dateTime = `${date} ${time}`;
                const gradeClass = 'admin-grade-' + student.grade;
                
                const card = document.createElement('div');
                card.className = 'admin-student-card';
                card.setAttribute('data-timestamp', student.timestamp);
                if (student.id) {
                    card.setAttribute('data-doc-id', student.id); // Store Firebase document ID
                }
                
                // Get grade color
                let gradeColor = '#666';
                if (student.grade === 'A') gradeColor = '#27ae60';
                else if (student.grade === 'B') gradeColor = '#3498db';
                else if (student.grade === 'C') gradeColor = '#f39c12';
                else if (student.grade === 'D') gradeColor = '#e67e22';
                else gradeColor = '#e74c3c';
                
                // Create delete button with both timestamp and doc ID
                const deleteFunction = student.id 
                    ? `deleteStudentRecord(${student.timestamp}, '${student.id}')` 
                    : `deleteStudentRecord(${student.timestamp})`;
                
                card.innerHTML = `
                    <div class="admin-card-header">
                        <div class="admin-card-number">#${index + 1}</div>
                        <button class="admin-delete-btn" onclick="${deleteFunction}" title="Delete Record">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e74c3c" width="20" height="20">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="admin-card-body">
                        <div class="admin-card-name">${student.name}</div>
                        <div class="admin-card-stats">
                            <div class="admin-card-stat">
                                <span class="admin-card-label">Score:</span>
                                <span class="admin-card-value">${student.score} / ${student.total}</span>
                            </div>
                            <div class="admin-card-stat">
                                <span class="admin-card-label">Percentage:</span>
                                <span class="admin-card-value">${student.percentage}%</span>
                            </div>
                        </div>
                        <div class="admin-card-footer">
                            <div class="admin-card-grade ${gradeClass}" style="color: ${gradeColor}; border-color: ${gradeColor};">Grade: ${student.grade}</div>
                            <div class="admin-card-date">${dateTime}</div>
                        </div>
                    </div>
                `;
                
                cardsGrid.appendChild(card);
            });
        }
    }
    
    // Delete student record from Firebase (with localStorage fallback)
    window.deleteStudentRecord = async function(timestamp, docId = null) {
        if (!confirm('Are you sure you want to delete this student record?')) {
            return;
        }
        
        // Try to delete from Firebase first if document ID is provided
        if (window.firebaseDB && window.firebaseFirestore && docId) {
            try {
                const { doc, deleteDoc } = window.firebaseFirestore;
                await deleteDoc(doc(window.firebaseDB, 'quizResults', docId));
                console.log('Student record deleted from Firebase');
            } catch (error) {
                console.error('Error deleting from Firebase:', error);
                // Continue to delete from localStorage as fallback
            }
        }
        
        // Delete from localStorage as fallback or if Firebase deletion failed
        let students = JSON.parse(localStorage.getItem('quizStudents') || '[]');
        students = students.filter(student => student.timestamp !== timestamp);
        localStorage.setItem('quizStudents', JSON.stringify(students));
        
        // Reload the cards
        loadStudentData();
    }
    
    // Admin logout
    window.adminLogout = async function() {
        // Sign out from Firebase
        if (window.firebaseAuth && window.firebaseAuthMethods) {
            try {
                await window.firebaseAuthMethods.signOut(window.firebaseAuth);
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
        
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminEmail');
        document.getElementById('adminDashboard').style.display = 'none';
        document.body.style.overflow = '';
        // Show fullscreen button again after logout
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
            fullscreenBtn.style.display = 'flex';
        }
    };
    
    // Check if admin is already logged in (with Firebase Auth check)
    // Wait for Firebase to be ready
    if (window.firebaseAuth && window.firebaseAuthMethods) {
        window.firebaseAuthMethods.onAuthStateChanged(window.firebaseAuth, (user) => {
            if (user) {
                const adminEmail = localStorage.getItem('adminEmail');
                // Verify the authenticated user matches stored admin email
                if (adminEmail && user.email === adminEmail) {
                    // User is authenticated and matches stored admin session
                    if (localStorage.getItem('adminLoggedIn') === 'true') {
                        showAdminDashboard();
                    }
                } else {
                    // User is authenticated but doesn't match admin session, clear it
                    localStorage.removeItem('adminLoggedIn');
                    localStorage.removeItem('adminUsername');
                    localStorage.removeItem('adminEmail');
                }
            } else {
                // No user authenticated, clear admin session
                if (localStorage.getItem('adminLoggedIn') === 'true') {
                    localStorage.removeItem('adminLoggedIn');
                    localStorage.removeItem('adminUsername');
                    localStorage.removeItem('adminEmail');
                }
            }
        });
    } else {
        // Firebase Auth not ready yet, wait for it
        setTimeout(() => {
            if (window.firebaseAuth && window.firebaseAuthMethods) {
                window.firebaseAuthMethods.onAuthStateChanged(window.firebaseAuth, (user) => {
                    if (user) {
                        const adminEmail = localStorage.getItem('adminEmail');
                        if (adminEmail && user.email === adminEmail && localStorage.getItem('adminLoggedIn') === 'true') {
                            showAdminDashboard();
                        }
                    }
                });
            }
        }, 1000);
    }
    
    // Helper function to extract last name from full name
    function getLastName(fullName) {
        if (!fullName || typeof fullName !== 'string') return '';
        const nameParts = fullName.trim().split(/\s+/);
        // Last name is the last word in the name
        return nameParts.length > 0 ? nameParts[nameParts.length - 1] : fullName;
    }
    
    // Export to PDF
    window.exportToPDF = async function() {
        let students = [];
        
        // Try to load from Firebase first
        if (window.firebaseDB && window.firebaseFirestore) {
            try {
                const { collection, getDocs, query, orderBy } = window.firebaseFirestore;
                const q = query(collection(window.firebaseDB, 'quizResults'), orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                
                students = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const date = data.date?.toDate ? data.date.toDate().toISOString() : new Date(data.timestamp).toISOString();
                    return {
                        name: data.name,
                        score: data.score,
                        total: data.total,
                        percentage: data.percentage,
                        grade: data.grade,
                        date: date,
                        timestamp: data.timestamp || Date.parse(date)
                    };
                });
            } catch (error) {
                console.error('Error loading from Firebase for PDF:', error);
                students = JSON.parse(localStorage.getItem('quizStudents') || '[]');
            }
        } else {
            students = JSON.parse(localStorage.getItem('quizStudents') || '[]');
        }
        
        if (students.length === 0) {
            alert('No student data to export');
            return;
        }
        
        // Sort by last name alphabetically (case-insensitive)
        students.sort((a, b) => {
            const lastNameA = getLastName(a.name).toLowerCase();
            const lastNameB = getLastName(b.name).toLowerCase();
            if (lastNameA < lastNameB) return -1;
            if (lastNameA > lastNameB) return 1;
            // If last names are the same, sort by first name
            const firstNameA = a.name.trim().split(/\s+/)[0]?.toLowerCase() || '';
            const firstNameB = b.name.trim().split(/\s+/)[0]?.toLowerCase() || '';
            return firstNameA.localeCompare(firstNameB);
        });
        
        // Use jsPDF library if available, otherwise use print
        if (typeof window.jsPDF !== 'undefined') {
            const { jsPDF } = window.jsPDF;
            const doc = new jsPDF();
            
            // Set dark background color (convert hex to RGB for jsPDF)
            // #0a0a0a = rgb(10, 10, 10)
            doc.setFillColor(10, 10, 10);
            doc.rect(0, 0, 210, 297, 'F'); // Fill entire page
            
            // Title - White text
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(24);
            doc.setFont(undefined, 'bold');
            doc.text('Student Quiz Results', 105, 25, { align: 'center' });
            
            // Subtitle with decorative line
            doc.setDrawColor(255, 255, 255);
            doc.setLineWidth(0.5);
            doc.line(50, 32, 160, 32);
            
            // Date - Light gray
            doc.setTextColor(178, 178, 178); // rgba(255,255,255,0.7) equivalent
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text('Generated: ' + new Date().toLocaleDateString(), 105, 38, { align: 'center' });
            
            // Table header background - Dark gray (#1a1a1a = rgb(26, 26, 26))
            let y = 50;
            doc.setFillColor(26, 26, 26);
            doc.rect(10, y - 6, 190, 8, 'F');
            
            // Header text - White
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.text('#', 15, y);
            doc.text('Name', 30, y);
            doc.text('Score', 115, y);
            doc.text('%', 145, y);
            doc.text('Grade', 160, y);
            doc.text('Date', 180, y);
            
            y += 12;
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            
            students.forEach((student, index) => {
                if (y > 280) {
                    doc.addPage();
                    // Fill new page with dark background
                    doc.setFillColor(10, 10, 10);
                    doc.rect(0, 0, 210, 297, 'F');
                    y = 20;
                }
                
                // Alternate row backgrounds (subtle dark gray vs very dark)
                const rowBg = index % 2 === 0 ? [15, 15, 15] : [10, 10, 10]; // #0f0f0f and #0a0a0a
                doc.setFillColor(rowBg[0], rowBg[1], rowBg[2]);
                doc.rect(10, y - 5, 190, 7, 'F');
                
                // Row border - subtle white
                doc.setDrawColor(255, 255, 255);
                doc.setLineWidth(0.1);
                doc.line(10, y - 5, 200, y - 5);
                
                // Text color - white for alternating rows, slightly gray for others
                doc.setTextColor(index % 2 === 0 ? 255 : 229); // White and rgba(255,255,255,0.9)
                
                doc.text((index + 1).toString(), 15, y);
                doc.text(student.name.length > 30 ? student.name.substring(0, 27) + '...' : student.name, 30, y);
                doc.text(student.score + '/' + student.total, 115, y);
                doc.text(student.percentage + '%', 145, y);
                doc.text(student.grade, 160, y);
                doc.text(new Date(student.date).toLocaleDateString(), 180, y);
                y += 9;
            });
            
            doc.save('student-quiz-results.pdf');
        } else {
            // Fallback: Print or download as HTML with dark theme
            const printWindow = window.open('', '_blank');
            
            // Create table from student data for print
            let tableHTML = `
                <table style="width: 100%; border-collapse: collapse; margin-top: 30px; background: #0a0a0a;">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); border: 2px solid rgba(255, 255, 255, 0.15);">
                            <th style="border: 1px solid rgba(255, 255, 255, 0.2); padding: 12px; text-align: left; color: #ffffff; font-weight: 600;">#</th>
                            <th style="border: 1px solid rgba(255, 255, 255, 0.2); padding: 12px; text-align: left; color: #ffffff; font-weight: 600;">Full Name</th>
                            <th style="border: 1px solid rgba(255, 255, 255, 0.2); padding: 12px; text-align: left; color: #ffffff; font-weight: 600;">Score</th>
                            <th style="border: 1px solid rgba(255, 255, 255, 0.2); padding: 12px; text-align: left; color: #ffffff; font-weight: 600;">Percentage</th>
                            <th style="border: 1px solid rgba(255, 255, 255, 0.2); padding: 12px; text-align: left; color: #ffffff; font-weight: 600;">Grade</th>
                            <th style="border: 1px solid rgba(255, 255, 255, 0.2); padding: 12px; text-align: left; color: #ffffff; font-weight: 600;">Date</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            students.forEach((student, index) => {
                const date = new Date(student.date).toLocaleDateString();
                const rowBg = index % 2 === 0 ? 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)' : '#0a0a0a';
                tableHTML += `
                    <tr style="background: ${rowBg}; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                        <td style="border: 1px solid rgba(255, 255, 255, 0.15); padding: 10px; color: #ffffff;">${index + 1}</td>
                        <td style="border: 1px solid rgba(255, 255, 255, 0.15); padding: 10px; color: #ffffff;">${student.name}</td>
                        <td style="border: 1px solid rgba(255, 255, 255, 0.15); padding: 10px; color: #ffffff;">${student.score} / ${student.total}</td>
                        <td style="border: 1px solid rgba(255, 255, 255, 0.15); padding: 10px; color: #ffffff;">${student.percentage}%</td>
                        <td style="border: 1px solid rgba(255, 255, 255, 0.15); padding: 10px; color: #ffffff;">${student.grade}</td>
                        <td style="border: 1px solid rgba(255, 255, 255, 0.15); padding: 10px; color: #ffffff;">${date}</td>
                    </tr>
                `;
            });
            
            tableHTML += '</tbody></table>';
            
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Student Quiz Results</title>
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            body { 
                                font-family: 'Space Grotesk', sans-serif; 
                                padding: 40px; 
                                background: #0a0a0a; 
                                color: #ffffff;
                                line-height: 1.6;
                            }
                            h1 {
                                font-size: 32px;
                                color: #ffffff;
                                margin-bottom: 10px;
                                font-weight: 600;
                                text-align: center;
                            }
                            .subtitle {
                                text-align: center;
                                color: rgba(255, 255, 255, 0.7);
                                margin-bottom: 30px;
                                font-size: 14px;
                            }
                            .decorative-line {
                                width: 200px;
                                height: 2px;
                                background: rgba(255, 255, 255, 0.3);
                                margin: 15px auto 25px;
                            }
                            table {
                                box-shadow: 0 10px 40px rgba(255, 255, 255, 0.05);
                            }
                            @media print {
                                body {
                                    background: #0a0a0a;
                                    color: #ffffff;
                                }
                                table {
                                    page-break-inside: auto;
                                }
                                tr {
                                    page-break-inside: avoid;
                                    page-break-after: auto;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Student Quiz Results</h1>
                        <div class="decorative-line"></div>
                        <p class="subtitle">Generated: ${new Date().toLocaleDateString()}</p>
                        ${tableHTML}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };
    
    // Export to CSV
    window.exportToCSV = async function() {
        let students = [];
        
        // Try to load from Firebase first
        if (window.firebaseDB && window.firebaseFirestore) {
            try {
                const { collection, getDocs, query, orderBy } = window.firebaseFirestore;
                const q = query(collection(window.firebaseDB, 'quizResults'), orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                
                students = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const date = data.date?.toDate ? data.date.toDate().toISOString() : new Date(data.timestamp).toISOString();
                    return {
                        name: data.name,
                        score: data.score,
                        total: data.total,
                        percentage: data.percentage,
                        grade: data.grade,
                        date: date,
                        timestamp: data.timestamp || Date.parse(date)
                    };
                });
            } catch (error) {
                console.error('Error loading from Firebase for CSV:', error);
                students = JSON.parse(localStorage.getItem('quizStudents') || '[]');
            }
        } else {
            students = JSON.parse(localStorage.getItem('quizStudents') || '[]');
        }
        
        if (students.length === 0) {
            alert('No student data to export');
            return;
        }
        
        // Sort by last name alphabetically (case-insensitive)
        students.sort((a, b) => {
            const lastNameA = getLastName(a.name).toLowerCase();
            const lastNameB = getLastName(b.name).toLowerCase();
            if (lastNameA < lastNameB) return -1;
            if (lastNameA > lastNameB) return 1;
            // If last names are the same, sort by first name
            const firstNameA = a.name.trim().split(/\s+/)[0]?.toLowerCase() || '';
            const firstNameB = b.name.trim().split(/\s+/)[0]?.toLowerCase() || '';
            return firstNameA.localeCompare(firstNameB);
        });
        
        // CSV Headers
        let csv = 'Number,Full Name,Score,Total Questions,Percentage,Grade,Date\n';
        
        // CSV Data
        students.forEach((student, index) => {
            const date = new Date(student.date).toLocaleDateString();
            csv += `${index + 1},"${student.name}",${student.score},${student.total},${student.percentage},${student.grade},"${date}"\n`;
        });
        
        // Create download link
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'student-quiz-results.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Staggered animation for example cards
    const exampleCards = document.querySelectorAll('.example-card');
    const exampleCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Reset first to retrigger animation
                entry.target.classList.remove('active');
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 150);
                });
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.2 });

    exampleCards.forEach(card => {
        exampleCardObserver.observe(card);
    });

    // Staggered animation for Section 1 example items
    const exampleItems = document.querySelectorAll('.example-item');
    const exampleItemObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Reset first to retrigger animation
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            } else {
                // Reset when out of view
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-20px)';
            }
        });
    }, { threshold: 0.2 });

    exampleItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        exampleItemObserver.observe(item);
    });

    // Staggered animation for concept cards
    const conceptCards = document.querySelectorAll('.concept-card');
    const conceptCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Reset first to retrigger animation
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px) scale(0.95)';
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            } else {
                // Reset when out of view
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px) scale(0.95)';
            }
        });
    }, { threshold: 0.2 });

    conceptCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        conceptCardObserver.observe(card);
    });

    // Staggered animation for compound example cards
    const compoundExampleCards = document.querySelectorAll('.compound-example-card');
    const compoundCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Reset first to retrigger animation
                entry.target.classList.remove('active');
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 200);
                });
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.2 });

    compoundExampleCards.forEach(card => {
        compoundCardObserver.observe(card);
    });

    // Staggered animation for classification cards
    const classificationCards = document.querySelectorAll('.classification-card');
    const classificationCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Reset first to retrigger animation
                entry.target.classList.remove('active');
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 200);
                });
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.2 });

    classificationCards.forEach(card => {
        classificationCardObserver.observe(card);
    });

    // Credits cards observer with staggered animation
    const creditsCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Reset first to retrigger animation
                entry.target.classList.remove('active');
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 200);
                });
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.credits-card').forEach(card => {
        creditsCardObserver.observe(card);
    });

    // ========================================
    // QUIZ FUNCTIONALITY
    // ========================================
    
    // All available quiz questions (20 total)
    const allQuizQuestions = [
        { q: "What is a proposition?", options: ["A question", "A statement that is either true or false", "A mathematical equation", "A computer program"], correct: 1 },
        { q: "Which operator means 'AND'?", options: ["→", "∨", "∧", "~"], correct: 2 },
        { q: "Which operator means 'OR'?", options: ["→", "∨", "∧", "~"], correct: 1 },
        { q: "What does ∧ mean?", options: ["AND", "OR", "NOT", "IF-THEN"], correct: 0 },
        { q: "What does ∨ mean?", options: ["AND", "OR", "NOT", "IF-THEN"], correct: 1 },
        { q: "What does ~ mean?", options: ["AND", "OR", "NOT", "IF-THEN"], correct: 2 },
        { q: "What does → mean?", options: ["AND", "OR", "NOT", "IF-THEN"], correct: 3 },
        { q: "In p ∧ q, when is the result TRUE?", options: ["When p is true", "When q is true", "When BOTH are true", "When at least one is true"], correct: 2 },
        { q: "In p ∨ q, when is the result TRUE?", options: ["Only when both are true", "Only when one is true", "When AT LEAST ONE is true", "Never"], correct: 2 },
        { q: "A truth table for 2 variables has how many rows?", options: ["2", "3", "4", "5"], correct: 2 },
        { q: "What is a tautology?", options: ["Always false", "Always true", "Sometimes true", "Cannot determine"], correct: 1 },
        { q: "What is a contradiction?", options: ["Always false", "Always true", "Sometimes false", "Cannot determine"], correct: 0 },
        { q: "In computers, what does 0 represent?", options: ["True", "False", "Neither", "Both"], correct: 1 },
        { q: "In computers, what does 1 represent?", options: ["True", "False", "Neither", "Both"], correct: 0 },
        { q: "What is ~T (not True)?", options: ["True", "False", "Cannot tell", "Invalid"], correct: 1 },
        { q: "If p is true, what is ~p?", options: ["True", "False", "Depends", "Cannot tell"], correct: 1 },
        { q: "p ∧ q means:", options: ["p AND q", "p OR q", "NOT p", "p IF q"], correct: 0 },
        { q: "p ∨ q means:", options: ["p AND q", "p OR q", "NOT p", "p IF q"], correct: 1 },
        { q: "~p means:", options: ["p AND q", "p OR q", "NOT p", "p IF q"], correct: 2 },
        { q: "p → q means:", options: ["p AND q", "p OR q", "NOT p", "IF p THEN q"], correct: 3 }
    ];
    
    // Function to shuffle an array (Fisher-Yates shuffle algorithm)
    function shuffleArray(array) {
        const shuffled = [...array]; // Create a copy to avoid mutating the original
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    // Function to randomly select 10 questions from all questions
    function getRandomQuestions(count = 10) {
        const shuffled = shuffleArray(allQuizQuestions);
        return shuffled.slice(0, count);
    }
    
    let quizState = {
        studentName: '',
        currentQuestion: 0,
        score: 0,
        selectedAnswers: [],
        questions: [] // Will be populated with 10 random questions when quiz starts
    };

    // Global functions for quiz
    window.startQuiz = function() {
        const name = document.getElementById('studentName').value.trim();
        const errorDiv = document.getElementById('quizNameError');
        
        // Clear any previous error
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
        
        if (!name) {
            errorDiv.textContent = 'Please enter your last name to continue!';
            errorDiv.style.display = 'block';
            return;
        }
        
        quizState.studentName = name;
        quizState.currentQuestion = 0;
        quizState.score = 0;
        quizState.selectedAnswers = [];
        
        // Randomly select and shuffle 10 questions from all available questions
        quizState.questions = getRandomQuestions(10);
        
        // Hide error if validation passes
        errorDiv.style.display = 'none';
        
        document.getElementById('nameInputSection').style.display = 'none';
        document.getElementById('progressSection').style.display = 'block';
        document.getElementById('quizContainer').style.display = 'block';
        
        updateQuiz();
    };

    function updateQuiz() {
        if (quizState.currentQuestion >= quizState.questions.length) {
            showResults();
            return;
        }
        
        const q = quizState.questions[quizState.currentQuestion];
        const progress = ((quizState.currentQuestion) / quizState.questions.length) * 100;
        const minProgress = 5;
        const displayProgress = progress > 0 ? progress : minProgress;
        
        const progressBar = document.getElementById('progressBar');
        const progressPercentage = progressBar.querySelector('.progress-percentage');
        
        progressBar.style.width = displayProgress + '%';
        if (displayProgress >= 30) {
            progressPercentage.textContent = Math.round(displayProgress) + '%';
        } else {
            progressPercentage.textContent = '';
        }
        document.getElementById('progressText').textContent = quizState.currentQuestion + '/' + quizState.questions.length;
        
        // Fade out current question if exists
        const currentCard = document.getElementById('quizContainer').querySelector('.quiz-question-card');
        if (currentCard) {
            currentCard.classList.add('fade-out');
            setTimeout(() => {
                // Display question with our styled classes
                let html = '<div class="quiz-question-card question-fade-in"><div class="question-number">Question ' + (quizState.currentQuestion + 1) + ' of ' + quizState.questions.length + '</div>';
                html += '<div class="question-text">' + q.q + '</div>';
                html += '<div class="quiz-options">';
                
                q.options.forEach((opt, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    html += '<div class="quiz-option option-enter" onclick="selectAnswer(' + idx + ')">' + letter + ') ' + opt + '</div>';
                });
                
                html += '</div></div>';
                document.getElementById('quizContainer').innerHTML = html;
                
                // Stagger option animations
                const options = document.querySelectorAll('.quiz-option');
                options.forEach((opt, idx) => {
                    setTimeout(() => {
                        opt.classList.add('option-visible');
                    }, idx * 50);
                });
            }, 300);
        } else {
            // First question - just fade in
            let html = '<div class="quiz-question-card question-fade-in"><div class="question-number">Question ' + (quizState.currentQuestion + 1) + ' of ' + quizState.questions.length + '</div>';
            html += '<div class="question-text">' + q.q + '</div>';
            html += '<div class="quiz-options">';
            
            q.options.forEach((opt, idx) => {
                const letter = String.fromCharCode(65 + idx);
                html += '<div class="quiz-option option-enter" onclick="selectAnswer(' + idx + ')">' + letter + ') ' + opt + '</div>';
            });
            
            html += '</div></div>';
            document.getElementById('quizContainer').innerHTML = html;
            
            // Stagger option animations
            const options = document.querySelectorAll('.quiz-option');
            options.forEach((opt, idx) => {
                setTimeout(() => {
                    opt.classList.add('option-visible');
                }, idx * 50);
            });
        }
    }

    window.selectAnswer = function(selectedIdx) {
        const q = quizState.questions[quizState.currentQuestion];
        const isCorrect = selectedIdx === q.correct;
        
        quizState.selectedAnswers.push({ selectedIdx, isCorrect });
        if (isCorrect) {
            quizState.score++;
        }
        
        // Disable all options
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((opt) => {
            opt.onclick = null;
            opt.style.cursor = 'default';
            opt.style.pointerEvents = 'none';
        });
        
        // Animate selected option first
        const selectedOption = options[selectedIdx];
        selectedOption.classList.add('option-selected');
        
        // Then show correct/incorrect feedback
        setTimeout(() => {
            options.forEach((opt, idx) => {
                if (idx === q.correct) {
                    opt.classList.add('correct');
                    opt.classList.add('answer-pulse');
                } else if (idx === selectedIdx && !isCorrect) {
                    opt.classList.add('incorrect');
                }
            });
        }, 200);
        
        // Auto-advance after delay
        setTimeout(() => {
            quizState.currentQuestion++;
            updateQuiz();
        }, 1000);
    };

    function showResults() {
        const progressBar = document.getElementById('progressBar');
        const progressPercentage = progressBar.querySelector('.progress-percentage');
        progressBar.style.width = '100%';
        progressPercentage.textContent = '100%';
        document.getElementById('progressText').textContent = quizState.questions.length + '/' + quizState.questions.length;
        
        document.getElementById('quizContainer').style.display = 'none';
        document.getElementById('progressSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'block';
        
        const percentage = (quizState.score / quizState.questions.length) * 100;
        const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F';
        
        let scoreClass = 'score-high';
        if (percentage < 70) scoreClass = 'score-low';
        else if (percentage < 90) scoreClass = 'score-medium';
        
        // Get grade color
        let gradeColor = '#666';
        if (grade === 'A') gradeColor = '#27ae60';
        else if (grade === 'B') gradeColor = '#3498db';
        else if (grade === 'C') gradeColor = '#f39c12';
        else if (grade === 'D') gradeColor = '#e67e22';
        else gradeColor = '#e74c3c';
        
        document.getElementById('resultsContent').innerHTML = 
            '<h3 style="color: #fff; margin-bottom: 30px; font-family: \'Bebas Neue\', sans-serif; font-size: clamp(1.5rem, 3vw, 2rem); text-align: center;">Student: ' + quizState.studentName + '</h3>' +
            '<div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem; margin-bottom: 2rem;">' +
            '   <div class="score-display ' + scoreClass + '">' + percentage.toFixed(1) + '%</div>' +
            '   <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; width: 100%;">' +
            '       <div style="text-align: center; background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 12px; border: 2px solid rgba(255, 255, 255, 0.1); min-width: 150px;">' +
            '           <div style="color: #aaa; font-size: clamp(0.9rem, 1.4vw, 1rem); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em;">Score</div>' +
            '           <div style="color: #fff; font-family: \'Bebas Neue\', sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: bold;">' + quizState.score + ' / ' + quizState.questions.length + '</div>' +
            '       </div>' +
            '       <div style="text-align: center; background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 12px; border: 2px solid rgba(255, 255, 255, 0.1); min-width: 150px;">' +
            '           <div style="color: #aaa; font-size: clamp(0.9rem, 1.4vw, 1rem); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em;">Percentage</div>' +
            '           <div style="color: #fff; font-family: \'Bebas Neue\', sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: bold;">' + percentage.toFixed(1) + '%</div>' +
            '       </div>' +
            '       <div style="text-align: center; background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 12px; border: 2px solid ' + gradeColor + '; min-width: 150px;">' +
            '           <div style="color: #aaa; font-size: clamp(0.9rem, 1.4vw, 1rem); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em;">Grade</div>' +
            '           <div style="color: ' + gradeColor + '; font-family: \'Bebas Neue\', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: bold;">' + grade + '</div>' +
            '       </div>' +
            '   </div>' +
            '</div>' +
            '<p style="color: #888; font-size: clamp(0.9rem, 1.4vw, 1rem); text-align: center; margin-top: 1rem;">Completed on: ' + new Date().toLocaleDateString() + ' at ' + new Date().toLocaleTimeString() + '</p>';
        
        // Save student result to Firebase (with localStorage fallback)
        saveStudentResult(quizState.studentName, quizState.score, quizState.questions.length, percentage, grade);
        
        // Refresh admin dashboard if it's open
        if (localStorage.getItem('adminLoggedIn') === 'true') {
            loadStudentData();
        }
    }
    
    // Save student quiz results to Firebase Firestore (with localStorage fallback)
    async function saveStudentResult(name, score, total, percentage, grade) {
        const result = {
            name: name,
            score: score,
            total: total,
            percentage: percentage.toFixed(1),
            grade: grade,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };
        
        // Try to save to Firebase first
        if (window.firebaseDB && window.firebaseFirestore && window.firebaseAuth) {
            try {
                // Sign in anonymously if not already signed in (for students submitting quizzes)
                let currentUser = window.firebaseCurrentUser || window.firebaseAuth.currentUser;
                if (!currentUser) {
                    try {
                        await window.firebaseAuthMethods.signInAnonymously(window.firebaseAuth);
                        currentUser = window.firebaseAuth.currentUser;
                    } catch (authError) {
                        console.error('Error signing in anonymously:', authError);
                        // Continue anyway, Firestore rules will handle auth requirement
                    }
                }
                
                const { collection, addDoc, Timestamp } = window.firebaseFirestore;
                await addDoc(collection(window.firebaseDB, 'quizResults'), {
                    name: result.name,
                    score: result.score,
                    total: result.total,
                    percentage: result.percentage,
                    grade: result.grade,
                    date: Timestamp.fromDate(new Date(result.date)),
                    timestamp: result.timestamp
                });
                console.log('Student result saved to Firebase');
            } catch (error) {
                console.error('Error saving to Firebase:', error);
                // Fallback to localStorage
                saveToLocalStorage(result);
            }
        } else {
            // Fallback to localStorage if Firebase is not available
            saveToLocalStorage(result);
        }
    }
    
    // Fallback function to save to localStorage
    function saveToLocalStorage(result) {
        let students = JSON.parse(localStorage.getItem('quizStudents') || '[]');
        students.push(result);
        localStorage.setItem('quizStudents', JSON.stringify(students));
    }

    window.downloadCertificate = function() {
        // Create a minimalist black and white certificate design with logic elements
        const canvas = document.createElement('canvas');
        canvas.width = 1400;
        canvas.height = 900;
        const ctx = canvas.getContext('2d');
        
        const percentage = (quizState.score / quizState.questions.length) * 100;
        const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F';
        
        // Pure black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 1400, 900);
        
        // White outer frame
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 8;
        ctx.strokeRect(40, 40, 1320, 820);
        
        // Inner frame (subtle white)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(80, 80, 1240, 760);
        
        // Decorative binary code (top corners)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.font = 'bold 14px "Courier New", monospace';
        ctx.textAlign = 'left';
        // Top left binary
        ctx.fillText('10101001', 100, 100);
        ctx.fillText('01011010', 100, 120);
        // Top right binary
        ctx.textAlign = 'right';
        ctx.fillText('11001100', 1300, 100);
        ctx.fillText('00110011', 1300, 120);
        
        // Bottom corners binary
        ctx.textAlign = 'left';
        ctx.fillText('11110000', 100, 780);
        ctx.fillText('00001111', 100, 800);
        ctx.textAlign = 'right';
        ctx.fillText('01010101', 1300, 780);
        ctx.fillText('10101010', 1300, 800);
        
        // Logic gate symbols (corners)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        // Top left AND gate
        ctx.beginPath();
        ctx.moveTo(120, 160);
        ctx.quadraticCurveTo(140, 140, 160, 160);
        ctx.lineTo(160, 180);
        ctx.quadraticCurveTo(140, 200, 120, 180);
        ctx.closePath();
        ctx.stroke();
        // Top right OR gate
        ctx.beginPath();
        ctx.moveTo(1240, 160);
        ctx.quadraticCurveTo(1280, 140, 1320, 160);
        ctx.quadraticCurveTo(1280, 200, 1240, 180);
        ctx.closePath();
        ctx.stroke();
        
        // Top section - Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 60px "Arial", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('QUIZ RESULT', 700, 120);
        
        // Subtitle
        ctx.font = '300 28px "Arial", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillText('Group 2: Logic and Computer Addition', 700, 190);
        
        // Horizontal divider line with logic symbols
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(150, 240);
        ctx.lineTo(600, 240);
        ctx.stroke();
        ctx.moveTo(800, 240);
        ctx.lineTo(1250, 240);
        ctx.stroke();
        
        // Math symbols on divider
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = 'bold 32px "Arial", sans-serif';
        ctx.fillText('∧', 610, 225);
        ctx.fillText('∨', 790, 225);
        ctx.fillText('→', 700, 225);
        
        // Student Name Section - Large and prominent
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '300 32px "Arial", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('', 700, 280);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 72px "Arial", sans-serif';
        ctx.fillText(quizState.studentName.toUpperCase(), 700, 330);
        
        // Horizontal divider with circuit line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(150, 430);
        ctx.lineTo(1250, 430);
        ctx.stroke();
        
        // Circuit nodes on divider
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(200, 430, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(1200, 430, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Score Summary Section - Perfectly aligned boxes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.49)';
        ctx.font = '300 24px "Arial", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('SCORE SUMMARY', 150, 480);
        
        const boxStartX = 150;
        const boxY = 540;
        const boxWidth = 260;
        const boxHeight = 150;
        const boxGap = 20;
        
        // All boxes use same vertical alignment for main values
        const labelY = boxY + 25;
        const mainValueY = boxY + 85; // Same for all boxes
        const subtitleY = boxY + 125; // For score box only
        
        // Score Box
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(boxStartX, boxY, boxWidth, boxHeight);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxStartX, boxY, boxWidth, boxHeight);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '300 20px "Arial", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SCORE', boxStartX + boxWidth / 2, labelY);
        
        // Score number (larger, centered)
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 52px "Arial", sans-serif';
        const scoreText = quizState.score.toString();
        ctx.fillText(scoreText, boxStartX + boxWidth / 2, mainValueY);
        
        // Percentage Box
        const percentageX = boxStartX + boxWidth + boxGap;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(percentageX, boxY, boxWidth, boxHeight);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.strokeRect(percentageX, boxY, boxWidth, boxHeight);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '300 20px "Arial", sans-serif';
        ctx.fillText('PERCENTAGE', percentageX + boxWidth / 2, labelY);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 52px "Arial", sans-serif';
        ctx.fillText(percentage.toFixed(1) + '%', percentageX + boxWidth / 2, mainValueY);
        
        // Grade Box - Aligned with same baseline
        const gradeX = percentageX + boxWidth + boxGap;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(gradeX, boxY, boxWidth, boxHeight);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.strokeRect(gradeX, boxY, boxWidth, boxHeight);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '300 20px "Arial", sans-serif';
        ctx.fillText('GRADE', gradeX + boxWidth / 2, labelY);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 52px "Arial", sans-serif';
        ctx.fillText(grade, gradeX + boxWidth / 2, mainValueY);
        
        // Total Questions Box
        const totalX = gradeX + boxWidth + boxGap;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(totalX, boxY, boxWidth, boxHeight);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.strokeRect(totalX, boxY, boxWidth, boxHeight);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '300 20px "Arial", sans-serif';
        ctx.fillText('TOTAL QUESTIONS', totalX + boxWidth / 2, labelY);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 52px "Arial", sans-serif';
        ctx.fillText(quizState.questions.length, totalX + boxWidth / 2, mainValueY);
        
        // Decorative logic elements around boxes
        // Circuit lines connecting boxes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(boxStartX + boxWidth, boxY + boxHeight / 2);
        ctx.lineTo(percentageX, boxY + boxHeight / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(percentageX + boxWidth, boxY + boxHeight / 2);
        ctx.lineTo(gradeX, boxY + boxHeight / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(gradeX + boxWidth, boxY + boxHeight / 2);
        ctx.lineTo(totalX, boxY + boxHeight / 2);
        ctx.stroke();
        
        // Circuit nodes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        const nodeY = boxY + boxHeight / 2;
        [boxStartX + boxWidth, percentageX, percentageX + boxWidth, gradeX, gradeX + boxWidth, totalX].forEach(x => {
            ctx.beginPath();
            ctx.arc(x, nodeY, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Bottom divider with summation symbol
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(150, 720);
        ctx.lineTo(1250, 720);
        ctx.stroke();
        
        // Summation symbol (Σ) on divider
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = 'bold 36px "Arial", sans-serif';
        ctx.fillText('Σ', 700, 705);
        
        // Footer - Minimalist
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '300 18px "Arial", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Completed on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), 700, 760);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = '300 16px "Arial", sans-serif';
        ctx.fillText('Mathematics in the Modern World Quiz', 700, 800);
        
        // Download
        const link = document.createElement('a');
        link.download = 'Quiz-Result-' + quizState.studentName.replace(/\s+/g, '-') + '.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
    };

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mouse parallax effect on hero section
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;

            const layers = hero.querySelectorAll('.parallax-bg');
            layers.forEach((layer, index) => {
                const depth = (index + 1) * 10;
                const moveX = xPercent * depth;
                const moveY = yPercent * depth;
                layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });

        hero.addEventListener('mouseleave', () => {
            const layers = hero.querySelectorAll('.parallax-bg');
            layers.forEach(layer => {
                layer.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Add smooth reveal effect for grid items
    const gridSection = document.querySelector('.grid-section');
    if (gridSection) {
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.grid-item');
                    // Reset first to retrigger animation
                    items.forEach(item => {
                        item.classList.remove('active');
                    });
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, index * 100);
                    });
                } else {
                    // Reset animation
                    const items = entry.target.querySelectorAll('.grid-item');
                    items.forEach(item => {
                        item.classList.remove('active');
                    });
                }
            });
        }, { threshold: 0.3 });

        gridObserver.observe(gridSection);
    }

    // Add smooth reveal effect for cards
    const cardsSection = document.querySelector('.cards-section');
    if (cardsSection) {
        const cardsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reset first to retrigger animation
                    const heading = entry.target.querySelector('.section-heading');
                    if (heading) {
                        heading.classList.remove('active');
                    }
                    const cards = entry.target.querySelectorAll('.card');
                    cards.forEach(card => {
                        card.classList.remove('active');
                    });
                    
                    // Activate section heading
                    if (heading) {
                        requestAnimationFrame(() => {
                            heading.classList.add('active');
                        });
                    }
                    
                    // Activate cards with staggered delay
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('active');
                        }, index * 150);
                    });
                } else {
                    // Reset animation
                    const heading = entry.target.querySelector('.section-heading');
                    if (heading) {
                        heading.classList.remove('active');
                    }
                    
                    const cards = entry.target.querySelectorAll('.card');
                    cards.forEach(card => {
                        card.classList.remove('active');
                    });
                }
            });
        }, { threshold: 0.2 });

        cardsObserver.observe(cardsSection);
    }

    // Interactive hover effects for image placeholders
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.transition = 'transform 0.5s ease';
        });

        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add tilt effect to cards on hover
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Button interaction effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            ctaButton.style.position = 'relative';
            ctaButton.style.overflow = 'hidden';
            ctaButton.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: Disable parallax on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.style.setProperty('--parallax-enabled', '0');
    }

    // Update parallax on initial load
    updateParallax();

    // ========================================
    // MOUSE INTERACTION WITH MORPHING SHAPES
    // ========================================
    
    // Make morphing shapes follow mouse in hero section with smooth interpolation
    const morphingShapes = document.querySelectorAll('.morph-shape');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let shapePositions = Array.from(morphingShapes).map(() => ({ x: 0, y: 0, targetX: 0, targetY: 0 }));
    
    document.addEventListener('mousemove', (e) => {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
    });
    
    function updateMorphShapePositions() {
        // Smooth mouse interpolation
        const mouseDamping = 0.15;
        const mouseDiffX = targetMouseX - mouseX;
        const mouseDiffY = targetMouseY - mouseY;
        mouseX += mouseDiffX * mouseDamping;
        mouseY += mouseDiffY * mouseDamping;
        
        morphingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.02;
            const rect = shape.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate target position
            const targetX = (mouseX - centerX) * speed;
            const targetY = (mouseY - centerY) * speed;
            
            // Smooth interpolation
            const damping = 0.12;
            shapePositions[index].targetX = targetX;
            shapePositions[index].targetY = targetY;
            shapePositions[index].x += (targetX - shapePositions[index].x) * damping;
            shapePositions[index].y += (targetY - shapePositions[index].y) * damping;
            
            // Apply smooth transform with CSS transition
            shape.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            shape.style.transform = `translate(${shapePositions[index].x}px, ${shapePositions[index].y}px)`;
        });
        
        requestAnimationFrame(updateMorphShapePositions);
    }
    
    if (morphingShapes.length > 0) {
        updateMorphShapePositions();
    }
    
    // ========================================
    // SCROLL-BASED MORPHING INTENSITY (SMOOTH)
    // ========================================
    
    let targetScrollPercent = 0;
    let currentScrollPercent = 0;
    
    function updateMorphingIntensity() {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetScrollPercent = maxScroll > 0 ? targetScrollY / maxScroll : 0;
        
        // Smooth interpolation
        const scrollDiff = targetScrollPercent - currentScrollPercent;
        const damping = 0.2;
        currentScrollPercent += scrollDiff * damping;
        
        const floatMorphs = document.querySelectorAll('.float-morph');
        
        floatMorphs.forEach((morph, index) => {
            const rotation = currentScrollPercent * 360 + (index * 90);
            const scale = 1 + Math.sin(currentScrollPercent * Math.PI * 2 + index) * 0.2;
            
            // Apply smooth transition
            morph.style.transition = 'none';
            morph.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            morph.style.willChange = 'transform';
        });
        
        // Continue updating if still interpolating
        if (Math.abs(scrollDiff) > 0.001) {
            requestAnimationFrame(updateMorphingIntensity);
        }
    }
    
    // Start smooth morphing intensity update
    updateMorphingIntensity();
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateMorphingIntensity);
    }, { passive: true });
    
    // ========================================
    // INTERACTIVE FEATURE CARDS
    // ========================================
    
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const morphBg = this.querySelector('.card-morph-bg');
            if (morphBg) {
                morphBg.style.animationPlayState = 'paused';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const morphBg = this.querySelector('.card-morph-bg');
            if (morphBg) {
                morphBg.style.animationPlayState = 'running';
            }
        });
        
        // Add 3D tilt effect to feature cards
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
    
    // ========================================
    // MORPHING SHAPES VISIBILITY BASED ON SCROLL
    // ========================================
    
    const morphingFeaturesSection = document.querySelector('.morphing-features-section');
    
    if (morphingFeaturesSection) {
        const morphObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const floatingMorphs = entry.target.querySelectorAll('.float-morph');
                if (entry.isIntersecting) {
                    // Reset first to retrigger animation
                    floatingMorphs.forEach(morph => {
                        morph.style.opacity = '0';
                        morph.style.transform = 'scale(0.5)';
                    });
                    floatingMorphs.forEach((morph, index) => {
                        setTimeout(() => {
                            morph.style.opacity = '1';
                            morph.style.transform = 'scale(1)';
                        }, index * 100);
                    });
                } else {
                    floatingMorphs.forEach(morph => {
                        morph.style.opacity = '0';
                        morph.style.transform = 'scale(0.5)';
                    });
                }
            });
        }, { threshold: 0.2 });
        
        morphObserver.observe(morphingFeaturesSection);
        
        // Initialize morphs as hidden
        const floatingMorphs = document.querySelectorAll('.float-morph');
        floatingMorphs.forEach(morph => {
            morph.style.opacity = '0';
            morph.style.transform = 'scale(0.5)';
            morph.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Recalculate positions on resize
    window.scrollTo(window.scrollX, window.scrollY);
}, 250);

window.addEventListener('resize', handleResize);


