import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('video1') videoRef: ElementRef;
  @ViewChild('canvas1') canvasRef: ElementRef;
  cameraType: string = 'user';
  private canvas: any;
  private video: any;
  public videoCapable = true;
  public pictureTaken = false;
  public downloadLink: string;
  private mediaStream: any;
  constructor() { }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.configMedia();
  }

  configMedia(){
    this.canvas = this.canvasRef.nativeElement;
    this.video = this.videoRef.nativeElement;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: this.cameraType
        },
        audio: false
      })
      .then(stream => {
        this.mediaStream = stream;
        this.videoCapable = true;
        const that = this;
        this.video.srcObject = this.mediaStream;
        this.video.play().then(value => {
          that.canvas.width = that.video.videoWidth;
          that.canvas.height = that.video.videoHeight;
        });
      })
      .catch(err => {
        this.videoCapable = false;
      });
    }
  }

  onSnap() {
    this.canvasRef.nativeElement.height = this.videoRef.nativeElement.videoHeight;
    this.canvasRef.nativeElement.width = this.videoRef.nativeElement.videoWidth;
    const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
    ctx.drawImage(this.video , 0, 0, this.canvas.width, this.canvas.height);
    this.pictureTaken = true;
    this.downloadLink = this.canvas.toDataURL();
  }

  switchCamera(){
    if(this.cameraType === 'user'){
      this.cameraType = 'environment';
    } else {
      this.cameraType = 'user';
    }
    this.configMedia();
  }
}
