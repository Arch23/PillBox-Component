var test = () => {
    var allOptions = [];
    var selectDefaultHTML;
    var selectedOptions = [];
    var select;
    var input;

    var updateSelect = () => {
        Array.apply(null,select.options).forEach(el => {
            if(selectedOptions.find(inEl => el.text === inEl) != undefined){
                el.selected = true;
            }else{
                el.selected = false;
            }
        });
    };

    var toggle = event => {
        const option = allOptions.find(el => el.text.toLowerCase().includes(event.target.value.toLowerCase()));
        if (event.target.value !== '') {
            if(event.keyCode === 13 && option != undefined){
                createDelete(option.text);
                event.target.value = "";
            }else{
                while(select.firstChild){
                    select.removeChild(select.firstChild);
                }
                allOptions.filter(el=>el.text.toLowerCase().includes(event.target.value.toLowerCase())).forEach(el => select.appendChild(el));
                return;
            }
        }
        select.innerHTML = selectDefaultHTML;
        updateSelect();
    };

    var createDelete = option => {
        if(selectedOptions.find(el => el === option) === undefined){
            let li = document.createElement("li");
            li.innerHTML = `${option} <span>&times</span>`;
            li.querySelector('span').addEventListener("click", e => {
                createDelete(option);
                updateSelect();
            });
            input.parentNode.insertBefore(li, input);
            selectedOptions.push(option);
        }else{
            selectedOptions.splice(selectedOptions.indexOf(option),1);
            select.parentNode.querySelectorAll('li').forEach(el=>{
                if(el.innerHTML.includes(option)){
                    select.parentNode.removeChild(el);
                }
            });
        }
    };

    var selectClick = (event) => {
        event.preventDefault();
        createDelete(event.target.text);
        updateSelect();
    };

    return{
        init : (select2) => {
            select = select2;
            let ul = document.createElement("ul");
            ul.classList += "pillbox";
            ul.innerHTML =
                '<input size="5" class="pillbox-input" type="text" name="" id="">';
    
            input = ul.querySelector(".pillbox-input");
        
            input.resize();
            input.addEventListener("keyup", toggle);
    
            ul.addEventListener("click", e => {
                ul.querySelector(".pillbox-input").focus();
            });
    
            select.addEventListener('mousedown', selectClick);
    
            select.before(ul);
            ul.appendChild(select);
            select.classList += "pillbox-options";
    
            for(let i=0;i<select.length;i++){
                allOptions.push(select.options[i]);
            }
            selectDefaultHTML = select.innerHTML;
        },

        getSelected: () => {
            return selectedOptions;
        },

        clear: () => {
            selectedOptions = [];
            updateSelect();
        }
    };
}

HTMLSelectElement.prototype.PillBox = function() {
    test().init(this);
};


