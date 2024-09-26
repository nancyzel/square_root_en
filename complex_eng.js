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

function sqrt_complex() {
    
    // Сбор данных с сайта

    let precision = document.querySelector("#precision").value;
    let real_num = document.querySelector("#real_num").value;
    let imagine_num = document.querySelector("#imagine_num").value;

    // Замена запятой в числе на точку (если такая есть)

    real_num = toPoint(real_num);
    imagine_num = toPoint(imagine_num);

    // Точность по умолчанию - 0 (если ничего не введено).

    if (precision === "") {
        precision = 0;
    }

    // Проверка на нечисловой ввод

    if (isNaN(real_num) || isNaN(imagine_num) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "Input error. No number or multiple numbers have been entered.";
        return;
    }
    
    // Проверка на пустой ввод

    if (real_num === "" || imagine_num === "") {
        document.querySelector(".name1").innerHTML = "Nothing has been entered. Try using numbers";
        return;
    }
        
    // Если в мнимой части ноль просим перейти на страничку для действительных чисел

    if (imagine_num == 0) {
        document.querySelector(".name1").innerHTML = "Zero in the imaginary part.\nI suggest you enter the same thing on the page for real numbers.";
        return;
    }

    // Проверка на большое число

    if (Math.abs(real_num) > 1e308 || Math.abs(imagine_num) > 1e308) {
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

    if (Math.abs(real_num) < 1e-100 && Math.abs(real_num) != 0 || Math.abs(imagine_num) < 1e-100 && Math.abs(imagine_num) != 0) {
        document.querySelector(".name1").innerHTML = "Error. The modulus of the entered number is less than 1e-100. Please enter a number whose modulus is greater than 1e-100 or 0.";
        return;
    }

    // Считаем корень из числа

    arg1 = Math.sqrt((Math.sqrt(Math.pow(real_num, 2) + Math.pow(imagine_num, 2))) / 2 + real_num / 2);
    arg2 = Math.sqrt((Math.sqrt(Math.pow(real_num, 2) + Math.pow(imagine_num, 2)) - real_num) / 2) * (imagine_num / Math.abs(imagine_num));

    let s = ((arg1 == arg1.toFixed(precision)) ? arg1 : round(arg1.toFixed(precision))) + ((arg2 > 0) ? " + " : " - ") + ((Math.abs(arg2) == 1) ? "" : ((Math.abs(arg2) == Math.abs(arg2).toFixed(precision)) ? Math.abs(arg2) : round(Math.abs(arg2).toFixed(precision)))) + "i";

    s = "(" + s + ") and -(" + s + ")";

    // Итоговый вывод с кучей условий

    document.querySelector(".name1").innerHTML = "The square root of the number (" + ((real_num != 0) ? real_num + ((imagine_num > 0) ? " + " : " - ") : ((imagine_num > 0) ? "" : "-")) + ((Math.abs(imagine_num) == 1) ? "" : Math.abs(imagine_num)) + "i) equal " + s + ".\nRounding accuracy is " + precision + " decimal places.";
}