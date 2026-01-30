/**
 * GRAMMARLY'T - Main JavaScript
 * All the chaotic interactions that make this parody shine
 * Fast, funny, and full of intentional bugs (features)
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initGlitchHeadline();
    initEscapingButton();
    initStuckLoadingBar();
    initEditor();
    initStatsAnimation();
    initSubscribeButton();
    checkAPIStatus();
});

/* ===================================
   NAVIGATION
   =================================== */
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Smooth scroll for all nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ===================================
   GLITCH HEADLINE
   Auto-glitches every 3 seconds
   =================================== */
function initGlitchHeadline() {
    const headline = document.querySelector('.glitch-headline');
    if (!headline) return;

    const phrases = [
        "Write better.",
        "Write bitter.",
        "Write... idk man.",
        "Write batter.",
        "Write butter.",
        "Right better?",
        "Wright beter.",
        "Writ bettr.",
        "Write beta.",
        "Writе bеttеr.", // Contains Cyrillic е for extra chaos
        "Write [object Object]",
        "Write undefined",
        "Write NaN",
        "404: Writing not found",
        "Write.exe has stopped",
    ];

    let currentIndex = 0;

    function glitchText() {
        headline.classList.add('glitching');
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % phrases.length;
            headline.textContent = phrases[currentIndex];
            headline.setAttribute('data-text', phrases[currentIndex]);
            headline.classList.remove('glitching');
        }, 300);
    }

    // Glitch every 3 seconds
    setInterval(glitchText, 3000);
}

/* ===================================
   ESCAPING CTA BUTTON
   Moves away when you try to hover
   =================================== */
function initEscapingButton() {
    const btn = document.getElementById('escapingBtn');
    if (!btn) return;

    let escapeCount = 0;
    const maxEscapes = 5;
    let isEscaping = true;

    btn.addEventListener('mouseenter', (e) => {
        if (!isEscaping) return;
        
        escapeCount++;
        
        if (escapeCount > maxEscapes) {
            // Finally let them click after enough attempts
            btn.textContent = "Fine, click me 😤";
            isEscaping = false;
            btn.style.transform = 'translate(0, 0)';
            return;
        }

        // Calculate escape direction
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        
        // Move away from mouse
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 100;
        
        // Keep button within viewport
        const maxX = window.innerWidth - rect.width - 50;
        const maxY = window.innerHeight - rect.height - 50;
        
        let newX = Math.min(Math.max(moveX, -rect.left + 20), maxX - rect.left);
        let newY = Math.min(Math.max(moveY, -rect.top + 100), maxY - rect.top);
        
        btn.style.transform = `translate(${newX}px, ${newY}px)`;
        btn.style.transition = 'transform 0.2s ease-out';

        // Change button text based on escape count
        const texts = [
            "Get Grammarly't Free",
            "Almost got me!",
            "Too slow!",
            "Nice try!",
            "Getting warmer...",
        ];
        btn.textContent = texts[Math.min(escapeCount, texts.length - 1)];
    });

    btn.addEventListener('click', () => {
        showToast("🎉 You caught the button! Here's your prize: nothing.");
        btn.textContent = "Already Clicked ✓";
        btn.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
    });
}

/* ===================================
   STUCK LOADING BAR
   Gets stuck at 99% forever
   =================================== */
function initStuckLoadingBar() {
    const progressBar = document.getElementById('loadingProgress');
    const percentText = document.getElementById('loadingPercent');
    if (!progressBar || !percentText) return;

    let progress = 0;
    let speed = 2;

    function updateProgress() {
        if (progress < 99) {
            // Slow down as we approach 99
            if (progress > 90) {
                speed = 0.1;
            } else if (progress > 80) {
                speed = 0.5;
            } else if (progress > 60) {
                speed = 1;
            }

            progress += speed;
            progress = Math.min(progress, 99);
            
            progressBar.style.width = progress + '%';
            percentText.textContent = Math.floor(progress);
            
            requestAnimationFrame(updateProgress);
        } else {
            // Stuck at 99% - occasionally tease going to 100
            setInterval(() => {
                if (Math.random() > 0.7) {
                    percentText.textContent = '99.9';
                    setTimeout(() => {
                        percentText.textContent = '99';
                    }, 500);
                }
            }, 3000);
        }
    }

    // Start after a small delay
    setTimeout(updateProgress, 500);
}

/* ===================================
   EDITOR FUNCTIONALITY
   The heart of the chaos
   =================================== */
function initEditor() {
    const userInput = document.getElementById('userInput');
    const editorOutput = document.getElementById('editorOutput');
    const suggestionsList = document.getElementById('suggestionsList');
    const scoreElement = document.getElementById('grammarScore');
    const makeWorseBtn = document.getElementById('makeWorseBtn');
    const gaslightBtn = document.getElementById('gaslightBtn');
    const ignoreBtn = document.getElementById('ignoreBtn');

    if (!userInput) return;

    let debounceTimer;
    let lastText = '';

    // Auto-check grammar on input (debounced)
    userInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            const text = userInput.value.trim();
            if (text === lastText) return;
            lastText = text;

            if (text.length > 0) {
                await processGrammar(text);
            } else {
                resetEditor();
            }
        }, 1000);
    });

    // Make It Worse button
    makeWorseBtn?.addEventListener('click', async () => {
        const text = userInput.value.trim();
        if (!text) {
            showToast("Write something first! We need material to ruin.");
            return;
        }

        makeWorseBtn.disabled = true;
        makeWorseBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ruining...';

        const result = await GrammarlyAPI.makeWorse(text);
        
        userInput.value = result.result;
        lastText = result.result;
        await processGrammar(result.result);
        
        showToast(result.message);
        
        makeWorseBtn.disabled = false;
        makeWorseBtn.innerHTML = '<i class="fas fa-fire"></i> Make It Worse';
    });

    // Gaslight button
    gaslightBtn?.addEventListener('click', async () => {
        const text = userInput.value.trim();
        if (!text) {
            showToast("There's nothing here to gaslight you about... yet.");
            return;
        }

        gaslightBtn.disabled = true;
        gaslightBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gaslighting...';

        const result = await GrammarlyAPI.gaslight(text);
        
        // Show a confusing message
        showToast(result.message);
        
        // Maybe slightly change the text
        if (Math.random() > 0.5) {
            const words = text.split(' ');
            if (words.length > 2) {
                // Swap two random words
                const i = Math.floor(Math.random() * words.length);
                const j = Math.floor(Math.random() * words.length);
                [words[i], words[j]] = [words[j], words[i]];
                userInput.value = words.join(' ');
            }
        }

        gaslightBtn.disabled = false;
        gaslightBtn.innerHTML = '<i class="fas fa-brain"></i> Gaslight Me';
    });

    // Ignore All button
    ignoreBtn?.addEventListener('click', () => {
        resetEditor();
        userInput.value = '';
        lastText = '';
        
        const messages = [
            "All suggestions ignored! Your writing is now free (and wrong).",
            "Ignorance is bliss. Enjoy your unedited chaos.",
            "We spent so much time on those suggestions... 😢",
            "Fine. Do it your way. See if we care.",
            "Suggestions: Ignored. Grammar: Vibes-based.",
        ];
        showToast(messages[Math.floor(Math.random() * messages.length)]);
    });

    async function processGrammar(text) {
        try {
            const result = await GrammarlyAPI.checkGrammar(text);
            displayResults(result);
        } catch (error) {
            console.error('Grammar check failed:', error);
            showToast("Something went wrong. Probably your grammar.");
        }
    }

    function displayResults(result) {
        // Update output with highlighted corrections
        let outputHTML = result.corrected;
        
        // Highlight corrections
        result.corrections?.forEach(correction => {
            const regex = new RegExp(`\\b${correction.suggested}\\b`, 'gi');
            outputHTML = outputHTML.replace(regex, 
                `<span class="new-word" title="${correction.reason}">${correction.suggested}</span>`
            );
        });

        editorOutput.innerHTML = `
            <div class="corrected-text">${outputHTML}</div>
            <p style="margin-top: 15px; font-size: 0.9rem; color: var(--text-light);">
                <em>${result.message}</em>
            </p>
        `;

        // Update score
        if (scoreElement) {
            const scoreText = result.score.split('/')[0].replace(/[^0-9?πN∞🔥-]/g, '').slice(0, 3) || '??';
            scoreElement.textContent = scoreText;
        }

        // Update suggestions
        if (suggestionsList) {
            suggestionsList.innerHTML = result.suggestions?.map(s => `
                <div class="suggestion-item ${s.type}">
                    ${s.text}
                </div>
            `).join('') || '<p class="no-suggestions">No suggestions (suspicious...)</p>';
        }

        // Random underline effect on output
        addRandomUnderlines();
    }

    function resetEditor() {
        editorOutput.innerHTML = '<p class="placeholder-text">Your "improved" text will appear here...</p>';
        if (scoreElement) scoreElement.textContent = '??';
        if (suggestionsList) {
            suggestionsList.innerHTML = '<p class="no-suggestions">Waiting for your mistakes...</p>';
        }
    }

    function addRandomUnderlines() {
        // Add random underlines to perfectly fine words
        const correctedText = editorOutput.querySelector('.corrected-text');
        if (!correctedText) return;

        const words = correctedText.innerHTML.split(/(\s+)/);
        correctedText.innerHTML = words.map(word => {
            // Don't underline already marked words or whitespace
            if (word.includes('class=') || word.trim() === '') return word;
            
            // 15% chance to add wrong underline
            if (Math.random() < 0.15 && word.length > 3) {
                return `<span class="underline-wrong">${word}</span>`;
            }
            return word;
        }).join('');
    }
}

/* ===================================
   STATS ANIMATION
   Count up animation for stats
   =================================== */
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateValue(element) {
    const target = parseInt(element.dataset.target) || 0;
    const duration = 2000;
    const start = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/* ===================================
   SUBSCRIBE BUTTON
   Fake subscription flow
   =================================== */
function initSubscribeButton() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (!subscribeBtn) return;

    subscribeBtn.addEventListener('click', async () => {
        subscribeBtn.disabled = true;
        subscribeBtn.textContent = 'Processing...';

        const result = await GrammarlyAPI.subscribe('Pro');
        
        showToast(result.message);
        
        subscribeBtn.textContent = 'Subscribed! (Not really)';
        subscribeBtn.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
        
        // Reset after a few seconds
        setTimeout(() => {
            subscribeBtn.disabled = false;
            subscribeBtn.textContent = 'Accidentally Subscribe';
            subscribeBtn.style.background = '';
        }, 5000);
    });
}

/* ===================================
   API STATUS CHECK
   =================================== */
async function checkAPIStatus() {
    const statusElement = document.getElementById('apiStatus');
    if (!statusElement) return;

    try {
        const status = await GrammarlyAPI.getStatus();
        statusElement.textContent = status.status;
    } catch (error) {
        statusElement.textContent = "Offline (as expected)";
    }

    // Update status periodically with random messages
    setInterval(async () => {
        const status = await GrammarlyAPI.getStatus();
        statusElement.textContent = status.status;
    }, 10000);
}

/* ===================================
   TOAST NOTIFICATION
   =================================== */
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

/* ===================================
   EASTER EGGS & EXTRA CHAOS
   =================================== */

// Konami code easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.transform = 'rotate(180deg)';
        showToast("🎮 Konami code activated! Your screen is now Australian.");
        
        setTimeout(() => {
            document.body.style.transform = '';
        }, 5000);
    }
});

// Random console messages
const consoleMessages = [
    "👀 Looking at our code, huh? Bold move.",
    "🐛 If you find bugs, they're features.",
    "💚 Thanks for checking out Grammarly't!",
    "📝 Your grammar is probably fine. Probably.",
    "🤖 This console was typed by a human. We think.",
];

console.log('%c' + consoleMessages[Math.floor(Math.random() * consoleMessages.length)], 
    'font-size: 16px; color: #15c39a; font-weight: bold;');

// Add random cursor style changes
document.addEventListener('mousemove', (() => {
    let moveCount = 0;
    return () => {
        moveCount++;
        if (moveCount > 1000 && Math.random() > 0.99) {
            document.body.style.cursor = 'wait';
            setTimeout(() => {
                document.body.style.cursor = '';
            }, 1000);
            moveCount = 0;
        }
    };
})());
