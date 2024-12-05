document.getElementById('taskForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });

        if (!response.ok) {
            const error = await response.json();
            document.getElementById('message').textContent = `Error: ${error.error}`;
            return;
        }

        const result = await response.json();
        document.getElementById('message').textContent = `Task created with ID: ${result.id}`;
    } catch (error) {
        document.getElementById('message').textContent = `Error: ${error.message}`;
    }

    // Clear the form
    document.getElementById('taskForm').reset();
});
