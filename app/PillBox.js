var allOptions = [];
var selectDefault;
var selectedOptions = [];
var select;

var updateSelect = () => {
    
};

var add = event => {
    const exists = allOptions.findIndex(el => el.text.toLowerCase().includes(event.target.value.toLowerCase()));
    if (event.target.value !== '') {
        if(event.keyCode === 13 && exists != -1){
            let li = document.createElement("li");
            li.innerHTML = `${allOptions[exists].text} <span>&times</span>`;
            li.querySelector('span').addEventListener("click", e => {
                e.target.parentNode.remove();
            });
            event.target.value = "";
            event.target.parentNode.insertBefore(li, event.target);
            selectedOptions.push(allOptions[exists].text);
            updateSelect();
        }else{
            while(select.firstChild){
                select.removeChild(select.firstChild);
            }
            allOptions.filter(el=>el.text.toLowerCase().includes(event.target.value.toLowerCase())).forEach(el => select.appendChild(el));
            return;
        }
    }
    select.innerHTML = selectDefault;
};

var init = () => {
    let ul = document.createElement("ul");
    ul.classList += "pillbox";
    ul.innerHTML =
        '<input size="5" class="pillbox-input" type="text" name="" id="">';

    let input = ul.querySelector(".pillbox-input");

    input.resize();
    input.addEventListener("keyup", add);
    /* input.addEventListener('focus',(e) => {
        select.style.display = 'block';
    })
    input.addEventListener('focusout',e => {
        select.style.display = 'none';
    }); */

    ul.addEventListener("click", e => {
        ul.querySelector(".pillbox-input").focus();
    });

    select.before(ul);
    ul.appendChild(select);
    select.classList += "pillbox-options";

    for(let i=0;i<select.length;i++){
        allOptions.push(select.options[i]);
    }
    selectDefault = select.innerHTML;
};

HTMLSelectElement.prototype.PillBox = function() {
    select = this;
    init();
};
