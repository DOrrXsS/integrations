var deepCopy = function (obj) {
    // 根据obj的类型判断是新建一个数组还是一个对象
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        // 遍历obj,并且判断是obj的属性才拷贝
        if (obj.hasOwnProperty(key)) {
            // 判断属性值的类型，如果是对象递归调用深拷贝
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}

export default deepCopy;