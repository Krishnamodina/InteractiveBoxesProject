// Select all boxes, radios, and total price element
const boxes = document.querySelectorAll('.box');
const radios = document.querySelectorAll('.product-radio');
const totalPriceElement = document.querySelector('.total-price');

// Function to update total price
function updateTotalPrice(selectedBox) {
    if (selectedBox) {
        const radio = selectedBox.querySelector('.product-radio');
        const originalPrice = parseFloat(radio.getAttribute('data-price'));
        const discountPercentage = parseFloat(radio.getAttribute('data-discount')) / 100;
        const discountedPrice = originalPrice * (1 - discountPercentage);
        totalPriceElement.textContent = `Total: ₹${discountedPrice.toFixed(0)}`;
        totalPriceElement.style.display = 'block';
    } else {
        totalPriceElement.textContent = 'Total: ₹0';
        totalPriceElement.style.display = 'none';
    }
}

// Event listener for box clicks
boxes.forEach(box => {
    const header = box.querySelector('.box-header');
    const radio = box.querySelector('.product-radio');

    header.addEventListener('click', (e) => {
        const isActive = box.classList.contains('active');
        boxes.forEach(otherBox => otherBox.classList.remove('active'));
        if (!isActive) {
            box.classList.add('active');
            radio.checked = true; // Auto-select radio
            updateTotalPrice(box);
        } else {
            radio.checked = false;
            updateTotalPrice(null);
        }
    });

    // Prevent dropdown clicks from closing the box
    const dropdowns = box.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});

// Initial state
updateTotalPrice(null);