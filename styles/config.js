//  export const ip = 'https://servergametala.herokuapp.com';
  export const ip = 'http://192.168.1.9:3000'
export const numberWithCommas = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}
    