
export function getIntervalDate(
    date : Date, interval: number, 
    type : 'month'|'year'|'date' = 'month', 
    dir  : 'prev' | 'next' = 'prev'):{endTime: string, startTime: string}
{
    switch(type){
        case 'month':{
            let _month = date.getMonth(),
                _oldTime = getString(date);
            if(dir === 'next')
            {
                date.setMonth(_month+interval);
                return {
                    endTime: _oldTime,
                    startTime: getString(date)
                };
            }else{
                date.setMonth(_month-interval);
                return {
                    endTime: _oldTime,
                    startTime:  getString(date)
                };
            }
        }
        case 'date': { 
            let _date = date.getDate(),
                _oldTime =  getString(date);
            if(dir === 'next')
            {
                date.setDate(_date + interval);
                return {
                    endTime: _oldTime,
                    startTime: getString(date)
                };
            }else{
                date.setDate(_date - interval);
                return {
                    endTime: _oldTime,
                    startTime:  getString(date)
                };
            }
         }
        default:{
            alert('will ToDo');
            return {
                endTime: '',
                startTime: '',
            }
        }
    }
}
function getString(date: Date){
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
}