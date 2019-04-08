import { Color } from "csstype";
export declare type ChartSettingHome = {
    title: string;
    config: {
        data: any[];
        type: 'bar' | 'line';
        name: string;
        [index: string]: any;
    }[];
    axis: any[];
    color?: Color[];
};
declare class ChartSetting {
    home: (props: ChartSettingHome) => {
        title: {
            text: string;
            left: string;
        };
        legend: {
            data: string[];
            right: string;
        };
        xAxis: {
            data: any[];
            axisLine: {
                show: boolean;
            };
            splitLine: {
                lineStyle: {
                    type: string;
                };
            };
        };
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: string;
                };
            };
            axisLine: {
                show: boolean;
            };
            axisTick: {
                show: boolean;
            };
        };
        grid: {
            left: string;
            right: string;
            bottom: string;
            containLabel: boolean;
        };
        tooltip: {
            trigger: string;
            axisPointer: {
                type: string;
                label: {
                    backgroundColor: string;
                };
            };
        };
        series: {
            [index: string]: any;
            data: any[];
            type: "line" | "bar";
            name: string;
        }[];
        color: string[];
    };
}
export declare const chartSetting: ChartSetting;
export {};
