
const history = document.getElementById("history");
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach(button=> {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if(value === "AC"){
            expression = "";
            display.textContent = "0";
            history.textContent = "";
        }
        else if(value === "DEL"){
            expression = expression.slice(0, -1);
            display.textContent = expression || "0";
        }
        else if(value === "="){
            try{
                history.textContent = expression;
                expression = eval(expression).toString();
                display.textContent = expression;
            }
            catch{
                display.textContent = "Error";
                expression = "";
            }
        }
        else{
            expression += value;
            display.textContent = expression;
        }
    });
});