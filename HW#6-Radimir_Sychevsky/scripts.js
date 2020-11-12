let Script = (function () {
    let input_text = document.querySelector('.todo__input-block__input-text');
    let add_item_button = document.querySelector('.todo__input-block__add-button');
    let todo_list = document.querySelector('.todo__list');
    let input_deadline = document.querySelector('.todo__input-block__input-date');
    let ready_filter = document.querySelector('.todo__filters__ready-or-not');
    let deadline_filter = document.querySelector('.todo__filters__deadline');

    function events() {
        add_item_button.addEventListener('click', add_item);
        ready_filter.addEventListener('change', ready_filter_changed);
        deadline_filter.addEventListener('change', deadline_filter_changed);
    }

    function add_item() {
        if (input_text.value.trim().length > 0) {
            let new_task = document.createElement('li');
            new_task.className = 'list-item visible in_progress';
            let task = document.createElement('b');
            task.textContent = input_text.value;
            input_text.value = '';
            task.className = 'list-item__text';
            let ready_button = document.createElement('input');
            ready_button.type = 'button';
            ready_button.className = 'ready_button in_progress';
            ready_button.value = '-';
            ready_button.addEventListener('click', ready_or_not);
            let deadline = document.createElement('b');
            deadline.className = 'list-item__deadline';
            deadline.textContent = input_deadline.value;
            let delete_button = document.createElement('input');
            delete_button.type = 'button';
            delete_button.className = 'delete-task_button';
            delete_button.value = 'delete';
            delete_button.addEventListener('click', delete_task);
            new_task.append(task, ready_button, deadline, delete_button);
            todo_list.appendChild(new_task);
        } else {
            alert('Wrong value!')
        }
    }

    function ready_or_not(event) {
        if (event.target.classList.contains('in_progress')) {
            event.target.classList.remove('in_progress');
            event.target.parentElement.classList.remove('in_progress');
            event.target.parentElement.classList.add('done');
            event.target.classList.add('done');
        } else {
            event.target.classList.remove('done');
            event.target.classList.add('in_progress');
            event.target.parentElement.classList.remove('done');
            event.target.parentElement.classList.add('in_progress');
        }
    }

    function delete_task(event) {
        event.target.parentElement.remove()
    }

    function ready_filter_changed() {
        switch (ready_filter.value) {
            case 'All tasks':
                for (let i = 0; i < todo_list.children.length; i++) {
                    let task = todo_list.children.item(i);
                    task.classList.remove('invisible');
                    task.classList.add('visible')
                }
                break;
            case 'In progress tasks':
                for (let i = 0; i < todo_list.children.length; i++) {
                    let task = todo_list.children.item(i);
                    if (task.classList.contains('done')) {
                        task.classList.add('invisible');
                        task.classList.remove('visible')
                    }
                    if (task.classList.contains('in_progress')) {
                        task.classList.remove('invisible');
                        task.classList.add('visible')
                    }
                }
                break;
            case 'Ready':
                for (let i = 0; i < todo_list.children.length; i++) {
                    let task = todo_list.children.item(i);
                    if (task.classList.contains('in_progress')) {
                        task.classList.add('invisible');
                        task.classList.remove('visible')
                    }
                    if (task.classList.contains('done')) {
                        task.classList.remove('invisible');
                        task.classList.add('visible')
                    }
                }
                break;
        }
    }

    function deadline_filter_changed() {
        switch (deadline_filter.value) {
            case 'All tasks':
                for (let i = 0; i < todo_list.children.length; i++) {
                    let task = todo_list.children.item(i);
                    task.classList.remove('invisible');
                    task.classList.add('visible')
                }
                break;
            case 'Tomorrow':
                for (let i = 0; i < todo_list.children.length; i++) {
                    let task = todo_list.children.item(i);
                    let date = new Date(task.children.item(2).textContent);
                    let tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    if (tomorrow.toDateString() === date.toDateString()) {
                        task.classList.remove('invisible');
                        task.classList.add('visible');
                    } else {
                        task.classList.add('invisible');
                        task.classList.remove('visible')
                    }
                }
                break;
            case 'Week':
                for (let i = 0; i < todo_list.children.length; i++) {
                    let task = todo_list.children.item(i);
                    let date = new Date(task.children.item(2).textContent);
                    let week_date = new Date();
                    for (let j = 1; j < 8; j++) {
                        week_date.setDate(week_date.getDate() + 1);
                        if (week_date.toDateString() === date.toDateString()) {
                            task.classList.remove('invisible');
                            task.classList.add('visible');
                            break;
                        } else {
                            task.classList.add('invisible');
                            task.classList.remove('visible')
                        }
                    }
                }
                break;
        }
    }
    return{
        init : function () {
            events();
        }
    }
})();
Script.init();