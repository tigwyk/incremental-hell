export class OilSpeedup {
    label: string
    oilPerSecond: number;
    speedMultiplier: number;


    constructor(label: string, oilPerSecond: number, speedMultiplier: number) {
        this.label = label;
        this.oilPerSecond = oilPerSecond;
        this.speedMultiplier = speedMultiplier;
    }
}
