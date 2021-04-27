const calculator = function() {

    const calc = document.querySelector('.calculator-grid');

    const prevOper = calc.querySelector('.previous-operand');
    const curOper = calc.querySelector('.current-operand');

    const buttons = calc.querySelectorAll('button');

    let oper,
        a,
        b,
        result;

    const action = function(){

        if (this.hasAttribute('data-all-clear')) clear();

        if (this.hasAttribute('data-delete')) delet();

        if (this.innerHTML == '-' && curOper.innerHTML == '') curOper.innerHTML = '-';

        if (this.hasAttribute('data-number') && result == undefined) {

            if (this.innerHTML == '.' && curOper.innerHTML == '' && curOper.innerHTML != '-') curOper.innerHTML ='0.';

            if (this.innerHTML == '.' &&
                curOper.innerHTML != '' &&
                curOper.innerHTML.indexOf('.') == -1) curOper.innerHTML += this.innerHTML;

            if (this.innerHTML != '.') curOper.innerHTML += this.innerHTML;
        }

        if (this.hasAttribute('data-number') && result != undefined) {
            prevOper.innerHTML = '';
            curOper.innerHTML = this.innerHTML;
                
            a = undefined;
            b = undefined;
            oper = undefined;
            result = undefined; 
        }

        if (curOper.innerHTML == '' || isNaN(curOper.innerHTML)) return;

        if (this.hasAttribute('data-equals') && result != undefined) return;

        if (this.hasAttribute('data-operation') || this.hasAttribute('data-equals')) {

            if (result != undefined) {
                prevOper.innerHTML = '';
                
                a = undefined;
                b = undefined;
                oper = undefined;
                result = undefined;
            }

            let number = parseFloat(curOper.innerHTML);

            if (a == undefined && oper == undefined) {
                a = number;                
            } else {
                b = number;
            }

            prevOper.innerHTML += curOper.innerHTML + this.innerHTML;

            if (oper == undefined) {
                oper = this.innerHTML;
                curOper.innerHTML = '';

                if (oper == '√x' && a != undefined) {
                    result = Math.sqrt(a);

                    oper == undefined;
                }
            } else {
                console.log('g');
                switch (oper) {
                case '+':
                    result = a + b;
                break;
                case '-':
                    result = a - b;
                break;
                case '*':
                    result = a * b;
                break;
                case '÷':
                    result = a / b;
                break;
                case '<em>x²</em>':
                    result = Math.pow(a, b);
                break;
                }
            }
            if (!isNaN(result)) {

                if (!Number.isInteger(result)) {
                    result = String(result.toFixed(2));

                    if (result[result.length-1] == '0') result.slice(0, -1);
                    result = parseFloat(result);
                }

                curOper.innerHTML = result;
            }
        }

        console.log(a, oper, b, result);
    };

    const clear = function(){
        prevOper.innerHTML = '';
        curOper.innerHTML = '';
                
        a = undefined;
        b = undefined;
        oper = undefined;
        result = undefined;
    };

    const delet  = function(){
        curOper.innerHTML = curOper.innerHTML.slice(0, -1);
    };

    buttons.forEach(function(button) {
        button.addEventListener('click', action);
    });
};

window.addEventListener('load', calculator);