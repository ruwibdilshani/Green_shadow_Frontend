let text = "You Can Register from Here";
let index = 0;

function typeWriter() {
    const animatedText = document.getElementById("animatedText");
    animatedText.innerHTML = ''; // Clear previous text
    index = 0; // Reset index for new typing

    function type() {
        if (index < text.length) {
            animatedText.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 100); // Adjust speed of typing here (100ms)
        }
    }

    type();
}
