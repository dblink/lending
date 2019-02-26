import * as React from 'react';
import {ChangeEvent} from "react";

export class OnChangeImage extends React.Component <any, any>{
    constructor(props: any){
        super(props);
        this.fileOnchange = this.fileOnchange.bind(this);
    }
    dom: HTMLCanvasElement;
    fileOnchange(e: ChangeEvent<HTMLInputElement>){
        if(this.props.loading){
            e.preventDefault();
            return;
        }
        let file = e.target.files[0];
        if(!file)return;
        let reader = new FileReader();
        let _this = this;
        reader.readAsDataURL(file);
        reader.onload = (event: any) => { // 文件读取完成时触发
            let result = event.target.result;// base64格式图片地址
            let image = new Image();
            let _this = this;
            //image.setAttribute('style', 'width: 500px');
            image.src = result; // 设置image的地址为base64的地址
            image.onload = function(){
                let imageWidth = image.width;
                let imageHeight = image.height;
                let _marginX;

                imageWidth = 250 * imageWidth / imageHeight;
                imageHeight = 250;
                _marginX = (500 - imageWidth) /2;

                //let canvas = document.createElement('canvas');
                //let canvas = document.querySelector(`#${_this.props.canvasId}`) as HTMLCanvasElement;
                let canvas = _this.dom;
                let context = canvas.getContext("2d");
                canvas.width = 500; // 设置canvas的画布宽度为图片宽度
                canvas.height = 250;
                canvas.setAttribute('class','z-index-1');

                context.drawImage(image, _marginX, 0, imageWidth, imageHeight); // 在canvas上绘制图片
                //let dataUrl = canvas.toDataURL('image/jpeg', 0.92);// 0.92为压缩比，可根据需要设置，设置过小会影响图片质量
                                                                   // dataUrl 为压缩后的图片资源，可将其上传到服务器
                //_this.props.getData(_this.props.name, file);
                _this.props.getData(_this.props.name, canvas);
            }
        }
    }
}