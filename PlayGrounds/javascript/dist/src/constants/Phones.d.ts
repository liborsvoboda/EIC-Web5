declare type Device = {
    deviceImageUrl: string;
    deviceImageWidth: number;
    deviceImageHeight: number;
    screenWidth: number;
    screenHeight: number;
};
declare const phones: Record<string, Device>;
export default phones;
