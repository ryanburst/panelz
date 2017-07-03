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
