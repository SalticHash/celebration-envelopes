const colorPickers = document.getElementById("colorPickers");
const removeColorMenu = document.getElementById("removeColorMenu");
let removeButtonTargetElement = null;
let amountOfColors = 4;

function openRemoveMenu(event, element) {
    event.preventDefault(); // Prevent the default right-click context menu

    removeButtonTargetElement = element;

    // Position the dropdown menu near the right-clicked input element
    let position = element.getBoundingClientRect();
    removeColorMenu.style.left = `${position.x + window.pageXOffset}px`;
    removeColorMenu.style.top = `${position.y + window.pageYOffset}px`;

    removeColorMenu.classList.add("show"); // Show the dropdown menu
};

function closeRemoveMenu() {
    removeColorMenu.classList.remove("show"); // Hide the dropdown menu
};

function removeColor() {
    if (amountOfColors <= 1) {
        return;
    }

    amountOfColors--;

    removeButtonTargetElement;
    colorPickers.removeChild(removeButtonTargetElement);
}

function addColor() {
    if (amountOfColors >= 6) {
        return;
    }

    amountOfColors++;

    let colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.name = "color";
    colorInput.className = "form-control form-control-color me-2";
    colorInput.addEventListener("contextmenu", (event) => openRemoveMenu(event, colorInput));

    colorPickers.appendChild(colorInput);
}

document.addEventListener("click", closeRemoveMenu);
document.addEventListener("contextmenu", (event) => event.preventDefault());