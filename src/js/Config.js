/* ===== Game behavior ===== */
export let GAME_BEHAVIOR = 'END';
export const gameBehaviorSwitch = (behavior) => GAME_BEHAVIOR = behavior;

/* ===== Config ===== */
export default class Config {

    constructor() {

		this.canvasWidth = 480;				// Width game canvas
		this.canvasHeight = 480;			// Height game canvas
		this.sleepKey = 50;					// Duration press key (50ms)
        this.step = 0;                      // Step
	    this.maxStep = 6;                   // Max step - fps
	    this.sizeCell = 16;                 // Size cell
	    this.sizeEat = this.sizeCell / 4;   // Size eat for snake
	    this.storage = null;                // Single storage name
	    this.storageTheme = 'game_theme';   // Storage name
	    this.storageColor = 'game_color';   // Storage name
	    this.appName = 'Cyber Snake';   	// Game name
		
    }
    
}