/**
 * THE INFINITY - ABOUT PAGE JAVASCRIPT
 * Handles member loading and statistics
 */

// ============================================
// MEMBER DATA
// ============================================
const members = [
    {
        name: 'ElevenCorvo',
        username: 'elevencorvo',
        role: '👑 Fondatore',
        avatar: 'https://cdn.discordapp.com/avatars/697395013994414093/b4f1743f2cc95aec58a6676d197ab2b9.png?size=1024',
        status: 'online'
    },
    {
        name: 'FirePhoenix',
        username: 'firephoenix3108',
        role: '👑 Co Fondatore',
        avatar: 'https://cdn.discordapp.com/avatars/490142694518030357/51981b62ad9c6fab9688e728ab8c593f.png?size=1024',
        status: 'online'
    },
    {
        name: 'Buccia_Darancia',
        username: 'buccia_darancia',
        role: '🛡️ Admin',
        avatar: 'https://cdn.discordapp.com/avatars/428250583317610497/fc3e1e7b7ef876752664db9f2d7b85e7.png?size=1024',
        status: 'online'
    },
    {
        name: 'sgr.fire',
        username: 'sgr.fire',
        role: '🛡️ Staff',
        avatar: 'https://cdn.discordapp.com/avatars/715107326234984506/4edb8dfc24b4e093c6c67aee4737b57b.png?size=1024',
        status: 'online'
    }
];

// ============================================
// DOM ELEMENTS
// ============================================
const membersGrid = document.getElementById('membersGrid');
const totalMembersEl = document.getElementById('totalMembers');
const onlineMembersEl = document.getElementById('onlineMembers');

// ============================================
// LOAD MEMBERS FUNCTION
// ============================================
function loadMembers() {
    if (!membersGrid) return;

    members.forEach((member, index) => {
        const statusClass = `status-${member.status}`;
        const statusText =
            member.status === 'online' ? 'Online' :
                member.status === 'idle' ? 'Assente' :
                    'Offline';

        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.style.animationDelay = `${(index + 1) * 0.1}s`;

        memberCard.innerHTML = `
      <img src="${member.avatar}" alt="${member.name}" class="member-avatar" loading="lazy">
      <div class="member-name">${member.name}</div>
      <div class="member-role">${member.role}</div>
      <div class="member-discord">
        <svg class="discord-icon" viewBox="0 0 24 24" fill="#7289da">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        ${member.username}
      </div>
      <div class="member-status ${statusClass}">${statusText}</div>
    `;

        membersGrid.appendChild(memberCard);
    });

    // Update statistics
    if (totalMembersEl && onlineMembersEl) {
        const onlineCount = members.filter(m => m.status === 'online').length;

        animateValue(totalMembersEl, 0, members.length, 1500);
        animateValue(onlineMembersEl, 0, onlineCount, 1500);
    }
}

// ============================================
// ANIMATE NUMBER FUNCTION
// ============================================
function animateValue(element, start, end, duration) {
    if (!element) return;

    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);

        element.textContent = current;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

// ============================================
// INITIALIZE ON DOM LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    loadMembers();

    // Add hover sound effect (optional)
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
});

// ============================================
// DISCORD API INTEGRATION (FUTURE)
// ============================================
/*
async function loadDiscordMembers() {
  try {
    // This would require a backend proxy to call Discord API
    const response = await fetch('YOUR_API_ENDPOINT');
    const data = await response.json();
    
    // Process and display members
    data.members.forEach(member => {
      // Create member cards dynamically
    });
  } catch (error) {
    console.error('Error loading Discord members:', error);
    // Fallback to static data
    loadMembers();
  }
}
*/
