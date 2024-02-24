document.addEventListener('DOMContentLoaded', function(){
    const elements = {
        addTime: document.getElementById('time__txt'),
        cancelBtn: document.getElementById('cancel_logic'),
        okBtn: document.getElementById('ok_logic'), // Corrected the method name
        todoForm: document.getElementById('form_wrapper'),
        setTimePopup: document.getElementById('setTimePopup'),
        hrId: document.getElementById('hr_id'),
        minId: document.getElementById('min_id')
    };
    
    elements.setTimePopup.style.display = 'none';
    elements.addTime.onclick = toggleDisplay.bind(null, 'block');
    elements.cancelBtn.onclick = toggleDisplay.bind(null, 'none');

    function toggleDisplay(displayStatus){
        elements.todoForm.style.display = displayStatus === 'none' ? 'block' : 'none';
        elements.setTimePopup.style.display = displayStatus;
    }

    // Event listener for 'ok_logic' button click
    elements.okBtn.addEventListener('click', function() {
        // Concatenate hr_id and min_id values with a colon ':'
        const timeValue = elements.hrId.textContent + ':' + elements.minId.textContent;
        // Update the text content of the 'time__txt' element with the combined value
        elements.addTime.textContent = timeValue;
        // Close the popup
        toggleDisplay('none');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const taskTitleInput = document.getElementById('task__title');
    const detailTextInput = document.getElementById('detail__txt');
    const addIcon = document.querySelector('.add__icon');
    const editIcon = document.querySelector('.edit__icon');
    const editButton = document.getElementById('edit__button');

    // Function to toggle the visibility of addIcon and editIcon
    function toggleIcons() {
        // Check if either input field has text
        if (taskTitleInput.value.trim() !== '' || detailTextInput.value.trim() !== '') {
            // If text is present, hide editIcon and show addIcon
            editIcon.style.display = 'none';
            addIcon.style.display = 'block';
        } else {
            // If no text is present, show editIcon and hide addIcon
            editIcon.style.display = 'block';
            addIcon.style.display = 'none';
        }
    }

    // Event listeners for input fields
    taskTitleInput.addEventListener('input', toggleIcons);
    detailTextInput.addEventListener('input', toggleIcons);

    // Initial call to toggleIcons to set initial visibility
    toggleIcons();

    // Event listener for edit button
    editButton.addEventListener('click', function() {
        // Show edit button and hide add icon when clicked
        editIcon.style.display = 'block';
        addIcon.style.display = 'none';
    });
});



// Function to toggle visibility of hour and minute selectors
function toggleSelectors(showHours) {
    if (showHours) {
        // Show hour selectors
        document.querySelectorAll('.hr_init, .hr-12').forEach(item => {
            item.style.display = 'block';
        });
        // Hide minute selectors
        document.querySelectorAll('.min-1').forEach(item => {
            item.style.display = 'none';
        });
    } else {
        // Hide hour selectors
        document.querySelectorAll('.hr_init, .hr-12').forEach(item => {
            item.style.display = 'none';
        });
        // Show minute selectors
        document.querySelectorAll('.min-1').forEach(item => {
            item.style.display = 'block';
        });
    }
}

// Initial setup to show hour selectors
toggleSelectors(true);

document.querySelectorAll('.hr_init span, .hr-12 span').forEach(item => {
    item.addEventListener('click', event => {
        const selectedSpan = event.target;
        document.querySelector('#active')?.removeAttribute('id');
        selectedSpan.id = 'active';
        document.getElementById('hr_id').textContent = selectedSpan.textContent;

        // Toggle visibility of selectors when hour is selected
        toggleSelectors(false);
    });
});

document.querySelectorAll('.min-1 span').forEach(item => {
    item.addEventListener('click', event => {
        const selectedSpan = event.target;
        document.querySelector('#active')?.removeAttribute('id');
        selectedSpan.id = 'active';
        document.getElementById('min_id').textContent = selectedSpan.textContent;

        // Toggle visibility of selectors when minute is selected
        toggleSelectors(true);
    });
});
