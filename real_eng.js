// Функция для удаления незначащих нулей

function round(str) {
    ind = str.length;
    while (str[ind - 1] == '0') ind--;
    if (str[ind - 1] == '.') return str.substring(0, ind - 1);
    return str.substring(0, ind);
}

// Функция для замены запятой в записи числа на точку (если такая есть)

function toPoint(str) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] == ",") {
            return str.substring(0, i) + "." + str.substring(i + 1);
        }
    }
    return str;
}

// Главная функция

function sqrt_real() {
    
    // Сбор данных с сайта

    let arithm = document.querySelector("#flag").checked;
    let precision = document.querySelector("#precision").value;
    let num = document.querySelector("#data").value;

    // Замена запятой в числе на точку (если такая есть)

    num = toPoint(num);

    // Обработка числа пи

    if (String(num).slice(-2) === "pi") {
        num = String(num).slice(0, -2);
        if (num == "") {
            num = Math.PI;
        }
        else if (num == "-") {
            num = -Math.PI;
        }
        else if (isNaN(num)) {
            document.querySelector(".name1").innerHTML = "Input error. No number or multiple numbers have been entered.";
            return;
        }
        else {
            num = num * Math.PI;
        }
    }
    
    // Обработка чиса e

    if (String(num).slice(-1) === "e") {
        num = String(num).slice(0, -1);
        if (num == "") {
            num = Math.E;
        }
        else if (num == "-") {
            num = -Math.E;
        }
        else if (isNaN(num)) {
            document.querySelector(".name1").innerHTML = "Input error. No number or multiple numbers have been entered.";
            return;
        }
        else {
            num = num * Math.E;
        }
    }

    // Точность по умолчанию - 0 (если ничего не введено).

    if (precision === "") {
        precision = 0;
    }

    // Проверка на нечисловой ввод

    if (isNaN(num) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "Input error. No number or multiple numbers have been entered.";
        return;
    }
    
    // Проверка на пустой ввод

    if (num === "") {
        document.querySelector(".name1").innerHTML = "Nothing has been entered. Try using numbers";
        return;
    }
    
    // Обработка корня из нуля

    if (num == 0) {
        document.querySelector(".name1").innerHTML = ((arithm) ? "Arithmetic " : "Algebraic ") + "the square root of the number 0 is 0.\nRounding accuracy is " + precision + " decimal places.";
        return;
    }

    
    // Проверка на большое число

    if (Math.abs(num) > 1e308) {
        document.querySelector(".name1").innerHTML = "The number entered is too large. Please enter a number whose module is less than 1e308.";
        return;
    }

    // Проверка на нецелую точность

    if (precision != Math.floor(precision)) {
        document.querySelector(".name1").innerHTML = "Non-integer precision has been entered. Please enter an integer.";
        return;
    }

    // Проверка на отрицательную точность

    if (precision < 0) {
        document.querySelector(".name1").innerHTML = "Negative precision has been entered. Please enter a number from 0 to 16.";
        return;
    }

    // Проверка на слишком большую точность

    if (precision > 16) {
        document.querySelector(".name1").innerHTML = "Too much precision has been entered. Please enter a number from 0 to 16.";
        return;
    }

    // Проверка на слишком маленький модуль числа

    if (Math.abs(num) < 1e-100 && Math.abs(num) != 0) {
        document.querySelector(".name1").innerHTML = "Error. The modulus of the entered number is less than 1e-100. Please enter a number whose modulus is greater than 1e-100 or 0.";
        return;
    }
    
    // Проверка на отрицательное число

    let neg = false;

    if (num < 0) {
        
        // Если корень арифметический - выводим ошибку

        if (arithm) {
            document.querySelector(".name1").innerHTML = "There are no solutions in real numbers";
            return;
        }
        neg = true;
        num = - num;
    }

    // Считаем корень из числа

    sqr = Math.sqrt(num);
    let s = (sqr == sqr.toFixed(precision)) ? sqr : round(sqr.toFixed(precision));

    // Если num отрицательный - добавляем к записи числа i

    if (neg) {
        if (sqr == 1) s = "i";
        else s += "i";
    }

    // Если корень алгебраический - выводим два корня

    if (!arithm) {
        s = s + " and -" + s;
    }

    s += "."

    // Итоговый вывод с кучей условий

    document.querySelector(".name1").innerHTML = ((arithm) ? "Arithmetic " : "Algebraic ") + "the square root of the number " + ((neg) ? "-" : "") + num + " equal " + s + "\nRounding accuracy is " + precision + " decimal places.";
    
}