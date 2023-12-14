function caesar() {
    const caesarsSelects = document.querySelectorAll(".caesar-step-number");
    const letters = [
        'a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm',
        'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ź', 'ż'
    ];


    // Create options for numbers 0 to 31
    caesarsSelects.forEach(select => {
        for (var i = 1; i <= letters.length; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            select.appendChild(option);
        }
    });

    //Utils

    const dataTransformer = (codingNumberValue, input, type) => {
        const transformedOutput = [...input.value].map(letter => {
            let indexOfTransformedElement;
            letter = letter.toLowerCase();

            if (letter === " ") return letter;

            if (type === "CODING") {
                indexOfTransformedElement = letters.findIndex(arrayLetter => arrayLetter === letter) + codingNumberValue

                if (indexOfTransformedElement > letters.length - 1) { indexOfTransformedElement = indexOfTransformedElement - letters.length }
            }

            if (type === "DECODING") {
                indexOfTransformedElement = letters.findIndex(arrayLetter => arrayLetter === letter) - codingNumberValue

                if (indexOfTransformedElement < 0) { indexOfTransformedElement = letters.length - Math.abs(indexOfTransformedElement) }
            }


            return letters[indexOfTransformedElement];
        });
        return transformedOutput.join('');
    }

    //CODING

    const caesarCodingInput = document.querySelector("#caesar-coding-input");
    const caesarCodingOutput = document.querySelector("#caesar-coding-output");
    const codingNumber = document.querySelector("#coding-number");
    let codingNumberValue = Number(codingNumber.value);

    caesarCodingInput.value = caesarCodingInput.value.trimStart();

    caesarCodingInput.addEventListener("input", function () {
        const inputValue = this.value;
        const regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/;


        if (!regex.test(inputValue)) {
            caesarCodingInput.value = inputValue.slice(0, -1);
        }

        codingNumberValue = Number(codingNumber.value);

        caesarCodingOutput.value = dataTransformer(codingNumberValue, caesarCodingInput, "CODING");

    });

    codingNumber.addEventListener("change", () => {

        codingNumberValue = Number(codingNumber.value);
        caesarCodingOutput.value = dataTransformer(codingNumberValue, caesarCodingInput, "CODING");
    });

    //DECODING

    const caesarDecodingInput = document.querySelector("#caesar-decoding-input");
    const caesarDecodingOutput = document.querySelector("#caesar-decoding-output");
    const decodingNumber = document.querySelector("#decoding-number");
    let decodingNumberValue = Number(decodingNumber.value);

    caesarDecodingInput.value = caesarDecodingInput.value.trimStart();

    caesarDecodingInput.addEventListener("input", function () {
        const inputValue = this.value;
        const regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/;


        if (!regex.test(inputValue)) {
            caesarDecodingInput.value = inputValue.slice(0, -1);
        }

        decodingNumberValue = Number(decodingNumber.value);

        caesarDecodingOutput.value = dataTransformer(decodingNumberValue, caesarDecodingInput, "DECODING");

    });

    decodingNumber.addEventListener("change", () => {

        decodingNumberValue = Number(decodingNumber.value);
        caesarDecodingOutput.value = dataTransformer(decodingNumberValue, caesarDecodingInput, "DECODING");
    });


}

caesar();

// POLIBIUS

// DRAG AND DROP MECHANISM
let dragged;

document.addEventListener('dragstart', function (event) {
    dragged = event.target;
    event.target.style.opacity = 0.5;
});

document.addEventListener('dragend', function (event) {
    event.target.style.opacity = '';
});

document.addEventListener('dragover', function (event) {
    event.preventDefault();
});

document.addEventListener('drop', function (event) {
    event.preventDefault();

    if (event.target.classList.contains('draggable')) {
        const targetContent = event.target.textContent;
        const draggedContent = dragged.textContent;

        event.target.textContent = draggedContent;
        dragged.textContent = targetContent;

        event.target.classList.remove('dragged');
    }
});

document.addEventListener('dragenter', function (event) {
    if (event.target.classList.contains('draggable')) {
        event.target.classList.add('dragged');
    }
});

document.addEventListener('dragleave', function (event) {
    if (event.target.classList.contains('draggable')) {
        event.target.classList.remove('dragged');
    }
});

// MAIN LOGIC
document.querySelector(".codingButton").addEventListener("click", function () {
    const letters = [...document.querySelectorAll('.draggable')];
    const rows = [[1, 2, 3, 4, 5, 6, 7]];

    letters.forEach((letter, index) => {
        const rowIndex = Math.floor(index / 7) + 1;
        if (!rows[rowIndex]) {
            rows[rowIndex] = [];
        }
        rows[rowIndex].push(letter.textContent);
    });

    // Fixed size
    rows.forEach((row) => {
        row.unshift("");
    });

    const inputText = document.getElementById('inputText').value.toLowerCase().split("");
    const keyText = document.getElementById("inputKey").value.toLowerCase();
    let encodedText = "";

    inputText.forEach((letter, index) => {
        for (let i = 1; i < rows.length; i++) {
            const columnIndex = rows[i].indexOf(letter);
            if (columnIndex !== -1) {
                encodedText += i.toString() + columnIndex.toString() + " ";
                break;
            }
        }
    });

    // Multiply by 3x power
    const powerThree = encodedText.split(" ").map(item => Math.pow(Number(item), 3)).filter(item => item > 0).join(" ");
    encodedText = powerThree;

    //KEY MECHANISM
    if (keyText.length) {
        const numbers = encodedText.split(' ').map(Number);
        let multiplier = keyText[keyText.length - 1] == 0 ? 3 : keyText[keyText.length - 1];
        const newNumbers = numbers.map(num => num * multiplier).filter(item => item > 0)
        encodedText = newNumbers.join(' ');
    }

    document.getElementById('outputText').textContent = encodedText.trim();
});

document.querySelector(".decodingButton").addEventListener("click", function () {
    const letters = [...document.querySelectorAll('.draggable')];
    const rows = [[1, 2, 3, 4, 5, 6, 7]];

    letters.forEach((letter, index) => {
        const rowIndex = Math.floor(index / 7) + 1;
        if (!rows[rowIndex]) {
            rows[rowIndex] = [];
        }
        rows[rowIndex].push(letter.textContent);
    });

    // Fixed size
    rows.forEach((row) => {
        row.unshift("");
    });

    let inputText = document.getElementById('inputText').value.trim().split(" ");
    const keyText = document.getElementById("inputKey").value.toLowerCase();
    let decodedText = "";

    // DECODING KEY MECHANISM
    if (keyText.length) {
        const numbers = inputText.map(Number);
        let divisor = keyText[keyText.length - 1] == 0 ? 3 : keyText[keyText.length - 1];
        const newNumbers = numbers.map(num => Math.floor(num / divisor)).filter(item => item >= 0).map(String)
        inputText = newNumbers
    }

    // Divider by reverse power
    const reversePower = inputText.map(item => Math.round(Math.pow(Number(item), 1 / 3))).filter(item => item >= 0).map(String)
    inputText = reversePower

    for (const pair of inputText) {
        const rowIndex = parseInt(pair[0]);
        const columnIndex = parseInt(pair[1]);

        if (rowIndex > 7 || columnIndex > 7) {
            decodedText = "Niepoprawna wartość klucza";
            break;
        }

        decodedText += rows[rowIndex][columnIndex];
    }

    document.getElementById('outputText').textContent = decodedText;
});