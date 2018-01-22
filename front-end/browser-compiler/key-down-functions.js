var keyFunctions = {
    keydownTab: function () {
        var ele = jQ.get('code_compiler-textarea');
        var preValue = jQ.get('code_compiler-textarea', 'value');
        var tmp = this.judgeTabValue();

        // reset cursor
        jQ.set('code_compiler-textarea', 'value', tmp.Value);
        ele.selectionStart = tmp.PosStart;
        ele.selectionEnd = tmp.PosEnd;
    },
    judgeTabValue: function () {
        var ele = jQ.get('code_compiler-textarea');
        var value = jQ.get('code_compiler-textarea', 'value');

        var insertValue = function insertValue(val, start, end) {
            return value.slice(0, null === start ? ele.selectionStart : start) + val + value.slice(null === end ? ele.selectionEnd : end);
        };
        var contains = function contains(str, val) {
            return -1 !== str.indexOf(val);
        };
        var getValue = function getValue(val) {
            var index = ele.selectionStart;
            if (index !== ele.selectionEnd) {
                return '';
            }
            var value = val.slice(0, index);

            var endIndex1 = value.lastIndexOf('\n');
            var endIndex2 = value.lastIndexOf(' ');
            var endIndex = Math.max(endIndex1, endIndex2);

            return -1 === endIndex ? value : value.slice(endIndex + 1);
        };

        var val = getValue(value);
        var posStart = 0;
        var posEnd = 0;
        var start = null;
        var end = null;

        switch (val) {
            case 'fun':
                start = ele.selectionStart - 3;
                posStart = ele.selectionStart + 6;
                posEnd = posStart + 12;
                val = 'function functionName() {\n    \n}';
                break;
            case 'func':
                start = ele.selectionStart - 4;
                posStart = ele.selectionStart + 4;
                posEnd = posStart;
                val = 'function';
                break;
            case 'for':
                start = ele.selectionStart - 3;
                posStart = ele.selectionStart + 17;
                posEnd = posStart + 5;
                val = 'for (let i = 0; i < array.length; i++) {\n    \n}';
                break;
            case 'forin':
                start = ele.selectionStart - 5;
                posStart = ele.selectionStart + 77;
                posEnd = posStart;
                val = 'for (var variable in object) {\n    if (object.hasOwnProperty(variable)) {\n        \n    }\n}';
                break;
            case 'forof':
                start = ele.selectionStart - 5;
                posStart = ele.selectionStart;
                posEnd = posStart + 8;
                val = 'for (variable of iterable) {\n    \n}';
                break;
            case 'sw':
            case 'swi':
            case 'swit':
            case 'switc':
            case 'switch':
                start = ele.selectionStart - val.length;
                posStart = ele.selectionStart - val.length + 8;
                posEnd = posStart + 10;
                val = 'switch (expression) {\n    case :\n        \n        break;\n    default:\n        \n        break;\n}';
                break;
            default:
                posStart = ele.selectionStart + 4;
                posEnd = posStart;
                val = '    ';
                break;
        }

        value = insertValue(val, start, end);

        return {
            PosStart: posStart,
            PosEnd: posEnd,
            Value: value
        };
    },
};
