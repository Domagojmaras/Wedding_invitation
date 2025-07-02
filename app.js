document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rsvpForm');
    const guestsSelect = document.getElementById('guests');
    const guestNamesContainer = document.getElementById('guestNamesContainer');

    // Handle guest count change
    guestsSelect.addEventListener('change', () => {
        const guestCount = parseInt(guestsSelect.value);
        generateGuestNameInputs(guestCount);
        toggleMessageField(guestCount);
    });

    function generateGuestNameInputs(guestCount) {
        // Clear existing inputs
        guestNamesContainer.innerHTML = '';

        if (guestCount === 0) {
            return;
        }

        // Add label for guest names section
        const label = document.createElement('label');
        label.textContent = 'Imena gostiju';
        label.className = 'guest-names-label';
        guestNamesContainer.appendChild(label);

        // Create input fields for each guest
        for (let i = 1; i <= guestCount; i++) {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';

            const input = document.createElement('input');
            input.type = 'text';
            input.id = `guestName${i}`;
            input.name = `guestName${i}`;
            input.placeholder = `Ime ${i}. gosta`;
            input.required = true;

            formGroup.appendChild(input);
            guestNamesContainer.appendChild(formGroup);

            // Add floating label effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        }
    }

    function toggleMessageField(guestCount) {
        const messageGroup = document.getElementById('messageGroup');
        if (guestCount > 0) {
            messageGroup.style.display = 'block';
        } else {
            messageGroup.style.display = 'none';
            // Clear the message field when hidden
            const messageInput = document.getElementById('message');
            if (messageInput) {
                messageInput.value = '';
            }
        }
    }

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const guestCount = parseInt(guestsSelect.value);
        
        // Collect guest names
        const guestNames = [];
        for (let i = 1; i <= guestCount; i++) {
            const guestNameInput = document.getElementById(`guestName${i}`);
            if (guestNameInput && guestNameInput.value.trim()) {
                guestNames.push(guestNameInput.value.trim());
            }
        }

        // Validate that all guest names are filled if guests are selected
        if (guestCount > 0 && guestNames.length !== guestCount) {
            showValidationModal('Molimo unesite imena svih gostiju.');
            return;
        }

        const messageInput = document.getElementById('message');
        const message = messageInput ? messageInput.value.trim() : '';

        const formData = {
            firstName: 'Gost', // Default since we removed first name field
            lastName: `${guestCount} ${guestCount === 1 ? 'osoba' : 'osobe'}`, // Use guest count as last name
            guests: guestCount,
            guestNames: guestCount === 0 ? 'Nema gostiju' : guestNames.join(', '),
            message: message
        };

        // Disable submit button to prevent double submission
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        fetch('/api/submit-rsvp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            showThankYouModal();
            form.reset();
            guestNamesContainer.innerHTML = ''; // Clear dynamic inputs
            // Hide message field after reset
            document.getElementById('messageGroup').style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            showValidationModal('Došlo je do greške. Molimo pokušajte ponovno.');
        })
        .finally(() => {
            // Re-enable submit button
            submitButton.disabled = false;
        });
    });

    // Add floating label effect to the message textarea
    const messageInput = document.getElementById('message');
    if (messageInput) {
        messageInput.addEventListener('focus', () => {
            messageInput.parentElement.classList.add('focused');
        });

        messageInput.addEventListener('blur', () => {
            if (!messageInput.value) {
                messageInput.parentElement.classList.remove('focused');
            }
        });

        // Check initial state
        if (messageInput.value) {
            messageInput.parentElement.classList.add('focused');
        }
    }
});

// Thank You Modal Functions
function showThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    modal.classList.add('show');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeThankYouModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeThankYouModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

function closeThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    modal.classList.remove('show');
    
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
}

// Validation Modal Functions
function showValidationModal(message) {
    const modal = document.getElementById('validationModal');
    const messageElement = document.getElementById('validationMessage');
    messageElement.textContent = message;
    modal.classList.add('show');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeValidationModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeValidationModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

function closeValidationModal() {
    const modal = document.getElementById('validationModal');
    modal.classList.remove('show');
    
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
} 