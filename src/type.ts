export enum FileType {
    JPEG = 'image/jpeg',
    PNG = 'image/png',
}

export interface IUploadFile {
    _eventsCount: number,
    _maxListeners: undefined,
    size: number,
    path: string,
    name: string,
    type: FileType,
    hash: null,
    lastModifiedDate: Date,
    _writeStream: any
}