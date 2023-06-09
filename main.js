const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clear = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");

function updateMesssage() {
    const taskLength = tasks.children.length;

    messageSpan.textContent = `You have ${taskLength} pending tasks.`;
}

updateMesssage();

addForm.addEventListener("submit", evt => {
    evt.preventDefault();
    const value = addForm.task.value.trim();
    if (value.length) {
        tasks.innerHTML += `<li>
                                <span>${value}</span>
                                <i class="bi bi-trash-fill delete"></i>
                            </li>`;
        addForm.reset();
        updateMesssage();
    }
})

tasks.addEventListener("click", evt => {
    if (evt.target.classList.contains("delete")) {
        evt.target.parentElement.remove();
        updateMesssage();
    }
})

clear.addEventListener("click", evt => {
    const taskItems = tasks.querySelectorAll("li");
    taskItems.forEach(element => element.remove());
    updateMesssage();
})

function filterTask(term) {
    Array.from(tasks.children)
        .filter(task => {
            return !task.textContent.toLocaleLowerCase().includes(term);
        })
        .forEach(element => {
            element.classList.add("hide");
        });

    Array.from(tasks.children)
        .filter(task => {
            return task.textContent.toLocaleLowerCase().includes(term);
        })
        .forEach(element => {
            element.classList.remove("hide");
        });
}

searchForm.addEventListener("keyup", evt => {
    const term = searchForm.task.value.trim().toLocaleLowerCase();
    filterTask(term);
})

searchForm.addEventListener("click", evt => {
    if (evt.target.classList.contains("reset")) {
        searchForm.reset();
        const term = searchForm.task.value.trim();
        filterTask(term);
    }
})