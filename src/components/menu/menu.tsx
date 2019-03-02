import * as React from 'react';
import { Vertical } from './base/vertical';
import { Icon } from '../icon/icon';
import { browserHistory } from '../../router';
import { sessionData } from '../sessionData/sessionData';

interface Props {}

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
    }[] = sessionData.getData('UserMenuItems');
    render() {
        return <div style={{width: '260px', display:'flex', flexDirection: 'column'}}>
            <img src='img/logoTitle.png' 
                style={{
                    width: '100%'
                    }} />
            <div style={{height: '100%', 
                overflow:'auto',
                display:'flex', flexDirection: 'column'}}>
                {
                    this.list.map((value)=>{
                        return <div style={{height: '100%'}}>
                            <MenuItem text={value.MenuName} 
                                url={value.Url}
                                className={location.pathname === value.Url ? 'click' : ''}
                                iconName={value.Icon}>
                                {
                                    value.Items.length > 0 
                                    && value.Items.map((value)=>{
                                        return <MenuItem text={value.MenuName} 
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
            show: true
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
        <Vertical text={this.props.text}
            className={this.props.className}
            iconName={this.props.iconName}
            style= {this.props.style}
            onClick={this.clickTrigger} >  
        </Vertical>,
        (this.state.show && this.props.children)
         ? this.props.children : '']
    }
}