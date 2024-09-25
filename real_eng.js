function round(str) {
    ind = str.length;
    while (str[ind - 1] == '0') ind--;
    if (str[ind - 1] == '.') return str.substring(0, ind - 1);
    return str.substring(0, ind);
}

function toPoint(str) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] == ",") {
            return str.substring(0, i) + "." + str.substring(i + 1);
        }
    }
    return str;
}

function sqrt_real() {
    
    let arithm = document.querySelector("#flag").checked;
    let precision = document.querySelector("#precision").value;
    let num = document.querySelector("#data").value;

    num = toPoint(num);

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

    if (precision === "") {
        precision = 0;
    }

    if (isNaN(num) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "Input error. No number or multiple numbers have been entered.";
        return;
    }
    if (num === "") {
        document.querySelector(".name1").innerHTML = "Nothing has been entered. Try using numbers";
        return;
    }
    if (num == 0) {
        document.querySelector(".name1").innerHTML = ((arithm) ? "Arithmetic " : "Algebraic ") + "the square root of the number 0 is 0.\nRounding accuracy is " + precision + " decimal places.";
        return;
    }

    if (Math.abs(num) > 1e308) {
        document.querySelector(".name1").innerHTML = "The number entered is too large. Please enter a number whose module is less than 1e308.";
        return;
    }

    if (precision != Math.floor(precision)) {
        document.querySelector(".name1").innerHTML = "Non-integer precision has been entered. Please enter an integer.";
        return;
    }

    if (precision < 0) {
        document.querySelector(".name1").innerHTML = "Negative precision has been entered. Please enter a number from 0 to 50.";
        return;
    }

    if (precision > 50) {
        document.querySelector(".name1").innerHTML = "Too much precision has been entered. Please enter a number from 0 to 50.";
        return;
    }

    if (Math.abs(num) < 1e-100 && Math.abs(num) != 0) {
        document.querySelector(".name1").innerHTML = "Error. The modulus of the entered number is less than 1e-100. Please enter a number whose modulus is greater than 1e-100 or 0.";
        return;
    }
    
    let neg = false;

    if (num < 0) {
        if (arithm) {
            document.querySelector(".name1").innerHTML = "There are no solutions in real numbers";
            return;
        }
        neg = true;
        num = - num;
    }

    sqr = Math.sqrt(num);
    let s = (sqr == sqr.toFixed(precision)) ? sqr : round(sqr.toFixed(precision));

    if (neg) {
        if (sqr == 1) s = "i";
        else s += "i";
    }

    if (!arithm) {
        s = s + " и -" + s;
    }

    s += "."

    document.querySelector(".name1").innerHTML = ((arithm) ? "Arithmetic " : "Algebraic ") + "the square root of the number " + ((neg) ? "-" : "") + num + " equal " + s + "\nRounding accuracy is " + precision + " decimal places.";
    
}