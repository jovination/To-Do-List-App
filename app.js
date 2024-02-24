document.addEventListener('DOMContentLoaded', function(){
    const elements = {
        addTime: document.getElementById('time__txt'),
        cancelBtn: document.getElementById('cancel_logic'),
        todoForm: document.getElementById('form_wrapper'),
        setTimePopup: document.getElementById('setTimePopup'),
    };
    
    elements.setTimePopup.style.display = 'none';
    elements.addTime.onclick = toggleDisplay.bind(null, 'block');
    elements.cancelBtn.onclick = toggleDisplay.bind(null, 'none');

    function toggleDisplay(displayStatus){
        elements.todoForm.style.display = displayStatus === 'none' ? 'block' : 'none';
        elements.setTimePopup.style.display = displayStatus;
    }
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
