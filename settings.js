

// Get modal elements
const settingsbutton = document.getElementById("btn-settings");
const modal = document.getElementById("settings-modal");
const closebutton = document.getElementById("btn-close");


// Add an event listener
settingsbutton.addEventListener("click", toggleModal);
closebutton.addEventListener("click", toggleModal);
modal.addEventListener("click", event => {
    if (event.target.id == "settings-modal") {
        toggleModal();
    };
});


// Toggles display of modal
function toggleModal() {
        modal.classList.toggle('d-none');
}

