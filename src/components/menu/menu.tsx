import * as React from 'react';
import { Vertical } from './base/vertical';
import { Icon } from '../icon/icon';
import { browserHistory } from '../../router';
import { sessionData } from '../sessionData/sessionData';
import { HrefButton } from '../button';
import { ChangePassword, ShowModal } from '../modal/changePassword';

interface Props {
    location ?:any;
}

interface State {}

export class Menu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }
    list: {
        "Id": string,
        "Icon": string,//菜单图标名称
        "MenuName": string,
        "Url": string,//路由地址
        "ParentId": string,//父id 0表示没有父级
        "Items": {
            "Id": string,
            "Icon": string,//菜单图标名称
            "MenuName": string,
            "Url": string,//路由地址
            "ParentId": string,//父id 0表示没有父级
        }[]//子菜单列表
    }[] = sessionData.getData('UserMenuItems') || [];
    modal:ShowModal = {
        closeModal: ()=>{},
        showModal: ()=>{}
    }
    render() {
        return <div style={{width: '260px', display:'flex', flexDirection: 'column'}}>
            <img src='img/logoTitle.png' 
                style={{
                    width: '100%'
                    }} />
            <div style={{display: 'flex',padding: '10px 20px', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{fontSize: '14px'}}>
                    你好，{sessionData.getData('UserInfo').Name}
                </div>
                <HrefButton onClick={()=>{this.modal.showModal()}}
                  style={{fontSize: '14px', width: 'auto'}} >修改密码</HrefButton>
                <HrefButton onClick={()=>{
                    sessionData.clear();
                    browserHistory.replace('/', {from: location.pathname});
                }}  style={{fontSize: '14px', width: 'auto'}} >注销</HrefButton>
            </div>
            <div style={{height: '100%', 
                overflow:'auto',
                display:'flex', flexDirection: 'column'}}>
                {
                    this.list.map((value, key)=>{
                        return <div key={key}>
                            <MenuItem text={value.MenuName} 
                                url={value.Url}
                                className={location.pathname === value.Url ? 'click' : ''}
                                iconName={value.Icon}>
                                {
                                    value.Items.length > 0 
                                    && value.Items.map((value,key)=>{
                                        return <MenuItem key={key+1} text={value.MenuName} 
                                        url={value.Url}
                                        className={location.pathname === value.Url ? 'click' : ''}
                                        style={{paddingLeft: '50px'}}
                                        iconName={value.Icon} />
                                    })
                                }
                            </MenuItem>
                    </div>
                    })
                }
            </div>
            <div style={{fontSize: '14px', lineHeight: '20px' ,
                color: '#ccc', textAlign:'center',
                minHeight: '20px'}}>
                苏ICP备18048568号-1
            </div>
            <ChangePassword modal={this.modal} />
        </div>
    }
}
type MenuItemState = {
    show: boolean;
}
type MenuItemProps = {
    url ?: string;
    text : string;
    iconName: string;
    className ?: string;
    style ?: React.CSSProperties;
}
class MenuItem extends React.Component<MenuItemProps, MenuItemState>{
    constructor(props: any){
        super(props);
        this.state = {
            show: false
        }
        this.clickTrigger = this.clickTrigger.bind(this);
    }
    clickTrigger(){
        if(this.props.children){
            this.setState({
                show: !this.state.show
            })
        }else{
            browserHistory.push(this.props.url)
        }
    }
    render(){
        return [
        <Vertical key={0} text={this.props.text}
            className={this.props.className}
            iconName={this.props.iconName}
            style= {this.props.style}
            onClick={this.clickTrigger} >  
        </Vertical>,
        (this.state.show && this.props.children)
         ? this.props.children : '']
    }
}