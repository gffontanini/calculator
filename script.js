//Valores, los introduce el usuario
let operator = "";
let previousValue = "";
let currentValue = "";

//Seleccionar elementos desde HTML
let clear = document.querySelector("#clear");
let equal = document.querySelector(".equal");
let decimal = document.querySelector(".decimal");

let numbers = document.querySelectorAll(".numbers");
let operators = document.querySelectorAll(".operator");

let previousScreen = document.querySelector(".previous");
let currentScreen = document.querySelector(".current");

//Máxima cantidad de digitos
const MAX_DIGITS = 8;

//operaciones y funciones
function add(a, b) {
	return a + b;
}
function substract(a, b) {
	return a - b;
}
function multiply(a, b) {
	return a * b;
}
function divide(a, b) {
	if (b !== 0) {
		return a / b;
	} else {
		return "ERROR";
	}
}

//funcion operate, operaciones matematicas
function operate(a, b, operator) {
	switch (operator) {
		case "+":
			return add(a, b);
		case "-":
			return substract(a, b);
		case "x":
			return multiply(a, b);
		case "/":
			return divide(a, b);
		default:
			return b;
	}
}
//switch es como poner muchas veces if, seria "si "+" entonces devolvé la funcion add"

//Actualizar Pantalla
function updateScreen() {
	currentScreen.textContent = currentValue || "0";
	previousScreen.textContent = operator
		? `${previousValue} ${operator}`
		: previousValue;
}
//Si currentValue tiene un valor, entonces pasa a ser el contenido de currentScreen.textContent. Sino,
//si está vacio, currentScreen es 0.
//Si en previousScreen se introduce un operator, se arma una string de el valor anterior y el operator.
//sino, solo aparece previousValue

//Click en números
function getNumberClick() {
	if (currentValue.length < MAX_DIGITS) {
		currentValue += this.textContent;
	} else {
		if (previousValue.length < MAX_DIGITS) {
			previousValue += this.textContent;
		}
	}
	updateScreen();
}
//Si currentValue está y es menor a 8 digitos, se agrega el valor del botón indicado al final de current
//value. += es lo que concatena. this.textContent representa el valor del botón que el usuario hizo clic

//click en decimal
function getDecimalClick() {
	if (!currentValue.includes(".")) {
		currentValue += ".";
	}
	updateScreen();
}
//Si currentValue no tiene punto decimal, se concatena al final y se muestra en pantalla

//click en operators
function getOperatorsClick() {
	if (previousValue.length < MAX_DIGITS && currentValue.length < MAX_DIGITS) {
		if (currentValue !== "") {
			if (operator !== "") {
				previousValue = operate(
					parseFloat(previousValue),
					parseFloat(currentValue),
					operator
				).toString();
			} else {
				previousValue = currentValue;
			}
			currentValue = "";
		}
		operator = this.textContent;
		updateScreen();
	}
}
//si current y previous tienen maximo 8 digitos, currentValue no está vacio y operator no está vacio,
//operate toma previousValue, currentValue y operator y convierte los valores en strings de numeros de
//punto flotante (?) y realiza la operación. El resultado se convierte en string y se le asigna
//a previousValue. Si operator está vacio, el valor de currentValue se "reemplaza", convirtiendolo en
//previousValue, y espera que el usuario ingrese un operator.

//click en igual
function getEqualClick() {
	if (previousValue !== "" && currentValue !== "" && operator !== "") {
		previousValue = operate(
			parseFloat(previousValue),
			parseFloat(currentValue),
			operator
		).toString();
		currentValue = "";
		operator = "";
	}
	updateScreen();
}
//si previousValue, currentValue y operator no estás vacios, la funcion operate realiza la operacion
//matemática, toma previousValue, currentValue y el operator, dando el resultado en un string y
//asignandoló como previousVale (para seguir sumando o similar). currentValue y el operator se vacian.

//click en Clear
function clearScreen() {
	previousValue = "";
	currentValue = "";
	operator = "";
	updateScreen();
}

//Event listeners para que el click en el teclado sea el input
numbers.forEach((btn) => btn.addEventListener("click", getNumberClick));
operators.forEach((btn) => btn.addEventListener("click", getOperatorsClick));
equal.addEventListener("click", getEqualClick);
decimal.addEventListener("click", getDecimalClick);
clear.addEventListener("click", clearScreen);
