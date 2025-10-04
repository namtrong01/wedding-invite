// Lazy loading scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for lazy loading animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('.save-date-section, .event-details-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Hero image parallax effect
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroImage.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Smooth scrolling for any internal links
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

    // Add loading animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }

    // Add scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.innerHTML = '↓';
    scrollIndicator.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 14px;
        z-index: 1000;
        animation: bounce 2s infinite;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        pointer-events: none;
    `;
    
    // Add bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateX(-50%) translateY(0);
            }
            40% {
                transform: translateX(-50%) translateY(-10px);
            }
            60% {
                transform: translateX(-50%) translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(scrollIndicator);

    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.5s ease';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });

    // Add fade-in animation to hero content
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        heroSubtitle.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }
});

// Congratulations Modal Functions
function openCongratulationsModal() {
    const modal = document.getElementById('congratulationsModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeCongratulationsModal() {
    const modal = document.getElementById('congratulationsModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function sendCongratulations() {
    const guestName = document.getElementById('guestName').value;
    const message = document.getElementById('congratulationsMessage').value;
    
    if (!guestName.trim() || !message.trim()) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    
    // Clear the form
    document.getElementById('guestName').value = '';
    document.getElementById('congratulationsMessage').value = '';
    
    // Close the modal immediately
    closeCongratulationsModal();
    
    // Create confetti animation after modal closes
    setTimeout(() => {
        createConfetti();
    }, 300);
}

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    
    // Create multiple confetti pieces
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff69b4', '#ffb6c1', '#ffc0cb', '#ffd700', '#ffa500', '#ff6347'][Math.floor(Math.random() * 6)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti container after animation
    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 5000);
}

// Gift Modal Functions
function openGiftModal() {
    const modal = document.getElementById('giftModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeGiftModal() {
    const modal = document.getElementById('giftModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function copyAccountInfo() {
    const accountInfo = `Tên tài khoản: Nguyen Thi Linh Chi\nSố tài khoản: 19034470970017\nNgân hàng: Techcombank`;
    
    // Try to use the modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(accountInfo).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopyTextToClipboard(accountInfo);
        });
    } else {
        fallbackCopyTextToClipboard(accountInfo);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
        alert('Không thể sao chép. Vui lòng sao chép thủ công:\n' + text);
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    const copyButton = document.querySelector('.copy-button');
    const originalText = copyButton.innerHTML;
    
    copyButton.innerHTML = '✅ Đã sao chép!';
    copyButton.style.background = 'linear-gradient(145deg, #4CAF50, #45a049)';
    
    setTimeout(() => {
        copyButton.innerHTML = originalText;
        copyButton.style.background = 'linear-gradient(145deg, #8b7355, #c4a484)';
    }, 2000);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const giftModal = document.getElementById('giftModal');
    const congratulationsModal = document.getElementById('congratulationsModal');
    
    if (event.target === giftModal) {
        closeGiftModal();
    }
    if (event.target === congratulationsModal) {
        closeCongratulationsModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeGiftModal();
        closeCongratulationsModal();
    }
});