
export function getIntervalDate(
    date : Date, interval: number, 
    type : 'month'|'year'|'date' = 'month', 
    dir  : 'prev' | 'next' = 'prev'):{endTime: string, startTime: string}
{
    switch(type){
        case 'month':{
            let _month = date.getMonth(),
                _oldTime = date.toLocaleDateString();
            if(dir === 'next')
            {
                date.setMonth(_month+interval);
                return {
                    endTime: _oldTime,
                    startTime: date.toLocaleDateString()
                };
            }else{
                date.setMonth(_month-interval);
                return {
                    endTime: _oldTime,
                    startTime: date.toLocaleDateString()
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