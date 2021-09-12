

// Get modal elements
const settingsbutton = document.getElementById("btn-settings");
const modal = document.getElementById("settings-modal");

// Add an event listener
settingsbutton.addEventListener("click", openModal)

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function openModal() {
    modal.classList.toggle('d-none')
}