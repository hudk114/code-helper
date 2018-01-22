var myConsole = (function () {
    _console = window.console;
    return {
        log: function (val) {
            _console && _console.log(val);
        },
        warn: function (val) {
            _console && _console.warn(val);
        },
        error: function (val) {
            _console && _console.error(val);
        }
    };
})(window);

var jQ = (function (document) {
    return {
        bind: function (id, eventName, fn) {
            var ele = document.getElementById(id);
            if (ele) {
                ele.addEventListener(eventName, fn);
            }
        },
        get: function (id, attribute) {
            var ele = document.getElementById(id);
            return attribute ? (ele ? ele[attribute] : null) : ele;
            // return ele ? ele[attribute] : null;
        },
        set: function (id, attribute, value) {
            var ele = document.getElementById(id);
            if (ele) {
                ele[attribute] = value;
            }
        }
    };
})(document);

window.onload = function () {
    eventBind();
};

var eventBind = function eventBind() {
    jQ.bind('code_compiler-button', 'click', compilerButtonClick);
    jQ.bind('code_clear-button', 'click', compilerClearButtonClick);
    jQ.bind('code_compiler-textarea', 'keyup', compilerTextareaKeyUp);
    jQ.bind('code_compiler-textarea', 'keydown', compilerTextareaKeyDown);
    jQ.bind('console_clear-button', 'click', consoleClearButtonClick);

};

var append = function append(val) {
    var value = jQ.get('code_console-textarea', 'value');
    if (value) {
        value += '\n';
    }
    value += val;
    jQ.set('code_console-textarea', 'value', value);
};

var compilerButtonClick = function compilerButtonClick(event) {
    var str = jQ.get('code_compiler-textarea', 'value');

    console.log(strReplace(str));
    var result = '';
    try {
        result = 'Output: ' + eval(strReplace(str));
    } catch (e) {
        result = 'Error: ' + e;
    } finally {
        append(result);
    }
};

var compilerClearButtonClick = function compilerClearButtonClick(event) {
    jQ.set('code_compiler-textarea', 'value', '');
};

var compilerTextareaKeyUp = function compilerTextareaKeyUp(event) {
    // console.log(event.keyCode);

    // myConsole.log(event.keyCode);
};

var compilerTextareaKeyDown = function compilerTextareaKeyDown(event) {
    switch (event.keyCode) {
        case 9:
            keyFunctions.keydownTab();
            event.preventDefault();
            break;
        case 13:
            consoleClearButtonClick();
            compilerButtonClick();
            break;
        default:
            break;
    }
};

var compilerConsole = {
    log: function (val) {
        append(val);
    },
    warn: function () {

    },
    error: function () {

    },
}

var consoleClearButtonClick = function consoleClearButtonClick(event) {
    jQ.set('console_compiler-textarea', 'value', '');
};

var strReplace = function strReplace(str) {
    // TODO 字符串中的不需要替换
    var pattern = /console/g;

    return str.replace(pattern, 'compilerConsole');
};
