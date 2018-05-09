var add = event => {
    if (event.keyCode === 13 && event.target.value !== "") {
        let li = document.createElement("li");
        li.innerHTML = `${event.target.value} <span>&times</span>`;
        li.querySelector('span').addEventListener("click", e => {
            e.target.parentNode.remove();
        });
        event.target.value = "";
        event.target.parentNode.insertBefore(li, event.target);
    }
};

var init = component => {
    let ul = document.createElement("ul");
    ul.classList += "pillbox";
    ul.innerHTML =
        '<input size="5" class="pillbox-input" type="text" name="" id="">';

    let input = ul.querySelector(".pillbox-input");

    input.resize();
    input.addEventListener("keypress", add);

    ul.addEventListener("click", e => {
        ul.querySelector(".pillbox-input").focus();
    });

    component.before(ul);
    component.style.display = "none";
    };

    HTMLSelectElement.prototype.PillBox = function() {
    init(this);
};
