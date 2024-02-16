
document.addEventListener('DOMContentLoaded', function(){
    const addTime = document.getElementById('time__txt');
    const cancelBtn = document.getElementById('cancel_logic');
    const todoForm = document.getElementById('form_wrapper');
    const setTimePopup = document.getElementById('setTimePopup');
    
    
    setTimePopup.style.display = 'none';
    addTime.onclick = () => setTime();
    cancelBtn.onclick = () => cancelSetTime();

    function setTime(){
        todoForm.style.display = 'none';
        setTimePopup.style.display = 'block';
    }
    function cancelSetTime(){
        todoForm.style.display = 'block';
        setTimePopup.style.display = 'none';
    }
    });

    document.querySelectorAll('.hr_init span, .hr-12 span').forEach(item => {
        item.addEventListener('click', event => {
            const selectedSpan = event.target;
            const selectedValue = selectedSpan.textContent;
            document.getElementById('active').removeAttribute('id');
            selectedSpan.setAttribute('id', 'active');
            document.getElementById('hr_id').textContent = selectedValue;
        });
    });
   