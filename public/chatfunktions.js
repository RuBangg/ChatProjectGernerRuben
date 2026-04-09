console.log("chatfunktions.js loaded");

document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async () => {
        console.log("clicked");
        const messageId = button.dataset.messageId;
        console.log("Deleting:", messageId);
        const res = await fetch(`/chats/${messageId}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            button.parentElement.remove(); 
        }
    });
});