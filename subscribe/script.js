
let button = document.querySelector("button");

function subscribe() {
    if (button.innerText === "Subscribe") {
        button.innerText = "Subscribed";
        button.classList.add("subscribed");
    } else {
        button.innerText = "Subscribe";
        button.classList.remove("subscribed");
    }
}
