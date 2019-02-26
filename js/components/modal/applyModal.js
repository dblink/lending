var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { BaseModal } from './base/baseModal';
import { BankCardInput, ApplyInput } from '../input';
import { PrimaryButton, CancelButton, TabButton, HrefButton } from '../button';
import { ApplyContent } from '../menu/applyContent';
import { req } from '../request';
import { ParameterName } from '../request/setting';
import { InnerProgress } from '../progress/progress';
import { ImageFile } from '../showImage';
import { Table } from '../table/commonTable';
import { ApplySelect } from '../select';
var ApplyModal = /** @class */ (function (_super) {
    __extends(ApplyModal, _super);
    function ApplyModal(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            step: 'inputCard',
            dataState: {},
            card: '',
            type: ''
        };
        _this.changeStep = _this.changeStep.bind(_this);
        _this.setDataState = _this.setDataState.bind(_this);
        _this.onChangeDataState = _this.onChangeDataState.bind(_this);
        _this.setCard = _this.setCard.bind(_this);
        _this.setType = _this.setType.bind(_this);
        return _this;
    }
    ApplyModal.prototype.changeStep = function (step) {
        this.setState({
            step: step
        });
    };
    //设置数据状态
    ApplyModal.prototype.setDataState = function (data) {
        this.setState({
            dataState: data
        });
    };
    ApplyModal.prototype.onChangeDataState = function (name, status) {
        var _data = this.state.dataState;
        _data[name] = status;
        this.setState({
            dataState: _data
        });
    };
    ApplyModal.prototype.setCard = function (card) {
        this.setState({
            card: card
        });
    };
    ApplyModal.prototype.getStep = function () {
        switch (this.state.step) {
            case 'inputCard': {
                return React.createElement(InputCardModal, { setDataState: this.setDataState, setCard: this.setCard, onChangeStep: this.changeStep });
            }
            case 'applyList': {
                return React.createElement(ApplyContentListModal, { dataState: this.state.dataState, card: this.state.card, setType: this.setType, onChangeStep: this.changeStep });
            }
            case 'applyListDetail': {
                return React.createElement(ApplyContentDetail, { card: this.state.card, dataState: this.state.dataState, setType: this.setType, type: this.state.type, onChangeDataState: this.onChangeDataState, onChangeStep: this.changeStep });
            }
        }
    };
    ApplyModal.prototype.setType = function (str) {
        this.setState({
            type: str
        });
    };
    ApplyModal.prototype.render = function () {
        return React.createElement(BaseModal, { isOpen: true }, this.getStep());
    };
    return ApplyModal;
}(React.Component));
export { ApplyModal };
var Loading = /** @class */ (function () {
    function Loading() {
    }
    Loading.prototype.run = function (func) {
        var _this = this;
        return function () {
            if (_this.state.isLoading) {
                return;
            }
            _this.setState({
                isLoading: true
            }, function () {
                typeof func === 'function' && func.call(_this);
            });
        };
    };
    return Loading;
}());
//输入身份证模块
var InputCardModal = /** @class */ (function (_super) {
    __extends(InputCardModal, _super);
    function InputCardModal(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: {
                card: '',
            },
            isLoading: false,
            error: ''
        };
        _this.changeInput = _this.changeInput.bind(_this);
        //this.searchCard = this.loading.call(this, this.searchCard);
        var loading = new Loading();
        _this.searchCard = loading.run.call(_this, _this.searchCard);
        return _this;
    }
    InputCardModal.prototype.changeInput = function (name, value) {
        var _data = this.state.data;
        _data[name] = value;
        this.setState({
            error: '',
            data: _data
        });
    };
    InputCardModal.prototype.searchCard = function () {
        var _this = this;
        var _options = {
            data: {
                IDCardNo: this.state.data.card,
                Token: '123123'
            },
            fail: function (error) {
                _this.setState({
                    error: error.ErrMsg,
                    isLoading: false
                });
            },
            succeed: function (callBack) {
                _this.setState({
                    isLoading: false
                });
                var _data = {
                    "Status": "SUCCESS",
                    "Value": {
                        "BorrowerId": "4947359977861481873",
                        "ApplyId": "0",
                        "BorrowerDetailInfoId": "0",
                        "ISExsitBorrower": true,
                        "ISApply": false,
                        "ISExsitBorrowerDetail": false,
                        "ISUploadPersonCardState": false,
                        "HoneypotStatus": false,
                        "HoneyBeeStatus": false,
                        "Alipay": false //是否获取支付宝信息
                    }
                };
                //设置状态;
                _this.props.setDataState(_data.Value);
                _this.props.setCard(_this.state.data.card);
                //跳转
                _this.props.onChangeStep('applyList');
            }
        };
        req(ParameterName.getBorrowerStatus, _options);
    };
    InputCardModal.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { style: {
                background: '#fff', padding: '35px', width: '330px'
            } },
            this.state.error && React.createElement("div", { style: { color: 'red' } }, this.state.error),
            React.createElement(BankCardInput, { placeholder: '\u8BF7\u8F93\u5165\u8EAB\u4EFD\u8BC1', name: 'card', value: this.state.data.card, onChange: function (e) { return _this.changeInput('card', e.target.value); } }),
            React.createElement(PrimaryButton, { style: { height: '48px', marginTop: '20px' }, onClick: this.searchCard }, !this.state.isLoading ? '查询身份证' :
                React.createElement(InnerProgress, { hidden: false, height: '32px' })),
            React.createElement(CancelButton, { style: { height: '48px', marginTop: '20px' } }, "\u5173\u95ED"));
    };
    return InputCardModal;
}(React.Component));
//状态列表
var ApplyContentListModal = /** @class */ (function (_super) {
    __extends(ApplyContentListModal, _super);
    function ApplyContentListModal(props) {
        var _this = _super.call(this, props) || this;
        _this.onChangeStep = _this.onChangeStep.bind(_this);
        return _this;
    }
    ApplyContentListModal.prototype.onChangeStep = function (str, name) {
        this.props.setType(name);
        this.props.onChangeStep(str);
    };
    ApplyContentListModal.prototype.render = function () {
        var _this = this;
        //console.log(this.props.dataState);
        return React.createElement("div", { style: { width: '500px',
                height: '660px',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                background: '#Fff' } },
            React.createElement("div", null,
                React.createElement(BankCardInput, { value: this.props.card, disabled: true, borderNone: true }),
                React.createElement(ApplyContent, { dataState: this.props.dataState, onChangeStep: this.onChangeStep })),
            React.createElement("div", { style: { display: 'flex' } },
                React.createElement(CancelButton, { onClick: function () { return _this.props.onChangeStep('inputCard'); }, style: { borderRadius: '0',
                        height: '40px',
                        width: '33%' } }, "\u8FD4\u56DE"),
                React.createElement(CancelButton, { style: { borderRadius: '0',
                        height: '40px',
                        width: '34%'
                    } }, "\u5173\u95ED"),
                React.createElement(PrimaryButton, { style: { borderRadius: '0',
                        height: '40px',
                        width: '33%' } }, "\u786E\u8BA4")));
    };
    return ApplyContentListModal;
}(React.Component));
var ApplyContentDetail = /** @class */ (function (_super) {
    __extends(ApplyContentDetail, _super);
    function ApplyContentDetail(props) {
        var _this = _super.call(this, props) || this;
        _this.changeStep = _this.changeStep.bind(_this);
        return _this;
    }
    ApplyContentDetail.prototype.changeStep = function (step, name) {
        this.props.setType(name);
        this.props.onChangeStep(step);
    };
    ApplyContentDetail.prototype.getTypePage = function () {
        switch (this.props.type) {
            case 'ISApply': return (React.createElement(ApplyInfo, { name: this.props.type, onChangeDataState: this.props.onChangeDataState, id: this.props.dataState.BorrowerId, onChangeStep: this.props.onChangeStep }));
            case 'ISUploadPersonCardState': return (React.createElement(Certification, { name: this.props.type, onChangeDataState: this.props.onChangeDataState, IDCard: this.props.card, onChangeStep: this.props.onChangeStep }));
            case 'ISExsitBorrower': return (React.createElement(BorrowerInfo, { name: this.props.type, userId: this.props.dataState.BorrowerId, isExit: this.props.dataState[this.props.type], card: this.props.card, onChangeDataState: this.props.onChangeDataState, onChangeStep: this.props.onChangeStep }));
            case 'ISExsitBorrowerDetail': return (React.createElement(BorrowerInfoDetail, null));
            default: {
                return React.createElement("div", null, "\u6D4B\u8BD5\u9636\u6BB5");
            }
        }
    };
    ApplyContentDetail.prototype.render = function () {
        return React.createElement("div", { style: { height: '660px',
                display: 'flex',
                background: '#fff'
            } },
            React.createElement("div", { style: { width: '300px' } },
                React.createElement(BankCardInput, { value: this.props.card, disabled: true, borderNone: true }),
                React.createElement(ApplyContent, { dataState: this.props.dataState, onChangeStep: this.changeStep })),
            React.createElement("div", { style: { width: '520px' } }, this.getTypePage()));
    };
    return ApplyContentDetail;
}(React.Component));
//申请借款信息
var ApplyInfo = /** @class */ (function (_super) {
    __extends(ApplyInfo, _super);
    function ApplyInfo(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: {
                Token: '1231231',
                ApplyMoney: '',
                BorrowerId: _this.props.id,
                Period: '',
                Remark: '家庭消费'
            },
            isLoading: false,
            error: ''
        };
        _this.inputChange = _this.inputChange.bind(_this);
        var loading = new Loading();
        _this.confirm = loading.run.call(_this, _this.confirm);
        return _this;
    }
    ApplyInfo.prototype.inputChange = function (name, value) {
        var _data = this.state.data;
        _data[name] = value;
        this.setState({
            data: _data
        });
    };
    ApplyInfo.prototype.confirm = function () {
        var _this = this;
        var _options = {
            data: this.state.data,
            fail: function (error) {
                _this.setState({
                    error: error.ErrMsg
                });
            },
            succeed: function () {
                _this.props.onChangeDataState(_this.props.name, true);
                _this.props.onChangeStep('applyList');
            }
        };
        req(ParameterName.addLoanApplyRecord, _options);
    };
    ApplyInfo.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { style: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } },
            React.createElement("div", null,
                this.state.error && React.createElement("div", { style: { color: 'red' } }, this.state.error),
                React.createElement("div", { style: { color: '#333', fontWeight: 'bold',
                        padding: '20px', textAlign: 'center' } }, "\u7533\u8BF7\u501F\u6B3E\u4FE1\u606F"),
                React.createElement("div", { style: { width: '360px', margin: 'auto' } },
                    React.createElement("div", { style: { marginTop: '20px' } },
                        React.createElement(ApplyInput, { type: 'text', text: '\u7533\u8BF7\u91D1\u989D', onChange: function (e) { return _this.inputChange('ApplyMoney', e.target.value); }, name: 'ApplyMoney', value: this.state.data.ApplyMoney })),
                    React.createElement("div", { style: { marginTop: '20px' } },
                        React.createElement(ApplyInput, { type: 'text', text: '\u7533\u8BF7\u5468\u671F', onChange: function (e) { return _this.inputChange('Period', e.target.value); }, name: 'Period', value: this.state.data.Period })),
                    React.createElement("div", { style: { marginTop: '20px' } },
                        React.createElement(ApplyInput, { type: 'text', text: '\u7528\u9014', disabled: true, value: this.state.data.Remark })))),
            React.createElement("div", { style: { display: 'flex' } },
                React.createElement(CancelButton, { onClick: function () { return _this.props.onChangeStep('applyList'); }, style: { height: '40px', borderRadius: '0', width: '50%' } }, "\u53D6\u6D88"),
                React.createElement(PrimaryButton, { onClick: this.confirm, style: { height: '40px', borderRadius: '0', width: '50%' } }, !this.state.isLoading ? '确认' : React.createElement(InnerProgress, { hidden: false, height: '32px' }))));
    };
    return ApplyInfo;
}(React.Component));
function getBlobFile(_canvas) {
    var _url = _canvas.toDataURL("image/jpeg", 0.8);
    _url = _url.replace('data:image/jpeg;base64,', '');
    var byteString = atob(_url);
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: "image/jpeg" });
}
//实名认证
var Certification = /** @class */ (function (_super) {
    __extends(Certification, _super);
    function Certification(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isLoading: false,
            data: {},
            error: ''
        };
        _this.getData = _this.getData.bind(_this);
        var _loading = new Loading();
        _this.confirm = _loading.run.call(_this, _this.confirm);
        return _this;
    }
    Certification.prototype.getData = function (name, value) {
        var _data = getBlobFile(value);
        var data = this.state.data;
        data[name] = _data;
        this.setState({
            data: data,
            error: ''
        });
    };
    Certification.prototype.confirm = function () {
        var _this = this;
        var _form = new FormData();
        var k;
        for (k in this.state.data) {
            _form.set(k, this.state.data[k]);
        }
        _form.set('IDCard', this.props.IDCard);
        var _options = {
            data: _form,
            fail: function (e) {
                _this.setState({
                    error: e.ErrMsg
                });
            },
            succeed: function (e) {
                //console.log(e.Value);
                _this.props.onChangeDataState(_this.props.name, true);
                _this.props.onChangeStep('applyList');
            }
        };
        req(ParameterName.uploadBorrowerImage, _options);
    };
    Certification.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } },
            this.state.error
                && React.createElement("div", { className: 'z-index-100', style: { color: 'red', position: 'absolute',
                        width: '490px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.49)' } }, this.state.error),
            React.createElement("div", { style: { height: '620px', overflow: 'auto' } },
                React.createElement(ImageFile, { getData: this.getData, loading: false, name: 'zheng.jpg' }, "\u8EAB\u4EFD\u8BC1\u6B63\u9762"),
                React.createElement(ImageFile, { getData: this.getData, loading: false, name: 'fan.jpg' }, "\u8EAB\u4EFD\u8BC1\u53CD\u9762"),
                React.createElement(ImageFile, { getData: this.getData, loading: false, name: 'shou.jpg' }, "\u624B\u6301\u8EAB\u4EFD\u8BC1")),
            React.createElement("div", { style: { height: '40px', display: 'flex' } },
                React.createElement(CancelButton, { onClick: function () { return _this.props.onChangeStep('applyList'); }, style: { height: '40px', borderRadius: '0', width: '50%' } }, "\u53D6\u6D88"),
                React.createElement(PrimaryButton, { onClick: this.confirm, style: { height: '40px', borderRadius: '0', width: '50%' } }, !this.state.isLoading ? '确认' : React.createElement(InnerProgress, { hidden: false, height: '32px' }))));
    };
    return Certification;
}(React.Component));
//借款人信息
var BorrowerInfo = /** @class */ (function (_super) {
    __extends(BorrowerInfo, _super);
    function BorrowerInfo(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: {},
            isLoading: false,
            error: ''
        };
        var loading = new Loading();
        _this.inputChange = _this.inputChange.bind(_this);
        _this.confirm = loading.run.call(_this, _this.confirm);
        _this.getInfo = loading.run.call(_this, _this.getInfo);
        return _this;
    }
    BorrowerInfo.prototype.componentDidMount = function () {
        if (this.props.isExit) {
            this.getInfo();
        }
    };
    BorrowerInfo.prototype.getInfo = function () {
        var _this = this;
        var _options = {
            data: {
                BorrowerId: this.props.userId,
                Token: '123123'
            },
            fail: function (e) {
                alert(e.ErrMsg);
            },
            succeed: function (e) {
                var _data = {
                    "Id": "5110385289942694150",
                    "RealName": '测试',
                    "IDCardNo": "12313",
                    "Mobile": '123123',
                    "Birthday": null,
                    "Sex": false,
                    "Status": 2,
                    "HouseholdAddress": '123',
                    "Email": '123' //借款人邮箱
                };
                _this.setState({
                    data: _data,
                    isLoading: false
                });
            }
        };
        req(ParameterName.getBorrowerBaseInfo, _options);
    };
    BorrowerInfo.prototype.inputChange = function (e) {
        if (this.state.isLoading) {
            return;
        }
        var _data = this.state.data;
        var _name = e.target.name;
        _data[_name] = e.target.value;
        this.setState({
            data: _data
        });
    };
    BorrowerInfo.prototype.getBirthAndSexByCardId = function (card) {
        var _birth = card.substring(6, 10) + "-" + card.substring(10, 12) + "-" + card.substring(12, 14);
        var _sex = parseInt(card.substr(16, 1)) % 2 !== 1;
        return {
            birth: _birth,
            sex: _sex
        };
    };
    BorrowerInfo.prototype.confirm = function () {
        var _this = this;
        var _data = this.state.data;
        var _birthAndSex = this.getBirthAndSexByCardId(this.props.card);
        _data.Birthday = _birthAndSex.birth;
        _data.Sex = _birthAndSex.sex;
        _data.IDCardNo = this.props.card;
        var _options = {
            data: _data,
            fail: function (e) {
                _this.setState({
                    isLoading: false,
                    error: e.ErrMsg
                });
            },
            succeed: function () {
                _this.props.onChangeStep('applyList');
                _this.props.onChangeDataState(_this.props.name, true);
            }
        };
        req(ParameterName.updateBorrowPersonInfo, _options);
    };
    BorrowerInfo.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { style: { display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between' } },
            React.createElement("div", { style: { width: '360px', margin: '0 auto' } },
                React.createElement("div", { style: { color: '#333', fontWeight: 'bold',
                        padding: '20px', textAlign: 'center' } }, "\u501F\u6B3E\u4EBA\u4FE1\u606F"),
                React.createElement("div", { style: { marginTop: '15px' } },
                    React.createElement(ApplyInput, { onChange: this.inputChange, text: '\u771F\u5B9E\u59D3\u540D', name: 'RealName', value: this.state.data.RealName })),
                React.createElement("div", { style: { marginTop: '15px' } },
                    React.createElement(ApplyInput, { onChange: this.inputChange, text: '\u624B\u673A\u53F7\u7801', name: 'Mobile', value: this.state.data.Mobile })),
                React.createElement("div", { style: { marginTop: '15px' } },
                    React.createElement(ApplyInput, { onChange: this.inputChange, text: '\u5BB6\u5EAD\u4F4F\u5740', name: 'HouseholdAddress', value: this.state.data.HouseholdAddress })),
                React.createElement("div", { style: { marginTop: '15px' } },
                    React.createElement(ApplyInput, { onChange: this.inputChange, text: '\u4E2A\u4EBA\u90AE\u7BB1', name: 'Email', value: this.state.data.Email }))),
            React.createElement("div", { style: { height: '40px', display: 'flex' } },
                React.createElement(CancelButton, { onClick: function () { return _this.props.onChangeStep('applyList'); }, style: { height: '40px', borderRadius: '0', width: '50%' } }, "\u53D6\u6D88"),
                React.createElement(PrimaryButton, { onClick: this.confirm, style: { height: '40px', borderRadius: '0', width: '50%' } }, !this.state.isLoading ? '确认' : React.createElement(InnerProgress, { hidden: false, height: '32px' }))));
    };
    return BorrowerInfo;
}(React.Component));
//借款人信息详情
var BorrowerInfoDetail = /** @class */ (function (_super) {
    __extends(BorrowerInfoDetail, _super);
    function BorrowerInfoDetail(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            type: 'contactInfo',
            data: {}
        };
        _this.getDom = _this.getDom.bind(_this);
        _this.changeType = _this.changeType.bind(_this);
        return _this;
    }
    BorrowerInfoDetail.prototype.changeType = function (type) {
        if (this.state.type === type) {
            return;
        }
        if (this.setData.run) {
            //this.setData.run();
            console.log(this.setData.run());
        }
        this.setState({
            type: type
        });
    };
    BorrowerInfoDetail.prototype.getDom = function () {
        switch (this.state.type) {
            case 'contactInfo':
                return React.createElement(ContactInfo, null);
            case 'companyInfo':
                return React.createElement(CompanyInfo, { name: 'BorrowerCompany', watcher: this.setData, data: this.state.data.BorrowerRelation });
            case 'otherInfo':
                return React.createElement(OtherInfo, null);
        }
    };
    BorrowerInfoDetail.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { style: { display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', height: '100%' } },
            React.createElement("div", { style: { display: 'flex' } },
                React.createElement(TabButton, { onClick: function () { return _this.changeType('contactInfo'); }, clicked: this.state.type === 'contactInfo' }, "\u8054\u7CFB\u4EBA\u4FE1\u606F"),
                React.createElement(TabButton, { onClick: function () { return _this.changeType('otherInfo'); }, clicked: this.state.type === 'otherInfo' }, "\u5176\u4ED6\u4FE1\u606F"),
                React.createElement(TabButton, { onClick: function () { return _this.changeType('companyInfo'); }, clicked: this.state.type === 'companyInfo' }, "\u516C\u53F8\u4FE1\u606F")),
            React.createElement("div", { style: { flex: '10', overflow: 'auto' } }, this.getDom()),
            React.createElement("div", { style: { display: 'flex', height: '40px' } },
                React.createElement(CancelButton, { style: { width: '50%', borderRadius: '0' } }, "\u53D6\u6D88"),
                React.createElement(PrimaryButton, { style: { width: '50%', borderRadius: '0' } }, "\u786E\u8BA4")));
    };
    return BorrowerInfoDetail;
}(React.Component));
//联系人信息
var ContactInfo = /** @class */ (function (_super) {
    __extends(ContactInfo, _super);
    function ContactInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContactInfo.prototype.render = function () {
        var Tab = Table.CommonTable;
        return React.createElement("div", null,
            React.createElement(PrimaryButton, { style: { width: '140px',
                    margin: '15px 0',
                    height: '35px' }, onClick: function () { return alert(1); } }, "\u6DFB\u52A0\u8054\u7CFB\u4EBA"),
            React.createElement(Tab, { head: { a: 'a', b: 'b', c: 'c', d: 'd' }, list: [{ a: 1, b: 2, c: 3, d: '4' }] }));
    };
    return ContactInfo;
}(React.Component));
//其他信息
var OtherInfo = /** @class */ (function (_super) {
    __extends(OtherInfo, _super);
    function OtherInfo(props) {
        return _super.call(this, props) || this;
    }
    OtherInfo.prototype.render = function () {
        return React.createElement("div", { style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                width: '360px',
                paddingTop: '20px',
                margin: '0 auto'
            } },
            React.createElement("div", { style: { marginTop: '10px' } },
                React.createElement(ApplySelect, { text: '\u5A5A\u59FB\u60C5\u51B5' })),
            React.createElement("div", { style: {
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    marginBottom: '10px',
                    height: '40px',
                    alignItems: 'center',
                    color: '#777'
                } },
                React.createElement("span", null, "\u5907\u6CE8"),
                React.createElement(HrefButton, { onClick: function () { return alert(1); } }, "\u6DFB\u52A0\u5907\u6CE8")),
            React.createElement("div", { style: { flex: 10, overflow: 'auto' } }, [1].map(function () {
                return React.createElement("div", { style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px'
                    } },
                    React.createElement("span", { style: { flex: 10, wordBreak: 'break-all' } }, "\u5907\u6CE8\u5907\u6CE8\u5907\u6CE8\u5907\u6CE8\u5907\u6CE8\u5907\u6CE8\u5907"),
                    React.createElement(HrefButton, { style: { background: '#ccc' }, onClick: function () { return alert('修改!'); } }, "\u4FEE\u6539"));
            })));
    };
    return OtherInfo;
}(React.Component));
//公司信息
var CompanyInfo = /** @class */ (function (_super) {
    __extends(CompanyInfo, _super);
    function CompanyInfo(props) {
        var _this = _super.call(this, props) || this;
        var _data = JSON.parse(props.data);
        _this.state = {
            data: _data || {}
        };
        _this.inputChange = _this.inputChange.bind(_this);
        _this.props.watcher.run = function () {
            var _data = {};
            _data[_this.props.name] = JSON.stringify(_this.state.data);
            return _data;
        };
        return _this;
    }
    CompanyInfo.prototype.inputChange = function (e) {
        var _name = e.target.name;
        var value = e.target.value;
        var _data = this.state.data;
        _data[_name] = value;
        this.setState({
            data: _data
        });
    };
    CompanyInfo.prototype.componentWillUnmount = function () {
        this.props.watcher.run = null;
    };
    CompanyInfo.prototype.render = function () {
        var _data = this.state.data;
        return React.createElement("div", { style: {
                width: '360px',
                margin: '0 auto',
                paddingTop: '10px'
            } },
            React.createElement("div", { style: { marginTop: '10px' } },
                React.createElement(ApplyInput, { text: '\u516C\u53F8\u540D\u5B57', name: 'CompanyName', onChange: this.inputChange, value: _data.CompanyName })),
            React.createElement("div", { style: { marginTop: '10px' } },
                React.createElement(ApplyInput, { text: '\u516C\u53F8\u5730\u5740', name: 'CompanyAddress', onChange: this.inputChange, value: _data.CompanyAddress })),
            React.createElement("div", { style: { marginTop: '10px' } },
                React.createElement(ApplyInput, { text: '\u90E8\u95E8', name: 'Department', onChange: this.inputChange, value: _data.Department })),
            React.createElement("div", { style: { marginTop: '10px' } },
                React.createElement(ApplyInput, { text: '\u804C\u4F4D', name: 'Position', onChange: this.inputChange, value: _data.Position })),
            React.createElement("div", { style: { marginTop: '10px' } },
                React.createElement(ApplyInput, { text: '\u85AA\u6C34', name: 'Salary', onChange: this.inputChange, value: _data.Salary })));
    };
    return CompanyInfo;
}(React.Component));
//# sourceMappingURL=applyModal.js.map