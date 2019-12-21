let test = `3,225,1,225,6,6,1100,1,238,225,104,0,1101,90,60,224,1001,224,-150,224,4,224,1002,223,8,223,1001,224,7,224,1,224,223,223,1,57,83,224,1001,224,-99,224,4,224,1002,223,8,223,1001,224,5,224,1,223,224,223,1102,92,88,225,101,41,187,224,1001,224,-82,224,4,224,1002,223,8,223,101,7,224,224,1,224,223,223,1101,7,20,225,1101,82,64,225,1002,183,42,224,101,-1554,224,224,4,224,102,8,223,223,1001,224,1,224,1,224,223,223,1102,70,30,224,101,-2100,224,224,4,224,102,8,223,223,101,1,224,224,1,224,223,223,2,87,214,224,1001,224,-2460,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,102,36,180,224,1001,224,-1368,224,4,224,1002,223,8,223,1001,224,5,224,1,223,224,223,1102,50,38,225,1102,37,14,225,1101,41,20,225,1001,217,7,224,101,-25,224,224,4,224,1002,223,8,223,101,2,224,224,1,224,223,223,1101,7,30,225,1102,18,16,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,7,226,226,224,102,2,223,223,1006,224,329,101,1,223,223,1107,677,226,224,102,2,223,223,1006,224,344,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,359,101,1,223,223,107,677,677,224,1002,223,2,223,1006,224,374,101,1,223,223,7,677,226,224,1002,223,2,223,1006,224,389,101,1,223,223,108,677,226,224,1002,223,2,223,1005,224,404,101,1,223,223,1108,677,226,224,102,2,223,223,1005,224,419,101,1,223,223,8,226,677,224,102,2,223,223,1006,224,434,1001,223,1,223,1008,677,677,224,1002,223,2,223,1005,224,449,1001,223,1,223,1107,226,677,224,102,2,223,223,1006,224,464,101,1,223,223,107,226,677,224,1002,223,2,223,1006,224,479,1001,223,1,223,7,226,677,224,102,2,223,223,1005,224,494,1001,223,1,223,8,677,677,224,102,2,223,223,1006,224,509,1001,223,1,223,1108,677,677,224,102,2,223,223,1005,224,524,1001,223,1,223,1108,226,677,224,1002,223,2,223,1005,224,539,101,1,223,223,107,226,226,224,102,2,223,223,1006,224,554,1001,223,1,223,1007,226,226,224,102,2,223,223,1005,224,569,1001,223,1,223,1008,226,226,224,102,2,223,223,1005,224,584,101,1,223,223,1007,677,677,224,1002,223,2,223,1005,224,599,1001,223,1,223,108,677,677,224,1002,223,2,223,1006,224,614,1001,223,1,223,1007,226,677,224,1002,223,2,223,1006,224,629,101,1,223,223,1008,677,226,224,102,2,223,223,1005,224,644,101,1,223,223,1107,226,226,224,1002,223,2,223,1005,224,659,1001,223,1,223,108,226,226,224,1002,223,2,223,1005,224,674,101,1,223,223,4,223,99,226`

console.assert = function(cond, text) {
    if (cond) return;
    console.log(text);
    throw new Error(text || "Assertion failed!");
};

let decode = instructionValue => {
    let s = (instructionValue + '').padStart(5, '0');
    return [s[3] + s[4], s[2], s[1], s[0]].map(x => parseInt(x));
}

let runProgram = (intCodeProgram, input = 1) => {
    let l = intCodeProgram.split(',').map(x => parseInt(x));
    let result = [];
    let i = 0;

    while (true) {
        let [opcode, mode1, mode2, mode3] = decode(l[i]);
        
        if (opcode === 1) {
            l[l[i + 3]] = (mode1 === 0 ? l[l[i + 1]] : l[i + 1]) +
            (mode2 === 0 ? l[l[i + 2]] : l[i + 2]);
            i += 4;
        } else if (opcode === 2) {
            l[l[i + 3]] = (mode1 === 0 ? l[l[i + 1]] : l[i + 1]) *
            (mode2 === 0 ? l[l[i + 2]] : l[i + 2]);
            i += 4;
        } else if (opcode === 3) {
            l[l[i + 1]] = input;
            i += 2;
        }  else if (opcode === 4) {
            result.push(mode1 === 0 ? l[l[i + 1]] : l[i + 1]);
            i += 2;
        }  else if (opcode === 5) {
            i = (mode1 === 0 ? l[l[i + 1]] : l[i + 1]) !== 0 ?
                (mode2 === 0 ? l[l[i + 2]] : l[i + 2]) :
                i + 3;
        }  else if (opcode === 6) {
            i = (mode1 === 0 ? l[l[i + 1]] : l[i + 1]) === 0 ?
                (mode2 === 0 ? l[l[i + 2]] : l[i + 2]) :
                i + 3;
        }  else if (opcode === 7) {
            l[l[i + 3]] = ((mode1 === 0 ? l[l[i + 1]] : l[i + 1]) <
            (mode2 === 0 ? l[l[i + 2]] : l[i + 2])) ? 1 : 0;
            i += 4;
        }  else if (opcode === 8) {
            l[l[i + 3]] = ((mode1 === 0 ? l[l[i + 1]] : l[i + 1]) ===
            (mode2 === 0 ? l[l[i + 2]] : l[i + 2])) ? 1 : 0;
            i += 4;
        }  else if (opcode === 99) {
            break;
        } else {
            console.assert(false, 'Unknown opcode.');
        }
    }

    return result;
}

let result = runProgram(test);
console.log(result);
result = runProgram(test, 5);
console.log(result);