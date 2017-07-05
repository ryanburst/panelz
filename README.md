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

### Version/Round Two Feedback
[Version Two Demo](https://ryanburst.github.io/panelz/demo/v2.0/)

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
| Improvement | Added `Page X` messaging when switching pages and option in settings to turn it on  or off (off by default)
| Improvement | Fully commented code

### Version/Round One Feedback
[Version One Demo](https://ryanburst.github.io/panelz/demo/v1.0/)
| Feedback | How it was Addressed |
| --- | --- |
| Panel Zoom toggle button on menu doesn't work | Fixed bug that was causing menu toggle to not work
| Panel Zoom toggle button isn't clear when activated or not | Updated toggle button text to reflect what mode you are currently in
| No or inconsistent messaging when switching mode | Added message that always pops up when you switch modes
| Left Handed mode wording is confusing | Clarified wording
| Page index icon was confusing/not clear | Added words/titles alongside iconography
| Ordering of settings seemed off | Switched `Panel Zoom` options to the top and put `General` options at the bottom to follow other application patterns
| Opening copy on tutorial seemed a little stand-offish to newer users | Updated copy to be more friendly and welcoming
| `Left Tap` and `Tap left` language inconsistent | Clarified and updated language to be consistent
| Swiping tutorial panel was confusing and unclear | Updated all tutorial imagery to be dynamic videos to better show actions
| Default settings wanted for new users differs from default settings wanted by experienced users | Added a `Customize Settings` section after tutorial as a part of the onboarding experience, added ability to customize settings before using the application with the ability to skip and use defaults for experienced users
| No user feedback when choosing radio options | Added messaging when selecting settings to reinforce the user's choice
