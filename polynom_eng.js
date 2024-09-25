
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

function sqrt_polynom() {
    let arithm = document.querySelector("#flag").checked;
    let precision = document.querySelector("#precision").value;
    let arg_a = document.querySelector("#arg_a").value;
    let arg_b = document.querySelector("#arg_b").value;
    let arg_c = document.querySelector("#arg_c").value;

    arg_a = toPoint(arg_a);
    arg_b = toPoint(arg_b);
    arg_c = toPoint(arg_c);

    if (precision === "") {
        precision = 0;
    }

    if (isNaN(arg_a) || isNaN(arg_b) || isNaN(arg_c) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "Input error. No number or multiple numbers have been entered.";
        return;
    }
    if (arg_a === "" || arg_b === "" || arg_c === "") {
        document.querySelector(".name1").innerHTML = "Nothing has been entered. Try using numbers";
        return;
    }

    if (arg_a * arg_c < 0) {
        document.querySelector(".name1").innerHTML = "Very sorry. Taking the root of this polynomial is impossible.";
        return;
    }

    if (Math.abs(arg_a) > 1e308 || Math.abs(arg_b) > 1e308 || Math.abs(arg_c) > 1e308) {
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

    if (Math.abs(arg_a) < 1e-100 && Math.abs(arg_a) != 0 || Math.abs(arg_b) < 1e-100 && Math.abs(arg_b) != 0 || Math.abs(arg_c) < 1e-100 && Math.abs(arg_c) != 0) {
        document.querySelector(".name1").innerHTML = "Error. The modulus of the entered number is less than 1e-100. Please enter a number whose modulus is greater than 1e-100 or 0.";
        return;
    }

    if (arg_a == 0 && arg_c == 0 && arg_b != 0) {
        if (arg_b < 0) {
            s = ((-arg_b == 1) ? "" : Math.sqrt(-arg_b)) + "ix^0.5";
        }
        else {
            s = ((arg_b == 1) ? "" : Math.sqrt(arg_b)) + "x^0.5";
        }

        if (!arithm) {
            s = s + " и -" + s;
        }

        document.querySelector(".name1").innerHTML = ((arithm) ? "Arithmetic " : "Algebraic ") + "the square root of a polynomial " + ((Math.abs(arg_b) == 1) ? ((arg_b < 0) ? "-" : "") : arg_b) + "x equal " + s + ".\nRounding accuracy is " + precision + " decimal places.";
        return;
    }

    kompl = false;

    if (arg_a < 0) {
        if (arithm) {
            document.querySelector(".name1").innerHTML = "Very sorry. Taking the root of this polynomial is impossible.";
            return;
        }
        kompl = true;
        arg_a = -arg_a;
        arg_b = -arg_b;
        arg_c = -arg_c;
    }

    k1 = Math.sqrt(arg_a);
    k2 = Math.sqrt(arg_c);

    

    if (4 * arg_a * arg_c != arg_b * arg_b) {
        document.querySelector(".name1").innerHTML = "Very sorry. Taking the root of this polynomial is impossible.";
        return;
    }

    if (k1 == 0 && k2 == 0) {
        document.querySelector(".name1").innerHTML = ((arithm) ? "Arithmetic " : "Algebraic ") + "the square root of a polynomial 0 equal 0" + "\nRounding accuracy is " + precision + " decimal places.";
        return;
    }

    neg = false;

    if (arg_b < 0) {
        neg = true;
    }

    if (k2 == 0) {
        s = ((k1 == 1) ? "" : ((k1.toFixed(precision) == k1) ? k1 : round(k1.toFixed(precision)))) + "x";
    }
    else if (k1 == 0) {
        s = ((k2.toFixed(precision) == k2) ? k2 : round(k2.toFixed(precision)))
    }
    else {
        s = ((k1 == 1) ? "" : ((k1.toFixed(precision) == k1) ? k1 : round(k1.toFixed(precision)))) + "x " + ((neg) ? "- " : "+ ") + ((k2.toFixed(precision) == k2) ? k2 : round(k2.toFixed(precision)));
    }

    if (kompl || !arithm) {
        s = "(" + s + ")";
        if (kompl) {
            s += "i";
        } 
        if (!arithm) {
            s = s + " и -" + s;
        }
    }

    document.querySelector(".name1").innerHTML = ((arithm) ? "Arithmetic " : "Algebraic ") + "the square root of a polynomial " + ((kompl) ? "-" : "") +"(" + ((arg_a == 0) ? "" : ((arg_a == 1) ? "" : arg_a) + "x^2") + ((arg_b == 0) ? "" : ((arg_b > 0) ? " + " : " - ") + ((Math.abs(arg_b) == 1) ? "" : Math.abs(arg_b)) + "x") + ((arg_c == 0) ? "" : ((arg_a == 0 && arg_b == 0) ? "" : " + ") + arg_c) + ") equal " + s + ".\nRounding accuracy is " + precision + " decimal places.";
}