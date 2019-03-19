import * as React from 'react';
import { ParameterName, Parameter } from "../../../components/request/setting";
import { ContactInfo } from './contactInfo/contactInfo';
import { CompanyInfo } from './conpanyInfo/compantInfo';
import { OtherInfo } from './otherInfo/otherInfo';
import { ReqOption, req } from '../../../components/request';
import { TabButton, CancelButton, PrimaryButton } from '../../../components/button';
import { InnerProgress, PageLoading } from '../../../components/progress/progress';
import { load } from '../../../components/loading/loading';
import { sessionData } from '../../../components/sessionData/sessionData';

type BorrowerInfoDetailState = {
    type: 'contactInfo' | 'otherInfo' | 'companyInfo';
    data?: Parameter<ParameterName.addBorrowerDetailInfo>;
    isLoading: boolean;
    pageLoading: boolean;
};
type BorrowerInfoDetailProps = {
    name: string;
    borrowerId: string;
    isExit: boolean;
    onChangeStep: (str: string) => void;
    onChangeDataState: (str: string, status: boolean) => void;
};
//借款人信息详情
export class BorrowerInfoDetail extends React.Component<BorrowerInfoDetailProps, BorrowerInfoDetailState> {
    constructor(props: any) {
        super(props);
        this.state = {
            type: 'contactInfo',
            data: {
                Token: sessionData.getData('Token'),
                BorrowerId: this.props.borrowerId
            },
            isLoading: false,
            pageLoading: false
        };
        this.getDom = this.getDom.bind(this);
        this.changeType = this.changeType.bind(this);
        this.confirm = load.run.call(this, this.confirm);
        this.getInfo = load.run.call(this, this.getInfo.bind(this), 'pageLoading') ;
    }
    changeType(type: BorrowerInfoDetailState['type']) {
        if (this.state.type === type) {
            return;
        }
        if (this.setData[this.state.type].run) {
            let data = this.setData[this.state.type].run();
            let _data = this.state.data;
            let _d = Object.assign({},_data, data);
            this.setState({
                data: _d,
                type: type
            });
        }
        else {
            this.setState({
                type: type
            });
        }
    }
    setData: {
        contactInfo ?: {
            run?: any;
            setData?: any; 
        },
        companyInfo ?: {
            run?: any;
            setData?: any; 
        },
        otherInfo ?: {
            run ?: any;
            setData ?: any; 
        }
        
    } = {
        otherInfo: {},
        companyInfo: {},
        contactInfo: {}
    };
    request: any;
    getDom() {
        switch (this.state.type) {
            case 'contactInfo':
                return <ContactInfo name={'BorrowerRelation'} watcher={this.setData.contactInfo} data={this.state.data.BorrowerRelation} />;
            case 'companyInfo':
                return <CompanyInfo name={'BorrowerCompany'} watcher={this.setData.companyInfo} data={this.state.data.BorrowerCompany} />;
            case 'otherInfo':
                return <OtherInfo name={'Remark'} watcher={this.setData.otherInfo} maritalStatus={this.state.data.MaritalStatus} data={this.state.data.Remark} />;
        }
    }
    componentDidMount() {
        if (this.props.isExit) {
            this.getInfo();
        }
    }
    confirm() {
        let _data = this.state.data;
        if (this.setData[this.state.type].run) {
            let data = this.setData[this.state.type].run();
            _data =  Object.assign({}, _data, data);
        }
        let _options: ReqOption<ParameterName.addBorrowerDetailInfo> = {
            data: _data,
            fail: (e) => {
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false
                });
            },
            succeed: () => {
                this.setState({
                    isLoading: false
                });
                this.props.onChangeDataState(this.props.name, true);
                this.props.onChangeStep('applyList');
            }
        };
        this.request = req(ParameterName.addBorrowerDetailInfo, _options);
    }
    getInfo() {
        let _options: ReqOption<ParameterName.getBorrowerDetailInfo> = {
            data: {
                BorrowerId: this.props.borrowerId,
                Token: sessionData.getData('Token'),
            },
            fail: (e) => {
                alert(e.ErrMsg);
                this.setState({
                    pageLoading: false
                })
            },
            succeed: (e) => {
                let _data = this.state.data;
                if(this.state.type === 'contactInfo'){
                    this.setData.contactInfo.setData(e.Value['BorrowerRelation'])
                }else if(this.state.type === 'companyInfo'){
                    this.setData.companyInfo.setData(e.Value['BorrowerCompany'])
                }else if(this.state.type === 'otherInfo'){
                    let _data = {
                        MaritalStatus: e.Value.MaritalStatus,
                        Remark: e.Value.Remark
                    }
                    this.setData.otherInfo.setData(_data)
                }
                
                _data = Object.assign({}, _data, e.Value);
                this.setState({
                    data: _data,
                    pageLoading: false
                });
            }
        };
        req(ParameterName.getBorrowerDetailInfo, _options);
    }
    componentWillUnmount(){
    }
    render() {
        return <div style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            justifyContent: 'space-between', height: '100%'
        }}>
            <PageLoading show={this.state.pageLoading} />
            <div style={{ display: 'flex' }}>
                <TabButton onClick={() => this.changeType('contactInfo')} clicked={this.state.type === 'contactInfo'}>
                    联系人信息
                </TabButton>
                <TabButton onClick={() => this.changeType('companyInfo')} clicked={this.state.type === 'companyInfo'}>
                    公司信息
                </TabButton>
                <TabButton onClick={() => this.changeType('otherInfo')} clicked={this.state.type === 'otherInfo'}>
                    其他信息
                </TabButton>
            </div>
            <div style={{ flex: '10', overflow: 'auto' }}>
                {this.getDom()}
            </div>
            <div style={{ display: 'flex', height: '40px' }}>
                <CancelButton onClick={() => this.props.onChangeStep('applyList')} style={{ height: '40px', borderRadius: '0', width: '50%' }}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm} style={{ height: '40px', borderRadius: '0', width: '50%' }}>
                    {!this.state.isLoading ? '确认' : <InnerProgress hidden={false} height='32px' />}
                </PrimaryButton>
            </div>
        </div>;
    }
}
