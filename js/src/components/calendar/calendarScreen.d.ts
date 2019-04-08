import * as React from 'react';
import './css/calendar.css';
declare type CalendarScreenProps = {
    getCalendar(name: string, value: any): void;
    date?: any;
    name?: string;
    placeholder?: any;
    close?: any;
    open?: any;
    top?: number;
    left?: number;
};
export declare class CalendarScreen extends React.Component<CalendarScreenProps, any> {
    constructor(props: any);
    listDom: HTMLElement;
    componentDidMount(): void;
    calendar(m: any, pickYear: any, _date: any): void;
    calendarSelect(m: any, pickYear: any): void;
    prevCalendar(): void;
    nextCalendar(): void;
    prevYearCalendar(): void;
    nextYearCalendar(): void;
    todayCalendar(): void;
    closeInner(e: any): void;
    getCalendar(date: any, month: any, year: any): void;
    bodyClick(e: any): void;
    click(e: any): void;
    monthSelect(): void;
    monthClick(e: any): void;
    yearNext(isTrue: boolean): void;
    yearSelect(): void;
    yearClick(e: any): void;
    render(): JSX.Element;
}
export {};
