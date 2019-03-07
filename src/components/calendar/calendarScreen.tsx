import * as React from 'react';
import './css/calendar.css';
import { Icon } from '../icon/icon';

type CalendarScreenProps = {
    getCalendar(name: string, value: any): void;
    date?: any;
    name?: string;
    placeholder?: any;
    close?: any;
    open?: any;
    top?: number;
    left?: number;
}

export class CalendarScreen extends React.Component<CalendarScreenProps, any>{
    constructor(props: any){
        super(props);
        let _date = new Date();
        this.state = {
            date: _date,
            liList: '',
            todayDate: '',
            currentYear: '',
            currentMonth: '',
            dateValue: '',
            view: false,
            monthSelect: false,
            yearSelect: false
        };
        this.calendar = this.calendar.bind(this);
        this.nextCalendar = this.nextCalendar.bind(this);
        this.prevCalendar = this.prevCalendar.bind(this);
        this.getCalendar = this.getCalendar.bind(this);
        this.prevYearCalendar = this.prevYearCalendar.bind(this);
        this.nextYearCalendar = this.nextYearCalendar.bind(this);
        this.todayCalendar = this.todayCalendar.bind(this);
        this.calendarSelect = this.calendarSelect.bind(this);
        this.bodyClick = this.bodyClick.bind(this);
        this.click = this.click.bind(this);
        this.closeInner = this.closeInner.bind(this);
        this.monthSelect = this.monthSelect.bind(this);
        this.monthClick = this.monthClick.bind(this);
        this.yearSelect = this.yearSelect.bind(this);
        this.yearClick = this.yearClick.bind(this);
        this.yearNext = this.yearNext.bind(this);
    }
    listDom: HTMLElement;

    componentDidMount(){
        let currentDate = this.props.date ? new Date(this.props.date) : new Date();
        let _currentYear = currentDate.getFullYear();
        let _currentMonth = currentDate.getMonth();
        let _currentDate = currentDate.getDate();
        this.calendar(_currentMonth, _currentYear, _currentDate);
        let calendar = document.getElementById('calendar');

        let nextYearCalendar = document.getElementById('nextYearCalendar');
        let nextCalendar = document.getElementById('nextCalendar');
        let prevYearCalendar = document.getElementById('prevYearCalendar');
        let prevCalendar = document.getElementById('prevCalendar');
        let calendarFooter = document.getElementById('calendarFooter');
        let monthSelect = document.getElementById('monthSelect');
        let yearSelect = document.getElementById('yearSelect');

        calendar.addEventListener('click', this.click);
        nextYearCalendar.addEventListener('click', this.nextYearCalendar);
        nextCalendar.addEventListener('click', this.nextCalendar);
        prevYearCalendar.addEventListener('click', this.prevYearCalendar);
        prevCalendar.addEventListener('click', this.prevCalendar);
        calendarFooter.addEventListener('click', this.todayCalendar);
        monthSelect.addEventListener('click', this.monthSelect);
        yearSelect.addEventListener('click', this.yearSelect);

        document.body.addEventListener('click', this.bodyClick);
    }

    calendar(m: any, pickYear: any, _date: any){
        //console.log(m);
        let currentDate = new Date();
        let _currentYear = currentDate.getFullYear();
        let _currentMonth = currentDate.getMonth();
        let _currentDate = currentDate.getDate();

        let activeDate = new Date(pickYear, (m), 1);
        let month = activeDate.getMonth();
        let year = activeDate.getFullYear();
        let diss = 1-activeDate.getDay();
        activeDate.setDate(diss);
        let _liList: any[] = [];
        let _todayDate = <div
            // ref={e=>e.addEventListener('click', ()=>this.todayCalendar())}
            onClick={this.todayCalendar}
            className="calendar-footer-inner footer-today">
            今天
        </div>;
        for (let i=0;i<42;i++){
            let date = activeDate.getDate();
            if (activeDate.getMonth() !== month){
                _liList.push(<li
                    key={i}
                    data-year={pickYear}
                    data-month={month}
                    data-date={date}
                    className="not-current-month"><p>{date}</p></li>);
            }

            else if (_currentMonth === month && date === _currentDate && pickYear === _currentYear) {
                _liList.push(<li
                    // ref={e=> e.addEventListener('click', this.click)}
                    onClick={()=>this.getCalendar(date, month, pickYear)}
                    data-year={pickYear}
                    data-month={month}
                    data-date={date}
                    key={i} className="date-inner today-date-inner">{date}</li>);
            }

            else if (m === month && date === _date && pickYear === year) {
                _liList.push(<li
                    // ref={e=> e.addEventListener('click', this.click)}
                    onClick={()=>this.getCalendar(date, month, pickYear)}
                    data-year={pickYear}
                    data-month={month}
                    data-date={date}
                    key={i} className="date-inner in-date-inner use-date">{date}</li>);
            }

            else {
                _liList.push(<li
                    // ref={e=> e.addEventListener('click', this.click)}
                    onClick={()=>this.getCalendar(date, month, pickYear)}
                    data-year={pickYear}
                    data-month={month}
                    data-date={date}
                    key={i} className="date-inner">{date}</li>);
            }
            activeDate.setDate(date+1);
        }
        if (m===-1) {
            m = 11;
            pickYear = pickYear-1;
        }
        if (m===12) {
            m = 0;
            pickYear = pickYear+1;
        }

        // if (m===11) m = 0;
        this.setState({
            currentYear: pickYear,
            currentMonth: m,
            liList: _liList,
            todayDate: _todayDate
        },()=>{
            let dateInner = document.querySelectorAll('.date-inner');
            for (let i=0;i<dateInner.length;i++){
                dateInner[i].addEventListener('click',this.closeInner)
            }
        });


    }

    calendarSelect(m: any, pickYear: any){
        let dateInner = document.querySelectorAll('.date-inner');
        for (let i=0;i<dateInner.length;i++){
            dateInner[i].removeEventListener('click',this.closeInner)
        }
        let currentDate = new Date();
        let _currentYear = currentDate.getFullYear();
        let _currentMonth = currentDate.getMonth();
        let _currentDate = currentDate.getDate();

        let activeDate = new Date(pickYear, (m), 1);
        let month = activeDate.getMonth();
        let year = activeDate.getFullYear();
        let diss = 1-activeDate.getDay();
        activeDate.setDate(diss);
        let _liList: any[] = [];
        if (m===-1) {
            m = 11;
            pickYear = pickYear-1;
        }
        if (m===12) {
            m = 0;
            pickYear = pickYear+1;
        }
        for (let i=0;i<42;i++){
            let date = activeDate.getDate();
            if (activeDate.getMonth() !== month){
                _liList.push(<li key={i}
                                 data-year={pickYear}
                                 data-month={month}
                                 data-date={date}
                                 className="not-current-month">{date}</li>);
            }

            else if (_currentMonth === month && date === _currentDate && pickYear === _currentYear) {
                _liList.push(<li
                    // ref={e=> e.addEventListener('click', ()=>this.getCalendar(date, month, pickYear))}
                    onClick={()=>this.getCalendar(date, month, pickYear)}
                    data-year={pickYear}
                    data-month={month}
                    data-date={date}
                    key={i} className="date-inner today-date-inner">{date}</li>);
            }

            else {
                _liList.push(<li
                    // ref={e=> e.addEventListener('click', ()=>this.getCalendar(date, month, pickYear))}
                    onClick={()=>this.getCalendar(date, month, pickYear)}
                    data-year={pickYear}
                    data-month={month}
                    data-date={date}
                    key={i} className="date-inner">{date}</li>);
            }
            activeDate.setDate(date+1);
        }

        // if (m===11) m = 0;
        this.setState({
            currentYear: pickYear,
            currentMonth: m,
            liList: _liList
        },()=>{
            let dateInner = document.querySelectorAll('.date-inner');
            for (let i=0;i<dateInner.length;i++){
                dateInner[i].addEventListener('click',this.closeInner)
            }
        });
    }
    //上个月
    prevCalendar(){
        let m = this.state.currentMonth;
        let y = this.state.currentYear;
        this.calendarSelect(--m, y);
    }

    //下个月
    nextCalendar(){
        let m = this.state.currentMonth;
        let y = this.state.currentYear;
        this.calendarSelect(++m, y);
    }

    //上一年
    prevYearCalendar(){
        let m = this.state.currentMonth;
        let y = this.state.currentYear;
        this.calendarSelect(m, --y);
    }

    //下一年
    nextYearCalendar(){
        let m = this.state.currentMonth;
        let y = this.state.currentYear;
        this.calendarSelect(m, ++y);
    }


    //今天的日期
    todayCalendar(){
        let _date = new Date();
        let m =_date.getMonth();
        let y = _date.getFullYear();
        let d = _date.getDate();
        this.calendar(m, y, d);
        let time = y + '-' + (m+1) + '-' + d;
        let _outDate = new Date(time).toLocaleDateString();
        this.props.getCalendar(this.props.name, _outDate);
        typeof this.props.close === 'function' && this.props.close();
    }

    closeInner(e: any){
        let y = e.target.dataset.year;
        let m = parseInt(e.target.dataset.month)+1;
        let d = e.target.dataset.date;
        let time = y + '-' + m + '-' + d;
        let _outDate = new Date(time).toLocaleDateString();
        this.props.getCalendar(this.props.name, _outDate);
        typeof this.props.close === 'function' && this.props.close();
    }

    //获取点击的日期
    getCalendar(date: any, month: any, year: any){
        let _year = year;
        let _month = month+1;
        let _date = date;
        let time = _year + '-' + _month + '-' + _date;
        let _outDate = new Date(time).toLocaleDateString();
        //console.log(_outDate);
        this.props.getCalendar(this.props.name, _outDate);
        typeof this.props.close === 'function' && this.props.close();
        this.setState({
            dateValue: _outDate,
        });
    }

    bodyClick(e: any){
        // console.log(e);
        typeof this.props.close === 'function' && this.props.close();
    }
    click(e: any){
        e.stopImmediatePropagation();
    }
    monthSelect(){
        this.setState({
            monthSelect: true
        },()=>{
            let monthSelectList = document.getElementsByClassName('month-select-ul')[0].getElementsByTagName('li');
            for (let i=0;i<monthSelectList.length;i++){
                monthSelectList[i].addEventListener('click', this.monthClick);
            }
        })
    }
    monthClick(e: any){
        let m = parseInt(e.target.dataset.month)-1;
        this.setState({
            monthSelect: false,
            currentMonth: m
        },()=>{
            this.calendarSelect(this.state.currentMonth, this.state.currentYear)
        })
    }

    yearNext(isTrue: boolean){

        this.setState({
            currentYear: isTrue? this.state.currentYear+9: this.state.currentYear-9
        },()=>{
            let _yearList = [];
            _yearList.push(
                <li key={0} className='display-flex-center' data-year={this.state.currentYear-4}>
                    {this.state.currentYear-4}
                </li>,
                <li key={1} className='display-flex-center' data-year={this.state.currentYear-3}>
                    {this.state.currentYear-3}
                </li>,
                <li key={2} className='display-flex-center' data-year={this.state.currentYear-2}>
                    {this.state.currentYear-2}
                </li>,
                <li key={3} className='display-flex-center' data-year={this.state.currentYear-1}>
                    {this.state.currentYear-1}
                </li>,
                <li key={4} className='display-flex-center' data-year={this.state.currentYear}>
                    {this.state.currentYear}
                </li>,
                <li key={5} className='display-flex-center' data-year={this.state.currentYear+1}>
                    {this.state.currentYear+1}
                </li>,
                <li key={6} className='display-flex-center' data-year={this.state.currentYear+2}>
                    {this.state.currentYear+2}
                </li>,
                <li key={7} className='display-flex-center' data-year={this.state.currentYear+3}>
                    {this.state.currentYear+3}
                </li>,
                <li key={8} className='display-flex-center' data-year={this.state.currentYear+4}>
                    {this.state.currentYear+4}
                </li>

            );
            this.setState({
                yearSelect: true,
                yearList: _yearList
            },()=>{
                let yearSelectList = document.getElementsByClassName('year-select-ul')[0].getElementsByTagName('li');
                for (let i=0;i<yearSelectList.length;i++){
                    yearSelectList[i].addEventListener('click', this.yearClick);
                }
            })
        })
    }
    yearSelect(){

        let _yearList = [];
        _yearList.push(
            <li key={0} className='display-flex-center' data-year={this.state.currentYear-4}>
                {this.state.currentYear-4}
            </li>,
            <li key={1} className='display-flex-center' data-year={this.state.currentYear-3}>
                {this.state.currentYear-3}
            </li>,
            <li key={2} className='display-flex-center' data-year={this.state.currentYear-2}>
                {this.state.currentYear-2}
            </li>,
            <li key={3} className='display-flex-center' data-year={this.state.currentYear-1}>
                {this.state.currentYear-1}
            </li>,
            <li key={4} className='display-flex-center' data-year={this.state.currentYear}>
                {this.state.currentYear}
            </li>,
            <li key={5} className='display-flex-center' data-year={this.state.currentYear+1}>
                {this.state.currentYear+1}
            </li>,
            <li key={6} className='display-flex-center' data-year={this.state.currentYear+2}>
                {this.state.currentYear+2}
            </li>,
            <li key={7} className='display-flex-center' data-year={this.state.currentYear+3}>
                {this.state.currentYear+3}
            </li>,
            <li key={8} className='display-flex-center' data-year={this.state.currentYear+4}>
                {this.state.currentYear+4}
            </li>

        );
        this.setState({
            yearSelect: true,
            yearList: _yearList
        },()=>{
            let yearSelectList = document.getElementsByClassName('year-select-ul')[0].getElementsByTagName('li');
            for (let i=0;i<yearSelectList.length;i++){
                yearSelectList[i].addEventListener('click', this.yearClick);
            }
            let yearPrev = document.getElementById('year-prev');
            let yearNext = document.getElementById('year-next');
            yearPrev.addEventListener('click', ()=>this.yearNext(false));
            yearNext.addEventListener('click', ()=>this.yearNext(true));
        })
    }
    yearClick(e: any){
        let y = parseInt(e.target.dataset.year);
        this.setState({
            yearSelect: false,
            currentYear: y
        },()=>{
            this.calendarSelect(this.state.currentMonth, this.state.currentYear)
        })
    }
    render(){
        return <div
            className="calendar-main zIndex100"
            style={{
                position: 'absolute',
                background: '#fff'
                // top: this.props.top+'px',
                // left: this.props.left+'px'
            }}
            // ref={e=> e.addEventListener('click', this.click)}
            ref={dom => this.listDom = dom}
            id='calendar'
        >
            <div className="calendar-title">
                {
                    this.state.yearSelect && <div id='year-prev' className='year-prev display-flex-center' style={{height: '47px'}}>
                        <p className="date-btn material-icons" id='prevYearCalendar' style={{maxWidth: '38px'}}>
                            first_page
                        </p>
                    </div>
                }
                {
                    this.state.yearSelect && <div id='year-next' className='year-next display-flex-center' style={{height: '47px'}}>
                        <p className="date-btn material-icons" id='nextYearCalendar' style={{maxWidth: '38px'}}>
                            last_page
                        </p>
                    </div>
                }
                {
                    <div className="calendar-title-inner-btn">
                        <Icon onClick={this.prevYearCalendar} className='date-btn' id='prevYearCalendar'>
                            firstPage
                        </Icon>
                        <Icon onClick={this.prevCalendar} className='date-btn' id='prevCalendar'>
                            prevPage
                        </Icon>
                    </div>
                }

                <div className="calendar-title-inner">
                    <p onClick={this.yearSelect} id='yearSelect' className="calendar-title-inner-date">{this.state.currentYear}年</p>
                    <p onClick={this.monthSelect} id='monthSelect' className="calendar-title-inner-date" style={{marginLeft: '8px'}}>{this.state.currentMonth+1}月</p>
                </div>
                {
                    <div className="calendar-title-inner-btn">
                        <Icon onClick={this.nextCalendar} className='date-btn' id='nextCalendar'>
                            nextPage
                        </Icon>
                        <Icon onClick={this.nextYearCalendar} className='date-btn' id='nextYearCalendar'>
                            lastPage
                        </Icon>
                    </div>
                }

            </div>
            <div className="calendar-content" style={{position: 'relative'}}>
                {
                    this.state.yearSelect && <div className='year-select'>
                        <ul className='year-select-ul display-flex-center'>
                            {
                                this.state.yearList
                            }
                        </ul>
                    </div>
                }
                {
                    this.state.monthSelect && <div className='month-select'>
                        <ul className='month-select-ul display-flex-center'>
                            <li className='display-flex-center' data-month={1}>
                                1
                            </li>
                            <li className='display-flex-center' data-month={2}>
                                2
                            </li>
                            <li className='display-flex-center' data-month={3}>
                                3
                            </li>
                            <li className='display-flex-center' data-month={4}>
                                4
                            </li>
                            <li className='display-flex-center' data-month={5}>
                                5
                            </li>
                            <li className='display-flex-center' data-month={6}>
                                6
                            </li>
                            <li className='display-flex-center' data-month={7}>
                                7
                            </li>
                            <li className='display-flex-center' data-month={8}>
                                8
                            </li>
                            <li className='display-flex-center' data-month={9}>
                                9
                            </li>
                            <li className='display-flex-center' data-month={10}>
                                10
                            </li>
                            <li className='display-flex-center' data-month={11}>
                                11
                            </li>
                            <li className='display-flex-center' data-month={12}>
                                12
                            </li>
                        </ul>
                    </div>
                }
                <div className="calendar-content-week-list">
                    <div className="week-inner">
                        <p>日</p>
                    </div>
                    <div className="week-inner">
                        <p>一</p>
                    </div>
                    <div className="week-inner">
                        <p>二</p>
                    </div>
                    <div className="week-inner">
                        <p>三</p>
                    </div>
                    <div className="week-inner">
                        <p>四</p>
                    </div>
                    <div className="week-inner">
                        <p>五</p>
                    </div>
                    <div className="week-inner">
                        <p>六</p>
                    </div>
                </div>
                <ul className="calendar-content-date-list">
                    {
                        this.state.liList
                    }
                    {
                        // this.calendar(this.state.currentMonth)
                    }
                </ul>
            </div>
            <div className="calendar-footer">
                <div
                    // ref={e=>e.addEventListener('click', ()=>this.todayCalendar())}
                    onClick={this.todayCalendar}
                    className="calendar-footer-inner footer-today" id='calendarFooter'>
                    今天
                </div>
            </div>
        </div>
    }
}
