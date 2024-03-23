import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-tutorial-videos',
  templateUrl: './tutorial-videos.component.html',
  styleUrls: ['./tutorial-videos.component.css'],
})
export class TutorialVideosComponent implements OnInit {
  linksvideo?: any;
  links: any = [
    'https://bcoder-dev-bucket.s3.ap-south-1.amazonaws.com/chakde11/ed343380ab019ae3b0f0842da63fe8841804260d.mp4',
  ];

  accountType: any;
  constructor(
    public dialogRef: MatDialogRef<TutorialVideosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.accountType = localStorage.getItem('userAccountType');
  }

  ngOnInit(): void {
    this.linksvideo =
      'https://bcoder-dev-bucket.s3.ap-south-1.amazonaws.com/chakde11/ed343380ab019ae3b0f0842da63fe8841804260d.mp4';
  }

  @ViewChild('videos') videosElement?: ElementRef;

  playVideo(item: any) {
    this.linksvideo = item;
    const videoElement: HTMLVideoElement = this.videosElement?.nativeElement;
    videoElement.load();
    videoElement.play();
  }
}

// playVideo(url: string) {
//   this.video.nativeElement.src = url;
//   this.video.nativeElement.load();
//   this.video.nativeElement.play();
// }
