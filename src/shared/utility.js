export const mixUp = arr => {
    let newArr = [];
    let length = arr.length;

    for(let i = 0; i < length; i++){
        let currentItem = arr.splice((Math.floor(Math.random()*arr.length)), 1);
        newArr.push(decodeURIComponent(...currentItem));
    }

    return newArr;
}
