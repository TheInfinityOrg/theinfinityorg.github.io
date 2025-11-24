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
        rank: 1,
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
        rank: 2,
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
        rank: 3,
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
const weaponRankingList = document.getElementById('weaponRankingList');

const weaponOrder = Object.keys(weapons).sort((a, b) => {
    const rankA = weapons[a].rank ?? Number.MAX_SAFE_INTEGER;
    const rankB = weapons[b].rank ?? Number.MAX_SAFE_INTEGER;
    return rankA - rankB;
});

let optionElements = [];
let rankingItems = [];
let currentIndex = 0;

function formatWeaponLabel(weapon, includeRank = true) {
    if (!weapon) return '';
    if (!includeRank || !weapon.rank) {
        return weapon.name;
    }
    return `${weapon.rank}° ${weapon.name}`;
}

function closeDropdown() {
    if (trigger) {
        trigger.classList.remove('active');
    }
    if (options) {
        options.classList.remove('active');
    }
}

function updateSelectedText(weaponKey) {
    if (!selectedText) return;
    const weapon = weapons[weaponKey];
    if (!weapon) return;
    selectedText.textContent = formatWeaponLabel(weapon);
}

function highlightSelection(weaponKey) {
    optionElements.forEach(opt => {
        const isActive = opt.dataset.value === weaponKey;
        opt.classList.toggle('selected', isActive);
        if (!isActive) {
            opt.style.background = '';
        }
    });

    rankingItems.forEach(item => {
        const isActive = item.dataset.value === weaponKey;
        item.classList.toggle('active', isActive);
    });
}

function handleWeaponSelection(weaponKey) {
    if (!weaponKey || !weapons[weaponKey]) return;
    loadWeapon(weaponKey);
    updateSelectedText(weaponKey);
    highlightSelection(weaponKey);
    currentIndex = optionElements.findIndex(opt => opt.dataset.value === weaponKey);
}

function populateDropdown() {
    if (!options) return;
    options.innerHTML = '';

    optionElements = weaponOrder.map(key => {
        const option = document.createElement('div');
        option.className = 'custom-select-option';
        option.dataset.value = key;
        option.textContent = formatWeaponLabel(weapons[key]);
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            closeDropdown();
            handleWeaponSelection(key);
        });
        options.appendChild(option);
        return option;
    });
}

function renderWeaponRanking() {
    if (!weaponRankingList) return;
    weaponRankingList.innerHTML = '';

    rankingItems = weaponOrder.map((key, index) => {
        const weapon = weapons[key];
        const item = document.createElement('li');
        item.className = 'weapon-ranking-item';
        item.dataset.value = key;
        const displayRank = weapon.rank ?? (index + 1);
        item.innerHTML = `<span class="weapon-rank-number">${displayRank}°</span> ${weapon.name}`;
        item.addEventListener('click', () => {
            handleWeaponSelection(key);
            closeDropdown();
        });
        weaponRankingList.appendChild(item);
        return item;
    });
}

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
}

// ============================================
// LOAD WEAPON FUNCTION
// ============================================
function loadWeapon(weaponKey) {
    const weapon = weapons[weaponKey];

    if (!weapon) return;
    if (!weaponCard) return;

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
    document.addEventListener('keydown', function (e) {
        if (!options.classList.contains('active')) return;
        if (!optionElements.length) return;

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
                closeDropdown();
                break;
        }
    });

    function highlightOption(index) {
        optionElements.forEach((opt, i) => {
            if (i === index) {
                opt.style.background = 'linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%)';
                opt.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else if (!opt.classList.contains('selected')) {
                opt.style.background = '';
            }
        });
    }
}

// ============================================
// INITIALIZE ON DOM LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    populateDropdown();
    renderWeaponRanking();

    const defaultWeaponKey = weaponOrder[0] || Object.keys(weapons)[0];
    if (defaultWeaponKey) {
        handleWeaponSelection(defaultWeaponKey);
    }

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
