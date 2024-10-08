export default function generateInitials(name){
    const words = name.split(" ");
    let firstInitial = words[0][0].toUpperCase();
    let secondInitial = "";

    if(words.length>1 && words[1] !== undefined){
        secondInitial = words[1][0].toUpperCase();
    }
    return firstInitial + secondInitial;
}