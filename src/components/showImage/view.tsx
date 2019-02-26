import * as React from 'react';
import {OnChangeImage} from "./action";

export class ImageFileView extends OnChangeImage{
    constructor(props: any){
        super(props);
        //this.fileOnchange = this.fileOnchange.bind(this);
    }
    render(){
        return <div
            style={{width:'100%', height: "250px", backgroundColor: "#f2f2f2", borderRadius: "4px", border: "1px dashed #666666", position: "relative"}}>
            <div
                style={{
                    height: "250px", width: "100%", backgroundColor: "transparent", position: "absolute", top: 0, left: 0}}
            >
                <input type="file" className="z-index-100" id='personFile'
                       onChange={this.fileOnchange}
                       style={{height: "250px", width: "100%",
                            opacity: 0,
                           position: 'absolute', left: '0', top:'0',
                           backgroundColor: "transparent", cursor: "pointer"}}/>
                <canvas ref={e=>this.dom = e} style={{position: 'absolute', left: '0', top:'0'}}>

                </canvas>
            </div>
            <div style={{width: "20px", height: "20px", position: "absolute", top: "50%", left: "50%", marginLeft: "-12px", marginTop: "-15px"}}>
                <div style={{width: "2px", height: "20px", backgroundColor: "#666666", position: "absolute", top: "0", left: "50%", marginLeft: "-1px"}}>

                </div>
                <div style={{width: "20px", height: "2px", backgroundColor: "#666666", position: "absolute", top: "50%", left: "0", marginTop: "-1px"}}>

                </div>
            </div>
            <div style={{fontSize: "14px", fontWeight: "normal", width: "100%", textAlign: "center", position: "absolute", top: "50%", left: "0", marginTop: "15px", letterSpacing: "1px"}}>
                {this.props.children}
            </div>
        </div>
    }
}
