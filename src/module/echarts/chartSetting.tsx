import { Color } from "csstype";

export type ChartSettingHome  = {
    title: string, config: {data: any[], type: 'bar' | 'line', name: string, 
    [index: string]: any}[], axis: any[], color ?: Color[]}
class ChartSetting{
    home = (props: ChartSettingHome)=>{
        return {
            title: {
                text: props.title,
                left: '3%',
            },
            legend: {
                data: props.config.map((e)=>e.name),
                right: '3%'
            },
            xAxis: {
                data: props.axis,
                //show: false,
                axisLine: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        type: 'dotted'
                    }
                }
            },
            yAxis: {
                //show: false,
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            series: props.config,
            color: props.color || ['#FFA45E', '#72BEFF'],
        }
    }
}

export const chartSetting = new ChartSetting()