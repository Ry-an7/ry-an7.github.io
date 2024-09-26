// https://www.w3schools.com/howto/howto_js_typewriter.asp
const text = "Hi! My name is Ryan Ng and I enjoy prototyping and creating user experiences through UI design. I am currently a third year undergraduate student studying in the Interactive Arts and Technology program at Simon Fraser University.";
let index = 0;
function typeWriter() {
    if (index < text.length) {
        document.getElementById("typed").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 25); // Adjust speed here
    }
}
window.onload = typeWriter;