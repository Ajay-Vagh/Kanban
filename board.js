function updateEventListeners() {
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        item.addEventListener('dragstart', e => {
            item.classList.add('is-dragging');
        });

        item.addEventListener('dragend', e => {
            item.classList.remove('is-dragging');
        });
    });
}

const boards = document.querySelectorAll('.board');

boards.forEach(board => {
    board.addEventListener('dragover', (e) => {
        e.preventDefault();  // Prevent default to allow dropping
        const taskEl = document.querySelector('.is-dragging');
        
        // Find the closest element in the current board
        const closeElement = getClosestElement(board, e.clientY);
        
        if (closeElement) {
            board.insertBefore(taskEl, closeElement);
        } else {
            board.appendChild(taskEl);
        }
    });
});

function getClosestElement(board, yAxis) {
    const tasksInThisBoard = board.querySelectorAll('.item:not(.is-dragging)');
    
    let closeElement = null;
    let closestDistance = Number.NEGATIVE_INFINITY;

    tasksInThisBoard.forEach(task => {
        const boundary = task.getBoundingClientRect();
        const top = boundary.top;

        const distance = yAxis - top;

        if (distance < 0 && distance > closestDistance) {
            closestDistance = distance;
            closeElement = task;
        }
    });
    return closeElement;
}

// Call this function whenever new tasks are added
updateEventListeners();






// --------------------------------------------------------- 