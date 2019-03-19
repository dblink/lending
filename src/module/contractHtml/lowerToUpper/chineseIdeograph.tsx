import * as React from 'react';

export const chineseLowerToUpper = (value: number) => {
    //console.log(value);
    //转换成字符串
    let valueNumber = value.toString();

    let splitFloat = valueNumber.split('.');
    //let integer = value;
    //整数部分
    let integer = splitFloat[0];
    let intergerLength = integer.length;
    //小数部分
    let decimal = splitFloat[1] || "00";
    let decimalLength = decimal.length;
    //大写数字
    let bigWrite = "壹.贰.叁.肆.伍.陆.柒.捌.玖".split(".");
    //尾数
    let unit = "分.角.圆.拾.佰.仟.万".split(".");
    //结果
    let valueArray: any[];
    //预设长度为6
    let puter = 6 - intergerLength; //dotqLength;
    //大写
    let valueBig = "";
    //小数长度为2
    let dothput = 2 - decimalLength; //dothLength;
    //补位
    let number = '';
    //结果数组
    let splitArray: any[]= [];
    //补整数位
    for (let i = 0; i < puter; i++) {
        number += '0';
    }
    integer = number + integer;

    number = '';
    //补小数位
    for (let i = 0; i < dothput; i++) {
        number += '';
    }
    decimal = number + decimal;
    //完整的数组
    valueArray = (integer + decimal).split("");

    valueArray.map((e, key) => {
        if (e === "0") {
            valueBig += key === 1 && valueArray[0] !== "0" && "万零" || key === 5 && "零圆" || "零";
        } else {
            switch (key) {
                case 0:
                {
                    valueBig += bigWrite[e - 1] + unit[3];
                    break;
                }
                default:
                {
                    valueBig += bigWrite[e - 1] + unit[7 - key];
                }
            }
        }
        splitArray.push(e === "0" ? "零" : bigWrite[e-1])
    });
    console.log(valueBig);
    valueBig = valueBig.replace(/^零+|零+$/g, "");
    valueBig = valueBig.replace(/零{2,}/g, "零");
    valueBig = valueBig.replace(/零圆/, "圆");
    valueBig = valueBig[valueBig.length - 1] === "圆" && valueBig + "整" || valueBig;

    return {array: splitArray, big: valueBig}
};