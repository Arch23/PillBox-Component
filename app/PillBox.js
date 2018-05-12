var pillbox = () => {
    var HTML_select;
    var HTML_input;
    var HTML_pillbox;
    var HTML_menu;
    var optionsArray = {};
    var selectedOptions = [];
    var noGroupToken = 'noGroup';

    var createHTML = (info) => {
        let node = document.createElement(info[0]);
        info[1].forEach(c => node.classList.add(c));
        node.innerHTML = info[2];
        return node;
    };

    var optionExist = (value) => {
        for(let group in optionsArray){
            let tmp = optionsArray[group];
            for(let i=0;i<tmp.length;i++){
                if(tmp[i].toLowerCase().includes(value.toLowerCase())){
                    return tmp[i];
                }
            }
        };
        return undefined;
    };

    var requestPill = (value) => {
        let option = optionExist(value);
        if(option !== undefined){
            if(selectedOptions.find(el => el===option) === undefined){
                let HTML_pill = createHTML(pill(option));
                HTML_pill.querySelector('span').addEventListener('click',e => requestPill(option));
                HTML_input.before(HTML_pill);
                selectedOptions.push(option);
            }else{
                HTML_pillbox.querySelectorAll('.pill p').forEach(p => {
                    if(p.innerHTML === option){
                        p.parentNode.remove();
                        selectedOptions.splice(selectedOptions.indexOf(option),1);
                    }
                });
            }
            setMenuOptions(optionsArray);
            updateMenu();
            HTML_input.value = "";
        }
    };

    var filter = (value) => {
        if(value === ''){
            return optionsArray;
        }
        let results = {};
        results[noGroupToken] = [];
        for(let group in optionsArray){
            
            results[noGroupToken].push(...optionsArray[group].filter(option=>option.toLowerCase().includes(value.toLowerCase())));
        };
        return results;
    }

    var updateMenu = () => {
        HTML_menu.querySelectorAll('.option').forEach(HTML_div => HTML_div.classList.remove('selected'));
        selectedOptions.forEach(option => {
            let HTML_option = [...HTML_menu.querySelectorAll('.option')].find(HTML_div => HTML_div.innerHTML === option);
            if(HTML_option !== undefined){
                HTML_option.classList.add('selected')
            }
            
        });
        [...HTML_select.options].forEach(el => {
            if(selectedOptions.find(inEl => el.text === inEl) != undefined){
                el.selected = true;
            }else{
                el.selected = false;
            }
        });
    };

    const pillbox = () => ['ul',['pillbox'],`<input size="5" class="pillbox-input" type="text">`];

    const pill = (text) => ['li',['pill'],`<p>${text}</p> <span>&times</span>`];

    const menu = () => ['div',['pillbox-options'],''];

    const menuOption = (text,isInGroup) => ['div',isInGroup?['option','Goption']:['option','NGoption'],`${text}`];

    const menuGroup = (name) => ['div',['group'],`${name}`];

    var getOptions = () => {
        let optgroups = HTML_select.querySelectorAll('optgroup');
        let options = HTML_select.querySelectorAll('option');

        optgroups.forEach(el => {
            optionsArray[el.label] = [];
        });

        options.forEach(el => {
            if(Array.prototype.find.call(optgroups,(elIn)=> el.parentNode.label === elIn.label) !== undefined){
                optionsArray[el.parentNode.label].push(el.text);
            }else{
                if(optionsArray[noGroupToken] === undefined){
                    optionsArray[noGroupToken] = [];
                }
                optionsArray[noGroupToken].push(el.text);
            }
        });
    }

    var setMenuOptions = (options) => {
        while(HTML_menu.firstChild){
            HTML_menu.removeChild(HTML_menu.firstChild);
        }
        if(options.length !== 0){
            for(let name in options){
                let isInGroup;
                if(name === noGroupToken){
                    isInGroup = false;
                }else{
                    HTML_menu.appendChild(createHTML(menuGroup(name)));
                    isInGroup = true;
                }
                options[name].forEach(option => HTML_menu.appendChild(createHTML(menuOption(option,isInGroup))));
            }
        }
        updateMenu();
    }

    var setUpHTML = () => {
        //create pillbox
        HTML_pillbox = createHTML(pillbox());

        //setup input
        HTML_input = HTML_pillbox.querySelector('input');
        HTML_input.resize();

        //create options-menu
        HTML_menu = createHTML(menu());
        setMenuOptions(optionsArray);

        //rearange html elements
        HTML_select.before(HTML_pillbox);
        HTML_pillbox.appendChild(HTML_select);
        HTML_pillbox.appendChild(HTML_menu);
        HTML_select.classList.add('pillbox-select');
    };

    /* Listeners functions */
    var inputFocusRequest = e => HTML_input.focus();

    var inputProcess = e => {
        let key = e.keyCode;
        switch(key){
            case(13):{
                requestPill(e.target.value);
                break;
            }
            default:
                setMenuOptions(filter(e.target.value));
        }
    }

    var clickProcess = e => {
        requestPill(e.target.innerHTML);
    }

    var inputMenuOpen = e => {
        if(!HTML_menu.classList.contains('show')){
            HTML_menu.classList.add('show');
        }
    };

    var inputMenuClose = e => {
        HTML_menu.classList.remove('show');
    };

    var setUpListeners = () => {
        HTML_pillbox.addEventListener('click',inputFocusRequest);

        HTML_input.addEventListener('keyup',inputProcess);

        HTML_menu.addEventListener('click',clickProcess);

        HTML_input.addEventListener('focus',inputMenuOpen);

        HTML_input.addEventListener('focusout',inputMenuClose);
    }

    return{
        init : (select) => {
            HTML_select = select;
            getOptions();
            setUpHTML();
            setUpListeners();
        },

        getSelected: () => {
            return selectedOptions;
        },

        clear: () => {
            selectedOptions = [];
            updateMenu();
            setMenuOptions();
        }
    };
}

HTMLSelectElement.prototype.PillBox = function() {
    pillbox().init(this);
};


