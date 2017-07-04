/**
 * Class for representing the a panel within a page.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */
class Panel {
    /**
     * Initializes the new panel object. Sets a number
     * of local properties based on the passed in configuration
     *
     * @constructs Panel
     * @param  {Page}   page   Page class instance
     * @param  {Object} config Configuration
     * @param  {Number} index  Index of panels within page
     */
    constructor(page,config,index) {
        this.page = page;
        this.index = index;
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        this.nextPanel = this.page.config.panels[index+1]
            ? index + 1 : false;
        this.previousPanel = this.page.config.panels[index-1]
            ? index - 1 : false;
    }

    /**
     * Gets the width of the panel.
     *
     * @return {Number}
     */
    getWidth() {
        return this.width;
    }

    /**
     * Gets the height of the panel.
     *
     * @return {Number}
     */
    getHeight() {
        return this.height;
    }

    /**
     * Gets the x value
     *
     * @return {Number}
     */
    getLeftPos() {
        return this.x;
    }

    /**
     * Gets the y value
     *
     * @return {Number}
     */
    getTopPos() {
        return this.y;
    }
}
