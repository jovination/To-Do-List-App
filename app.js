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
