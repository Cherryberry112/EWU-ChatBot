// Get all necessary elements
const modalContainer = document.getElementById('modal-container');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.getElementById('close-btn');
const modalOptionBtns = document.querySelectorAll('.option-btn.modal-trigger');

const fallbackImg = "this.src='https://placehold.co/60x60/333/ccc?text=?'";

// Developer content
const devContent = `
    <h2>Our Team</h2>
    <div class="profile-list">
        <div class="profile-card">
            <div class="profile-card-image">
                <img src="https://i.imgur.com/TTW68y0.jpeg" alt="Profile Photo" onerror="${fallbackImg}">
            </div>
            <div class="profile-card-info">
                <h3>MD. Samir Hossain</h3>
                <p>Developer</p>
            </div>
            <a href="#" class="profile-card-link" target="_blank" rel="noopener noreferrer">Profile</a>
        </div>
        <div class="profile-card">
            <div class="profile-card-image">
                <img src="https://i.imgur.com/1RLQzJl.jpeg" alt="Profile Photo" onerror="${fallbackImg}">
            </div>
            <div class="profile-card-info">
                <h3>Atkiya Maisha</h3>
                <p>Developer</p>
            </div>
            <a href="#" class="profile-card-link" target="_blank" rel="noopener noreferrer">Profile</a>
        </div>
        <div class="profile-card">
            <div class="profile-card-image">
                <img src="https://i.imgur.com/BDx2JLb.png" alt="Profile Photo" onerror="${fallbackImg}">
            </div>
            <div class="profile-card-info">
                <h3>Shafayat Hasnat Rubaiyat</h3>
                <p>Developer</p>
            </div>
            <a href="#" class="profile-card-link" target="_blank" rel="noopener noreferrer">Profile</a>
        </div>
        <div class="profile-card">
            <div class="profile-card-image">
                <img src="https://i.imgur.com/T17BqHc.png" alt="Profile Photo" onerror="${fallbackImg}">
            </div>
            <div class="profile-card-info">
                <h3>Mohua Akter</h3>
                <p>Developer</p>
            </div>
            <a href="#" class="profile-card-link" target="_blank" rel="noopener noreferrer">Profile</a>
        </div>
    </div>
`;

// Supervisor content
const supContent = `
    <h2>Supervisor</h2>
    <div class="profile-list">
        <div class="profile-card supervisor-card">
            <div class="profile-card-image">
                 <img src="https://i.imgur.com/6SW8ewn.jpeg" alt="Profile Photo" onerror="${fallbackImg}">
            </div>
            <div class="profile-card-info">
                <h3>Dr. Mohammad Rezwanul Huq</h3>
                <p>Associate Professor</p>
                <p>Dept. of Computer Science and Engineering</p>
                <p>East West University</p>
            </div>
            <a href="https://fse.ewubd.edu/computer-science-engineering/faculty-view/mrhuq" class="profile-card-link" target="_blank" rel="noopener noreferrer">Profile</a>
        </div>
    </div>
`;

// Inject Dropdown Content
document.getElementById('dev-dropdown-content').innerHTML = devContent;
document.getElementById('sup-dropdown-content').innerHTML = supContent;

// Function to open the modal
function openModal(content) {
    modalBody.innerHTML = content;
    modalContainer.classList.add('show');
}

// Function to close the modal
function closeModal() {
    modalContainer.classList.remove('show');
}

// Dropdown Menu Logic
document.addEventListener('click', (e) => {
    const isDropdownButton = e.target.matches('.dropdown-btn');

    if (!isDropdownButton && e.target.closest('.dropdown') === null) {
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
        return;
    }

    if (isDropdownButton) {
        const currentDropdownContent = e.target.nextElementSibling;
        const isAlreadyOpen = currentDropdownContent.classList.contains('show');

        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            dropdown.classList.remove('show');
        });

        if (!isAlreadyOpen) {
            currentDropdownContent.classList.add('show');
        }
    }
});


// Add click listeners to modal-trigger buttons (CONSOLIDATED LOGIC)
modalOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const optionName = btn.dataset.option;
        const optionDesc = btn.getAttribute('data-tooltip');
        let additionalContent = '';

        // Only handle RAG Bot with the custom message
        if (optionName === 'RAG Bot') {
            // CUSTOM MESSAGE FOR RAG BOT
            additionalContent = `
                <p>Requires an always running GPU-based heavy server to run the model<br>Finding workaround soon : )</p>
            `;
        } else {
            // Default content for all other modal buttons (Standard Bot if it was a modal, Enhanced, and Advanced Bot)
            additionalContent = `
                <p>This chatbot interaction is currently under development.</p>
                <p>Please check back soon!</p>
            `;
        }

        const optionContent = `
            <h2>${optionName}</h2>
            <p style="font-size: 1rem; color: var(--text-color); margin-bottom: 1.5rem;">${optionDesc}</p>
            ${additionalContent}
        `;
        openModal(optionContent);
    });
});


// Close modal when clicking the 'x'
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking on the background
modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
        closeModal();
    }
});

// Close modal on 'Escape' key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalContainer.classList.contains('show')) {
        closeModal();
    }
});
