let util = {
    total: (arr) => {
        let sum = 0;
        for(let i = 0, len = arr.length ; i < len; i++) {
            sum += arr[i];
        }
        return sum;
    }
}

export default util;