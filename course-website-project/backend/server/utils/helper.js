import {compareSync, genSaltSync, hashSync} from 'bcrypt';


export function HashedPassword(password) {
    const salt=genSaltSync();
    return hashSync(password, salt);
}

export function ComparePassword(raw, hashedPassword) {

    return compareSync(raw, hashedPassword);
}

export function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
  