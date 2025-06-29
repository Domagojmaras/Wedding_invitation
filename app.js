document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rsvpForm');
    const guestsSelect = document.getElementById('guests');
    const guestNamesInput = document.getElementById('guestNames');

    // Handle guest count change
    guestsSelect.addEventListener('change', () => {
        const guestCount = parseInt(guestsSelect.value);
        if (guestCount === 0) {
            guestNamesInput.removeAttribute('required');
            guestNamesInput.placeholder = 'Nema gostiju';
        } else {
            guestNamesInput.setAttribute('required', 'required');
            guestNamesInput.placeholder = 'Unesite imena gostiju';
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const guestCount = parseInt(guestsSelect.value);
        const guestNames = guestNamesInput.value.trim();

        // Validate guest names if guests are selected
        if (guestCount > 0 && !guestNames) {
            alert('Molimo unesite imena gostiju.');
            guestNamesInput.focus();
            return;
        }

        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            guests: guestsSelect.value,
            guestNames: guestCount === 0 ? 'Nema gostiju' : guestNames
        };

        // Disable submit button to prevent double submission
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        fetch('/submit-rsvp', {
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
            alert('Hvala na potvrdi dolaska!');
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Došlo je do greške. Molimo pokušajte ponovno.');
        })
        .finally(() => {
            // Re-enable submit button
            submitButton.disabled = false;
        });
    });

    // Add floating label effect
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Check initial state
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}); 