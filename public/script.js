
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
    const timeAddInput = document.getElementById('time__txt');

    const addIcon = document.querySelector('.add__icon');
    const editIcon = document.querySelector('.edit__icon');
    const editButton = document.getElementById('edit__button');
    const ulElements = document.querySelector('.todo_list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    addIcon.addEventListener('click', function(event) {
        event.preventDefault();
        
        const task_title = taskTitleInput.value;
        const task_detail = detailTextInput.value;
        const task_time = timeAddInput.value;

        if (task_title.trim() === '' || task_detail.trim() === ''){
            return;
        }

        const task = {
            id: new Date().getTime(),
            title: task_title,
            detail: task_detail,
            time: `${document.getElementById('hr_id').textContent}:${document.getElementById('min_id').textContent}`,
            completed: false
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        createTask(task);
        
        // Clear input fields after adding task
        taskTitleInput.value = '';
        detailTextInput.value = '';
        timeAddInput.value = '';

        taskTitleInput.focus(); // Optionally focus on the title input field

        toggleIcons();
     });

    function createTask(task) {
        const taskList = document.createElement('li');

        taskList.setAttribute = ( 'id', task.id);

        const tasklistMockup = `
        <div class="task" id=${task.id}>
            <div class="task__wrapper">
                <div class="r__title">
                    <span class="task__title">${task.title}</span>
                </div>
                <div class="r__details">
                    <span class="task__details">${task.detail}</span>
                </div>
                <div class="r__time">
                    <img class="clock__icon" src="/assets/icons/clock.svg" alt="">
                    <span class="task__time">${task.time}</span>
                </div>
            </div>

            <div class="check__wrapper">
                <input type="checkbox" name="tasks" id="complete">
            </div>
        </div>
        `;

        taskList.innerHTML = tasklistMockup;
        ulElements.appendChild(taskList);
    }

    function toggleIcons() {
        const isTextPresent = taskTitleInput.value.trim() !== '' || detailTextInput.value.trim() !== '';
        editIcon.style.display = isTextPresent ? 'none' : 'block';
        addIcon.style.display = isTextPresent ? 'block' : 'none';
    }

    taskTitleInput.addEventListener('input', toggleIcons);
    detailTextInput.addEventListener('input', toggleIcons);
    toggleIcons();

    editButton.addEventListener('click', function() {
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
// Cache DOM elements
document.addEventListener('DOMContentLoaded', function() {
    const signBtn = document.querySelector('.sign_btn');
    const btnHero = document.querySelector('.btn_hero');
    const signUi = document.querySelector('.sign_ui');
    const popup = document.getElementById('popup_auth');

      // Function to show popup and apply transform classes
      function showPopup() {
        popup.style.opacity = '0';
        popup.style.display = 'block';
        setTimeout(function() {
            popup.style.opacity = '1';
        }, 50);
        signUi.classList.remove('transform-out');
        signUi.classList.add('transform-in');
    }

    // Function to hide popup and apply transform classes
    function hidePopup() {
        popup.style.opacity = '0';
        popup.style.display = 'none';
        setTimeout(function() {
            popup.style.display = 'none';
        }, 500);
        signUi.classList.remove('transform-in');
        signUi.classList.add('transform-out');
    }

    // Event listener for sign-in button
    if (signBtn) {
        signBtn.addEventListener('click', showPopup);
    }

    // Event listener for hero button
    if (btnHero) {
        btnHero.addEventListener('click', showPopup);
    }

    document.getElementById('popup_auth').addEventListener('click', function(event) {
        const popup = document.getElementById('popup_auth');
        const authWrap = document.querySelector('.auth_wrap');
        const signUi = document.querySelector('.sign_ui');
        const isClickInsideAuthWrap = authWrap.contains(event.target);
        const isClickOnSignUi = signUi.contains(event.target);
    
        if (!isClickOnSignUi && isClickInsideAuthWrap){
            popup.style.display = 'none';
            signUi.classList.remove('transform-in');
            signUi.classList.add('transform-out');
            hidePopup();
        }
         else {
            popup.style.display = 'block';
        }
    });
});




// script.js

// Get references to the login and logout buttons
const loginButton = document.getElementById('login');
const logoutButton = document.getElementById('logout');

// Add click event listener for the login button
if (loginButton) {
    loginButton.addEventListener('click', function() {
        // Redirect the user to the Google OAuth authentication route when they click the login button
        window.location.href = '/auth/google';
    });
}

// Add click event listener for the logout button
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        // Redirect the user to the homepage when they click the logout button
        window.location.href = '/';
    });
   
}
document.addEventListener('DOMContentLoaded', function() {
    const btnHero = document.querySelector('.btn_hero_1');
    const leftCol = document.querySelector('.left__col');
    const leftCol1 = document.querySelector('.left_col_1');
    const addBtn = document.querySelector('.button__wrapper');
 
      leftCol.style.display = 'none';
      addBtn.style.display = 'none';
    // Check if the elements exist on the page
    if (btnHero && leftCol && leftCol1 && addBtn) {
        btnHero.addEventListener('click', function() {
            leftCol.setAttribute('style', '/* display: block; */');
            addBtn.setAttribute('style', '/* display: block; */');
            leftCol1.style.display = 'none';
        });
        
    }
});

document.getElementById('google-auth-btn').addEventListener('click', function() {
    // Get the value entered by the user
    const userEmail = document.getElementById('gmail_id').value;

    // Redirect the user to Google authentication with the email information
    window.location.href = '/auth/google?email=' + encodeURIComponent(userEmail);
});



