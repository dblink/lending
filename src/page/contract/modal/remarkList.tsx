import * as React from 'react';
import { Paging } from '../../../components/paging/paging';
import { PageInfo, ParameterName, Parameter } from '../../../components/request/setting';
import { Table } from '../../../components/table/commonTable';
import { ReqOption, req } from '../../../components/request';
import { sessionData } from '../../../components/sessionData/sessionData';
import { logOut } from '../../../components/fail/logOut';
import { PrimaryButton, HrefButton, CancelButton } from '../../../components/button';
import { ModalTitle } from '../../../components/modal/title';
import { ImageFile } from '../../../components/showImage';
import { AddRemark } from '../../../module/applyContentDetail/borrowerInfoDetail/otherInfo/addRemark';
import { PageLoading, InnerProgress } from '../../../components/progress/progress';
import { load } from '../../../components/loading/loading';

interface Props {
    ContractId: string;
    closeModal: any;
}

interface State {
    page: 'list' | 'showImage' | 'showRemark' | 'postImage' | 'addRemark';
    data: any;
    recordId: string;
}

export class PostLoan extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            page: 'list',
            data: '',
            recordId: '' 
        }
        this.changePage = this.changePage.bind(this);
    }
    changePage(page: State['page'], recordId ?: string, data ?: string){
        this.setState({
            page: page,
            data: data,
            recordId: recordId
        })
    }
    getDom(){
        switch(this.state.page){
            case 'list':
                return <PostLoanList postPage={this.changePage}
                    ContractId={this.props.ContractId} closeModal={this.props.closeModal} />
            case 'postImage':
                return <PostImage ContractId={this.props.ContractId} 
                    RecordId={this.state.recordId} postPage={()=>{this.changePage('list')}} />
            case 'addRemark': 
                return <AddContractRemark ContractId={this.props.ContractId} changePage={this.changePage} />
            case 'showRemark':
                return <ShowRemark data={this.state.data} cancel={()=>{this.changePage('list')}} />
            case 'showImage': 
                return <ShowImage cancel={()=>{this.changePage('list')}} ContractId={this.props.ContractId} PostLoanRecordId={this.state.recordId} />
        }
            
    }
    render() {
        return <div style={{
            background: '#FFF', position: 'relative',
            display: 'flex', flexDirection:'column', 
            justifyContent: 'space-between', 
            height: '500px', width: '500px'}}>
            <ModalTitle>
                贷后管理
            </ModalTitle>
            {
                this.getDom()
            }
        </div>
    }
}
type PostLoanListProps = {
    ContractId: any;
    closeModal: any;
    postPage : (data: State['page'], id ?: string, page ?: string)=>void;
}
type PostLoanListState = {
    pageInfo: PageInfo;
    data: Parameter<ParameterName.getPostLoanRecordItems>;
    dataList: any[];
    pageLoading: boolean;
    isLoading: boolean;
}
class PostLoanList extends React.Component<PostLoanListProps, PostLoanListState>{
    constructor(props:PostLoanListProps){
        super(props);
        this.state = {
            pageInfo: {},
            data: {
                ContractId: this.props.ContractId,
                PageSize: '5',
                PageIndex: '1',
                Token: sessionData.getData('Token')
            },
            pageLoading: false,
            isLoading: true,
            dataList: []
        };
        this.getList =  load.run.call(this,this.getList, 'pageLoading');
        this.changePage = load.isLoading.call(this, this.changePage, 'pageLoading');
    }
    componentDidMount(){
        this.getList();
    }
    getList(){
        let _req: ReqOption<ParameterName.getPostLoanRecordItems>;
        _req = {
            data: this.state.data,
            fail: logOut((e)=>{
                alert(e.ErrMsg)
            }),
            succeed: (data)=>{
                this.setState({
                    isLoading: false,
                    pageLoading: false,
                    pageInfo: data.Value.PageInfo,
                    dataList: data.Value.PagedList
                })
            }
        };
        req(ParameterName.getPostLoanRecordItems, _req)
    }
    changePage(num: any){
        let _data = this.state.data;
        _data.PageIndex = num;
        this.setState({
            data: _data
        }, this.getList)
    }
    render(){
        let Tab = Table.CommonTable
        return [
        <div style={{display: 'flex', height: '40px', position: 'relative'}}>
            <PrimaryButton onClick={()=>{this.props.postPage('addRemark')}}>添加备注</PrimaryButton>
            <Paging changePage={this.changePage} lastPage={this.state.pageInfo.PageCount} 
                totalSize={this.state.pageInfo.TotalCount} index={this.state.pageInfo.PageIndex} />
            <PageLoading hideContent={true} show={this.state.isLoading} />
        </div>,
        <div style={{height: '100%', position: 'relative'}}>
            <Tab list={this.state.dataList} setting={[
                {
                    attr: 'CreateTime',
                    head: '创建时间'
                },
                {
                    attr: 'Remark',
                    head: '备注',
                    format: (data)=>{
                        return <HrefButton onClick={()=>{this.props.postPage('showRemark', '', data.Remark)}}>
                            查看备注
                        </HrefButton>
                    }
                },{
                    attr: 'OperatorEmployeeName',
                    head: '操作人'
                },{
                    attr: 'Id',
                    head: '操作',
                    format: (data)=>{
                        return <div>
                            <HrefButton style={{width: 'auto'}} onClick={()=>this.props.postPage('showImage', data.Id)}>查看图片</HrefButton>
                            <HrefButton style={{width: 'auto'}} onClick={()=>this.props.postPage('postImage', data.Id)}>上传图片</HrefButton>
                        </div>
                        
                    }
                }]} />
            <PageLoading show={this.state.pageLoading} />
        </div>,
        <div style={{height: '40px'}}>
            <CancelButton style={{height: '100%'}} onClick={()=>this.props.closeModal()}>关闭</CancelButton>
        </div>
        ]
    }
}
type PostImageState = {
    data: Parameter<ParameterName.uploadPostLoanImage>;
    isLoading: boolean;
    img: any;
}
type PostImageProps = {
    ContractId: string;
    RecordId: string;
    postPage: ()=>void;
}
class PostImage extends React.Component<PostImageProps ,PostImageState>{
    constructor(props: PostImageProps){
        super(props);
        this.state = {
            data: {
                ContractId: props.ContractId,
                PostLoanRecordId: props.RecordId,
                Token: sessionData.getData('Token')
            },
            isLoading: false,
            img: {
                img1: '',
                img2: '',
                img3: ''
            }
        }
        this.confirm = load.run.call(this, this.confirm, 'isLoading');
        this.getData = load.isLoading.call(this, this.getData, 'isLoading');
    }
    getData(name: string, value: any, file: any){
        let _img = this.state.img;
        _img[`img${name}`] = file;
        this.setState({
            img: _img
        })
    }
    confirm(){
        let _req: ReqOption<ParameterName.uploadPostLoanImage>,
            formData = new FormData();
        formData.append('img1', this.state.img.img1);
        formData.append('img2', this.state.img.img2);
        formData.append('img3', this.state.img.img3);
        Object.keys(this.state.data).map((data)=>{
            formData.append(data, this.state.data[data as 'Token'])
        })
        _req = {
            data: formData,
            succeed: (e)=>{
                alert('上传成功！');
                this.setState({
                    isLoading: false
                }, this.props.postPage)
            },
            fail: logOut((e)=>{
                alert(e.ErrMsg)
                this.setState({
                    isLoading: false
                })
            })
        }
        req(ParameterName.uploadPostLoanImage, _req);
    }
    render(){
        return[ <div style={{overflow: 'auto'}}>
            <ImageFile loading={this.state.isLoading} name='1' getData={this.getData} >
                上传图片
            </ImageFile>
            <ImageFile loading={this.state.isLoading} name='2' getData={this.getData} >
                上传图片
            </ImageFile>
            <ImageFile loading={this.state.isLoading} name='3' getData={this.getData} >
                上传图片
            </ImageFile>
        </div>,
        <div>
            <div style={{height: '40px', display: 'flex'}}>
                <CancelButton style={{height: '100%'}} onClick={this.props.postPage}>
                    关闭
                </CancelButton>
                <PrimaryButton style={{height: '100%'}} onClick={this.confirm}>
                    {this.state.isLoading ? <InnerProgress height='32px' /> : '确认'} 
                </PrimaryButton>
            </div>
        </div>]
    }
}

type AddContractRemarkProps = {
    changePage: (data: State['page'])=>void;
    ContractId: string;
}

type AddContractRemarkState = {
    data: Parameter<ParameterName.addPostLoanRecord>;
    isLoading: boolean;
}

class AddContractRemark extends React.Component<AddContractRemarkProps, AddContractRemarkState>{
    constructor(props: AddContractRemarkProps){
        super(props);
        this.state = {
            data: {
                ContractId: props.ContractId,
                Remark: '',
                Token: sessionData.getData('Token')
            },
            isLoading: false
        }
        this.confirm = load.run.call(this, this.confirm);
        this.changeRemark = load.isLoading.call(this, this.changeRemark);
    }
    changeRemark(e: any){
        let _data = this.state.data;
        _data.Remark = e.target.value;
        this.setState({
            data: _data
        })
    }
    request:any;
    confirm(){
        let _req: ReqOption<ParameterName.addPostLoanRecord>;
        _req = {
            data: this.state.data,
            succeed: (e)=>{
                alert('添加成功！')
                this.setState({
                    isLoading: false
                })
                this.props.changePage('list')
            },
            fail: logOut((e)=>{
                alert(e.ErrMsg)
                this.setState({
                    isLoading: false
                })
            })
        }
        this.request = req(ParameterName.addPostLoanRecord, _req);
    }
    componentWillUnmount(){
        if(this.request){
            this.request.close()
        }
    }
    render(){
        return [<textarea
                key={1}
                value={this.state.data.Remark}
                placeholder='添加备注' onChange={this.changeRemark}
                style={{height: '100%', resize: 'none',
                    width: '90%', padding: '10px', fontSize:'14', margin: '20px auto'}}>
            </textarea>,
            <div key={2} style={{height: '40px', minHeight: '40px', display: 'flex'}}>
                <CancelButton style={{height: '100%'}} onClick={()=>this.props.changePage('list')}>
                    取消
                </CancelButton>
                <PrimaryButton style={{height: '100%'}} onClick={this.confirm}>
                    { this.state.isLoading ? <InnerProgress height='32px' /> : '确认'}
                </PrimaryButton>
            </div>]
    }
}

type ShowRemarkProps = {
    data: any;
    cancel: ()=>void;
}

class ShowRemark extends React.Component<ShowRemarkProps, any>{
    constructor(props: ShowRemarkProps){
        super(props);
    }
    render(){
        return [<div style={{height: '100%', 
            wordBreak: 'break-all',
            padding: '10px',
            overflow: 'auto'}}>
            {
                this.props.data
            }
        </div>,
        <div style={{height: '40px'}}>
            <CancelButton style={{height: '100%'}} onClick={this.props.cancel}>
                关闭
            </CancelButton>
        </div>
        ]
    }
}

type ShowImageProps = {
    cancel: ()=>void;
    ContractId: string;
    PostLoanRecordId: string;
}
type ShowImageState = {
    data: Parameter<ParameterName.selectRecordBorrowerImage>;
    img: any[],
    isLoading: boolean
}

class ShowImage extends React.Component<ShowImageProps ,ShowImageState>{
    constructor(props: ShowImageProps){
        super(props);
        this.state = {
            data: {
                ContractId: props.ContractId,
                PostLoanRecordId: props.PostLoanRecordId,
                Token: sessionData.getData('Token')
            },
            isLoading: false,
            img : []
        }
        this.getImageList = load.run.call(this, this.getImageList);
    }
    componentDidMount(){
        this.getImageList()
    }
    getImageList(){
        let _req: ReqOption<ParameterName.selectRecordBorrowerImage>;
        _req = {
            data: this.state.data,
            succeed: (data)=>{
                this.setState({
                    isLoading: false,
                    img: data.Value
                })
            },
            fail: logOut((data)=>{
                alert(data.ErrMsg);
                this.setState({
                    isLoading: false
                })
            })
        }
        req(ParameterName.selectRecordBorrowerImage, _req);
    }
    render(){
        return [<div style={{height: '100%', overflow: 'auto', position: 'relative'}}>
            {
                this.state.img.map((value)=>{
                    return <img style={{width: '100%'}} src={value} />
                })
            }
            <PageLoading show={this.state.isLoading} />
            </div>,
            <div style={{height: '40px'}}>
                <CancelButton style={{height: '100%'}} onClick={this.props.cancel}>
                    关闭
                </CancelButton>
            </div>
        ]
    }
}