export interface CropperOption {
    ratio?: number;
    notCrop?: boolean;
    roundCropper?: boolean;
}

export interface CropperFileOption extends CropperOption {
    file: File;
}