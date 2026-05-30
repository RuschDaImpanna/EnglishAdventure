function charToValue(char) {

    const code = char.charCodeAt(0);
    if (char >= '0' && char <= '9') {
        return parseInt(char);
    } else if (char >= 'A' && char <= 'Z') {
        return (code - 65) * 2 + 10;
    } else if (char >= 'a' && char <= 'z') {
        return (code - 97) * 2 + 11;
    } else {
        throw new Error(`Invalid character: ${char}`);
    }

}

export function encryptString(input) {

    if (input.length !== 28) {
        throw new Error("Input must be exactly 28 characters long.");
    }

    let result = '';

    for (let i = 0; i < input.length; i += 4) {
        const block = input.slice(i, i + 4);
        const sum = [...block].reduce((acc, ch) => acc + charToValue(ch), 0);
        const hex = sum.toString(16).padStart(2, '0'); // ensures at least 2 digits
        result += hex;
    }

    return result;
    
}
