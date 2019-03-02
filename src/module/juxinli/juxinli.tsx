import * as React from 'react';
import { View } from '../pageModule/view';
import { ReqOption, req } from '../../components/request';
import { ParameterName } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { Progress } from '../../components/progress/progress';
import { CancelButton, PrimaryButton } from '../../components/button';

interface Props {
    applyId: string;
    borrowerId: string;
    idCardNo: string;
}

interface State {
    data: {
        id_card_num ?: string;
        phone ?: string;
        name ?: string;
        home_address ?: string;
        contacts ?: string;
    },
    url: string;
}

export class Juxinli extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: {},
            url : ''
        };
    }
    list = {
        0: '父母',
        1: '配偶',
        2: '朋友',
        3: '亲戚'
    }
    componentDidMount(){
        let _getBorrowerBaseInfo: ReqOption<ParameterName.getBorrowerBaseInfo>,
            _getJxlUrl: ReqOption<ParameterName.getJxlUrl>,
            _getBorrowerDetailInfo: ReqOption<ParameterName.getBorrowerDetailInfo>
        _getBorrowerBaseInfo = {
            data: {
                BorrowerId: this.props.borrowerId,
                Token: sessionData.getData('Token')
            },
            fail: (e)=>{
                alert(e.ErrMsg);
            },
            succeed: (e)=>{
                let _value = e.Value;
                let _data = this.state.data;
                _data.home_address = _value.HouseholdAddress;
                _data.id_card_num =_value.IDCardNo;
                _data.phone = _value.Mobile;
                _data.name = _value.RealName;
                this.setState({
                    data: _data
                })
                req(ParameterName.getBorrowerDetailInfo, _getBorrowerDetailInfo);
            }
        }
        _getBorrowerDetailInfo = {
            data: {
                BorrowerId: this.props.borrowerId,
                Token: sessionData.getData('Token')
            },
            fail: (e)=>{
                alert(e.ErrMsg);
            },
            succeed:(e)=>{
                let relative = e.Value.BorrowerRelation,
                    _data = '',
                    _info = this.state.data;
                if(relative){
                    let _relative:{
                        contactMobile:string;
                        contactName: string;
                        contactRelation: number;
                    }[] = JSON.parse(relative);
                    let _array:any[] = [];
                    _relative.map((e)=>{
                        _array.push(e.contactName + ':' + this.list[e.contactRelation as 0] + ':' + e.contactMobile);
                    })
                    _data = _array.join(',');
                }
                _info.contacts = _data;
                this.setState({
                    data: _info
                });
                req(ParameterName.getJxlUrl, _getJxlUrl);
            }
        }
        _getJxlUrl = {
            data: {
                ApplyId: this.props.applyId,
                IdCardNo: this.props.idCardNo,
                Token: sessionData.getData('Token')
            },
            fail: (e) =>{
                alert(e.ErrMsg);
            },
            succeed: (e)=>{
                let k :string;
                let arr: any[] = [];
                //console.log(this.state.data);
                for(k in this.state.data){
                    arr.push( k +'='+ this.state.data[k as 'phone']);
                }
                this.setState({
                    url: e.Value + '&' + arr.join('&')
                })
            }
        }
        req(ParameterName.getBorrowerBaseInfo, _getBorrowerBaseInfo)
    }
    render() {
        return <View>
            {
                this.state.url ? <iframe 
                    style={{width:'100%', height: '100%', border:'none'}}
                    src={this.state.url}>
                </iframe>:<Progress hidden={true}/>
            }
            <div>
                <CancelButton>
                    取消
                </CancelButton>
                <PrimaryButton>
                    确认
                </PrimaryButton>
            </div>
        </View>
    }
}