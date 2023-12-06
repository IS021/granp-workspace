import { ChangeDetectionStrategy, Component, Output, EventEmitter, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraService } from '../camera.service';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'gp-image-selector',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageSelectorComponent {

    @Output() profilePicture: EventEmitter<string> = new EventEmitter<string>();

    cameraService = inject(CameraService);
    cdRef = inject(ChangeDetectorRef);

    imageSelected = false;
    picture?: string;

    takePicture() {
        this.cameraService.takePicture().then((picture) => {
            this.picture = picture;
            this.profilePicture.emit(picture);
            this.imageSelected = true;
            this.cdRef.detectChanges();
        });
    }

}
