// Simple interactive script for the website
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    header.addEventListener('click', function() {
        alert('Hello, welcome to my personal website!');
    });
});


document.getElementById("musicBar").addEventListener("click", displayMusic);



function displayMusic() {
    alert('4 hours and 30 minutes');
}