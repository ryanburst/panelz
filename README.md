# Panelz Reader Client Application

## Configuration options
```
{
    /**
     * The container to load the comic reader into.
     * Should be a jQuery selector
     *
     * @type {String}
     * @default
     */
    container: '.panelz-creator-container',

    /**
     * ID of the book to load when fetching the data.
     * This value is required if a <#comic> object
     * has not been provided.
     *
     * @type {Boolean}
     * @default
     */
    id: false,

    /**
     * Object of comic data to load into the reader. Must
     * contain an id, title, and array of pages. Each page
     * object must look like the following:
     *     {
     *         url: "<urlOfImage>",
     *         size: <size> //in bytes
     *         panels: [
     *             {
     *                 x: xCoordinateOfPanel
     *                 y: yCoordinateOfPanel
     *                 width: widthOfPanel
     *                 height: heightOfPanel
     *             }
     *             ...
     *         ]
     *     }
     * The panels array within each page can be empty if the
     * page contains to panels to zoom to for the Panel Zoom feature.
     *
     * @type {Object}
     * @default
     */
    comic: {
        id: false,
        title: false,
        pages: []
    },

    /**
     * Supply a custom list of endpoints. The Panelz reader
     * only requires a single endpoint for fetching comic data
     * via the supplied <#id> configuration.
     *
     * The {id} placeholder will be swapped for the supplied
     * <#id> configuration parameter.
     *
     * @type {Object}
     * @default
     */
    endpoints: {
        get: '/comic/{id}'
    }
}
```

## Update Table
Below is a table with a list of feedback from previous group discussions and how
they were addressed in this round of coding.

| Feedback | How it was Addressed |
| --- | --- |
| Not zooming in on panel they tap on | Added panel detection on double tap. Since new users may get confused when switching to Panel Zoom Mode a setting option for turning this on and off has been added to the settings as well as the customize settings section.
| Not zooming in on area that's being pinched on | Changing the pinch origin is extremely tricky, so added the ability to pan while pinching to create the more fluid effect of zooming in on the correct area
| Scaling out in pinch zoom seems buggy | Fixed zoom out scaling
| On a slower connection just got a blank screen until the book was loaded, difficult to tell load state | Added a progress load bar
| Page mode is listed second in the tutorial, but it's the default (and first A-Z) | Switched Page Mode to be first and added `(default)` to all default options in the tutorial
| Double tap tutorial image could be clearer | Switched all tutorial images to show full page and chose pages that best displayed that tutorial items interaction
| Order of letterboxing and transitions in customize settings is not in logical order | Changed to be in logical order
| Letterboxing is not clear for new users | Added description of letterboxing on relevant tutorial page
| No `Mode change`, `Show full page on exit`, or `Show full page on enter` in tutorial's customize settings | Added all book specific options to customize tutorial final page
| Improvement | Added comic title, current page number, and total page numbers to the popup menu (top)
| Improvement | Added `End of Comic` message when the user has reached the end of the comic
| Improvement | Fully commented code
