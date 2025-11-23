/**
 * THE INFINITY - BUILDS PAGE JAVASCRIPT
 * Handles weapon selection and display
 */

// ============================================
// WEAPON DATA
// ============================================
const weapons = {
    ffar1: {
        name: 'FFAR 1',
        img: '../img/assets/FFAR 1.png',
        attachments: [
            {
                type: 'Volata',
                name: 'Compensatore forato',
                unlock: 'Livello Arma 27'
            },
            {
                type: 'Sottocanna',
                name: 'Impugnatura anteriore verticale',
                unlock: 'Livello Arma 15'
            },
            {
                type: 'Caricatore',
                name: 'Caricatore aumentato II',
                unlock: 'Livello Arma 17'
            },
            {
                type: 'Impugnatura',
                name: 'Impugnatura da comando',
                unlock: 'Livello Arma 21'
            },
            {
                type: 'Mod fuoco',
                name: 'Molle antirinculo',
                unlock: 'Livello Arma 26'
            }
        ]
    },
    gpr91: {
        name: 'GPR 91',
        img: '../img/assets/GPR 91.png',
        attachments: [
            {
                type: 'Ottica',
                name: 'Jason armory 2x',
                unlock: 'Livello Arma 5'
            },
            {
                type: 'Volata',
                name: 'Compensatore',
                unlock: 'Livello Arma 21'
            },
            {
                type: 'Canna',
                name: 'Canna lunga',
                unlock: 'Livello Arma 2'
            },
            {
                type: 'Sottocanna',
                name: 'Impugnatura anteriore verticale',
                unlock: 'Livello Arma 15'
            },
            {
                type: 'Caricatore',
                name: 'Caricatore aumentato II',
                unlock: 'Livello Arma 30'
            }
        ]
    },
    lc10: {
        name: 'LC10',
        img: '../img/assets/LC10.png',
        attachments: [
            {
                type: 'Canna',
                name: 'Canna rinforzata',
                unlock: 'Livello Arma 29'
            },
            {
                type: 'Sottocanna',
                name: 'Impugnatura anteriore verticale',
                unlock: 'Livello Arma 8'
            },
            {
                type: 'Caricatore',
                name: 'Caricatore aumentato II',
                unlock: 'Livello Arma 31'
            },
            {
                type: 'Impugnatura',
                name: 'Impugnatura ergonomica',
                unlock: 'Livello Arma 38'
            },
            {
                type: 'Mod fuoco',
                name: '9x19 mm Parabellum FMJ',
                unlock: 'Livello Arma 24'
            }
        ]
    }
};

// ============================================
// DOM ELEMENTS
// ============================================
const trigger = document.getElementById('selectTrigger');
const options = document.getElementById('selectOptions');
const selectedText = document.getElementById('selectedText');
const weaponImage = document.getElementById('weaponImage');
const weaponTitle = document.getElementById('weaponTitle');
const attachmentList = document.getElementById('attachmentList');
const weaponCard = document.getElementById('weaponCard');

// ============================================
// DROPDOWN FUNCTIONALITY
// ============================================
if (trigger && options) {
    // Toggle dropdown
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        trigger.classList.toggle('active');
        options.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.custom-select-wrapper')) {
            trigger.classList.remove('active');
            options.classList.remove('active');
        }
    });

    // Handle option selection
    const optionElements = document.querySelectorAll('.custom-select-option');

    optionElements.forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();

            const value = this.dataset.value;
            const text = this.textContent.trim();

            // Update selected state
            optionElements.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');

            // Update trigger text
            selectedText.textContent = text;

            // Close dropdown
            trigger.classList.remove('active');
            options.classList.remove('active');

            // Load weapon
            loadWeapon(value);
        });
    });
}

// ============================================
// LOAD WEAPON FUNCTION
// ============================================
function loadWeapon(weaponKey) {
    const weapon = weapons[weaponKey];

    if (!weapon) return;

    // Add fade out animation
    weaponCard.style.opacity = '0';
    weaponCard.style.transform = 'translateY(20px)';

    setTimeout(() => {
        // Update image
        if (weaponImage) {
            weaponImage.src = weapon.img;
            weaponImage.alt = weapon.name;
        }

        // Update title
        if (weaponTitle) {
            weaponTitle.textContent = `${weapon.name} – ATTACHMENTS`;
        }

        // Update attachments
        if (attachmentList) {
            attachmentList.innerHTML = '';

            weapon.attachments.forEach((attachment, index) => {
                const attachmentItem = document.createElement('div');
                attachmentItem.className = 'attachment-item';
                attachmentItem.style.opacity = '0';
                attachmentItem.style.transform = 'translateX(-20px)';

                attachmentItem.innerHTML = `
          <span>${attachment.type}</span>
          <strong>${attachment.name}</strong>
          <span class="unlock-info">${attachment.unlock}</span>
        `;

                attachmentList.appendChild(attachmentItem);

                // Stagger animation
                setTimeout(() => {
                    attachmentItem.style.transition = 'all 0.4s ease';
                    attachmentItem.style.opacity = '1';
                    attachmentItem.style.transform = 'translateX(0)';
                }, index * 100);
            });
        }

        // Fade in card
        weaponCard.style.transition = 'all 0.5s ease';
        weaponCard.style.opacity = '1';
        weaponCard.style.transform = 'translateY(0)';
    }, 300);
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
if (options) {
    let currentIndex = 0;
    const optionElements = Array.from(document.querySelectorAll('.custom-select-option'));

    document.addEventListener('keydown', function (e) {
        if (!options.classList.contains('active')) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                currentIndex = (currentIndex + 1) % optionElements.length;
                highlightOption(currentIndex);
                break;

            case 'ArrowUp':
                e.preventDefault();
                currentIndex = (currentIndex - 1 + optionElements.length) % optionElements.length;
                highlightOption(currentIndex);
                break;

            case 'Enter':
                e.preventDefault();
                if (optionElements[currentIndex]) {
                    optionElements[currentIndex].click();
                }
                break;

            case 'Escape':
                trigger.classList.remove('active');
                options.classList.remove('active');
                break;
        }
    });

    function highlightOption(index) {
        optionElements.forEach((opt, i) => {
            if (i === index) {
                opt.style.background = 'linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%)';
                opt.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                opt.style.background = '';
            }
        });
    }
}

// ============================================
// INITIALIZE ON DOM LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    // Load first weapon by default
    loadWeapon('ffar1');

    // Add smooth transitions
    if (weaponCard) {
        weaponCard.style.transition = 'all 0.5s ease';
    }
});

// ============================================
// IMAGE ERROR HANDLING
// ============================================
if (weaponImage) {
    weaponImage.addEventListener('error', function () {
        console.warn('Failed to load weapon image:', this.src);
        // Fallback to placeholder
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="300"%3E%3Crect fill="%231a1a3e" width="600" height="300"/%3E%3Ctext fill="%23ab0eff" font-size="24" font-family="Arial" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EWeapon Image%3C/text%3E%3C/svg%3E';
    });
}
