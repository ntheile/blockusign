/**
 * Blah
 * @author odahcam
 * @version 0.0.1?
 **/
(function (window, document, undefined) {
    "use strict";

    var $ = {
        extend: Object.assign,
        remove: x => x.parentNode.removeChild(x),
    };

    /**
     * Store the plugin name in a variable. It helps you if later decide to change the plugin's name
     * @type {string} pluginName
     **/
    var pluginName = "dragOn";

    /*
     * The plugin constructor.
     */
    function Plugin(elem, options) {

        this.elem = elem;

        // Variables default
        this.settings = $.extend({}, this.defaults, options);

        this.metrics = {
            width: null,
            height: null,
            left: null,
            top: null,
            distanceFrom: {
                document: {
                    left: null,
                    top: null,
                }
            },
            whiteSpace: {
                left: null,
                top: null,
            },
            viewBox: {
                scale: null,
                rendered: {
                    width: null,
                    height: null,
                },
                attr: {
                    x: null,
                    y: null,
                    width: null,
                    height: null,
                }
            }
        };

        return this.init();
    }

    // Public Methods
    Object.assign(Plugin.prototype, {
        /*
         * Default options
         * @type {Object} defaults
         */
        defaults: {
            listenTO: "img", // {string} : selector for matching valid elements
            namespace: {
                svg: "http://www.w3.org/2000/svg", // SVG 2 namespace
                xlink: "http://www.w3.org/1999/xlink"
            }
        },
        /**
         *
         */
        init: function () {
            // set event listenners, put elem to do something usefull.

            console.log(this.elem);

            this.elem.classList.add(pluginName + '-dropzone')

            this.drawArea = this.createElementSVG('g', {
                class: pluginName + '-drawArea',
                width: '100%',
                height: '100%',
            });

            // adds drawArea to SVG
            this.elem.appendChild(this.drawArea);

            // enable draggables to be dropped into this
            interact(this.elem)
                .dropzone(interactBasicOptions.dropzone)
                .on('drop', this.ondrop.bind(this));

            // target elements with the "draggable" class
            interact(this.settings.listenTo)
                .draggable($.extend({ manualStart: true }), interactBasicOptions.draggable)
                .on('move', function (event) {
                    var interaction = event.interaction;

                    // if the pointer was moved while being held down
                    // and an interaction hasn't started yet
                    if (interaction.pointerIsDown && !interaction.interacting()) {
                        var target = event.currentTarget;
                        // create a clone of the currentTarget element
                        var clone = event.currentTarget.cloneNode(true);

                        console.log(event.currentTarget);

                        var targetBounding = target.getBoundingClientRect();

                        // add dragging class
                        clone.classList.add("drag-dragging");
                        clone.classList.remove("drag-dropped");

                        // translate the element
                        clone.style.transform = "translate(0px, 0px)";
                        clone.style.position = "absolute";
                        clone.style.top = (targetBounding.top + window.scrollY) + "px";
                        clone.style.left = (targetBounding.left + window.scrollX) + "px";

                        // update the posiion attributes
                        clone.setAttribute("data-x", 0);
                        clone.setAttribute("data-y", 0);

                        // insert the clone to the page
                        document.body.appendChild(clone);

                        // start a drag interaction targeting the clone
                        interaction.start({ name: 'drag' }, event.interactable, clone);
                    }
                })
                .on('dragmove', function (event) {

                    var target = event.target;
                    // keep the dragged position in the data-x/data-y attribute;
                    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
                    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

                    var targetBounding = target.getBoundingClientRect();

                    // translate the element
                    target.style.webkitTransform = target.style.transform = "translate(" + x + "px, " + y + "px)";
                    // target.style.top = (y + targetBounding.top + window.scrollY) + "px";
                    // target.style.left = (x + targetBounding.left + window.scrollX) + "px";

                    // update the posiion attributes
                    target.setAttribute("data-x", x);
                    target.setAttribute("data-y", y);
                })
                .on('dragend', function (event) {
                    try {
                        event.target.parentNode.removeChild(event.target);
                    }
                    catch (e) { };

                });

            return this;
        },
        /**
         * @param {string} tag
         * @param {object} attrs
         */
        createElementSVG: function (tag, attrs) {

            var el = document.createElementNS(this.settings.namespace.svg, tag);

            for (var k in attrs) {
                el.setAttribute(k, attrs[k]);
            }

            return el;
        },
        /**
         * Updates the metrics property.
         */
        updateMetrics: function () {
            // base coordinates
            // position of base elem relative to the client window
            var elemBounding = this.elem.getBoundingClientRect();

            console.log(elemBounding);

            Object.assign(this.metrics, elemBounding);

            console.log(this.metrics);

            this.metrics.width = elemBounding.width;
            this.metrics.height = elemBounding.height;
            this.metrics.top = elemBounding.top;
            this.metrics.right = elemBounding.right;
            this.metrics.bottom = elemBounding.bottom;
            this.metrics.left = elemBounding.left;

            console.log(this.metrics);

            // position of base elem relative to the document
            this.metrics.distanceFrom.document = {
                left: this.metrics.left + window.scrollX,
                top: this.metrics.top + window.scrollY
            };

            console.group("Finding rendered viewBox size");

            // gets viewBox attr as array
            var elemViewBoxAttrArray = this.elem
                .getAttribute("viewBox")
                .split(" "); // x, y, width, height

            // maps viewBox
            this.metrics.viewBox.attr = {
                x: elemViewBoxAttrArray[0],
                y: elemViewBoxAttrArray[1],
                width: elemViewBoxAttrArray[2],
                height: elemViewBoxAttrArray[3]
            };

            // creates a clone of viewBox object
            this.metrics.viewBox.rendered = Object.assign({}, this.metrics.viewBox.attr);

            console.group("Proporções");

            // gets the SVG scale relative to the initial viewBox size
            this.metrics.viewBox.scale = Math.min(
                this.metrics.width / this.metrics.viewBox.attr.width,
                this.metrics.height / this.metrics.viewBox.attr.height
            );

            // gets the scale used to scale new elements and its coordinates

            console.log("Proporção viewBox / SVG: " + this.metrics.viewBox.scale);

            console.groupEnd();

            // scales the element
            this.metrics.viewBox.rendered.width *= this.metrics.viewBox.scale;
            this.metrics.viewBox.rendered.height *= this.metrics.viewBox.scale;

            console.group("ViewBox setted vs. rendered");

            console.log(this.metrics.viewBox.attr);
            console.log(this.metrics.viewBox.rendered);

            console.groupEnd();

            console.groupEnd();

            console.group("Dimensões dos elementos");

            console.info("The SVG rendered size is " + this.metrics.width + " x " + this.metrics.height + " px.");

            console.info("The viewBox attribute size is " + this.metrics.viewBox.attr.width + " x " + this.metrics.viewBox.attr.height + " px.");
            console.info("The viewBox rendered size is " + this.metrics.viewBox.rendered.width + " x " + this.metrics.viewBox.rendered.height + " px.");

            console.groupEnd();

            console.group("Verificação de espaçamento entre SVG e viewBox");

            this.metrics.whiteSpace.left = (this.metrics.width - this.metrics.viewBox.rendered.width) / 2;
            this.metrics.whiteSpace.top = (this.metrics.height - this.metrics.viewBox.rendered.height) / 2;

            console.log("Há um espaço de " + this.metrics.whiteSpace.left + "px à esquerda da viewBox.");
            console.log("Há um espaço de " + this.metrics.whiteSpace.top + "px acima da viewBox.");

            console.groupEnd();

            console.log(this.metrics);
        },
        /** 
         *
         */
        ondrop: function (event) {
            console.group("interac.js onDrop");

            var elemDropped = event.relatedTarget;

            console.log(event.relatedTarget);
            console.log(event.target);
            console.log(this.elem);

            if (this.elem === event.target && (elemDropped.tagName === "IMG" || elemDropped.tagName === "svg")) {

                this.updateMetrics();

                console.group("Dropped elem");

                // dropped cordinates
                var elemDroppedBounding = elemDropped.getBoundingClientRect();

                var elemDroppedDistanceFrom = {};

                // position of dropped element relative to the document
                elemDroppedDistanceFrom.document = {
                    left: elemDroppedBounding.left + window.scrollX,
                    top: elemDroppedBounding.top + window.scrollY
                };

                // position of dropped element relative to SVG boundings
                elemDroppedDistanceFrom.svg = {
                    left: elemDroppedDistanceFrom.document.left - this.metrics.distanceFrom.document.left,
                    top: elemDroppedDistanceFrom.document.top - this.metrics.distanceFrom.document.top
                };

                console.log(elemDroppedDistanceFrom);

                console.info("O elemento foi solto à " + elemDroppedDistanceFrom.svg.left + "px da margem esquerda e " + elemDroppedDistanceFrom.svg.top + "px da margem superior do SVG.");

                console.groupEnd();

                console.group("Cáculos de escalonamento");

                elemDroppedDistanceFrom.svg.left =
                    elemDroppedDistanceFrom.svg.left / this.metrics.viewBox.scale -
                    this.metrics.whiteSpace.left / this.metrics.viewBox.scale;
                elemDroppedDistanceFrom.svg.top =
                    elemDroppedDistanceFrom.svg.top / this.metrics.viewBox.scale -
                    this.metrics.whiteSpace.top / this.metrics.viewBox.scale;

                console.groupEnd();

                var elementTypeToCreate = "image";
                var elemImage;
                if (elemDropped.tagName === "IMG") {
                    elemImage = this.createElementSVG(elementTypeToCreate);

                    elemImage.setAttributeNS(
                        this.settings.namespace.xlink,
                        "xlink:href",
                        elemDropped.src
                    );

                    elemImage.setAttribute('x', elemDroppedDistanceFrom.svg.left);
                    elemImage.setAttribute('y', elemDroppedDistanceFrom.svg.top);
                    elemImage.setAttribute('width', elemDroppedBounding.width / this.metrics.viewBox.scale);
                    elemImage.setAttribute('height', elemDroppedBounding.height / this.metrics.viewBox.scale);
                    elemImage.setAttribute('preserveAspectRatio', "none");
                }
                else if (elemDropped.tagName === "svg") {
                    elementTypeToCreate = "text";
                    elemImage = this.createElementSVG(elementTypeToCreate);
                    
                    var txt = elemDropped.firstElementChild;
                   
                    elemImage.setAttribute('x', elemDroppedDistanceFrom.svg.left);
                    elemImage.setAttribute('y', elemDroppedDistanceFrom.svg.top);
                    elemImage.setAttribute('width', elemDroppedBounding.width / this.metrics.viewBox.scale);
                    elemImage.setAttribute('height', elemDroppedBounding.height / this.metrics.viewBox.scale);
                    elemImage.setAttribute('preserveAspectRatio', "none");
                   //fill="green" x="0" y="35" font-family="Cedarville Cursive" font-size="40px" font-weight="bold"
                    elemImage.setAttribute('font-size', '40px');
                    elemImage.setAttribute('font-family', 'Cedarville Cursive');
                    elemImage.innerHTML = txt.innerHTML;
                    
                }
                else {
                    console.log("Drag not supported for " + elemDropped.tagName)
                }



                if (this.drawArea.appendChild(elemImage)) {
                    console.info("New image successful added to SVG!");

                    var that = this;

                    interact(elemImage)
                        .draggable(interactBasicOptions.draggable)
                        .on("dragmove", function (event) {
                            var target = event.target,
                                // keep the dragged position in the data-x/data-y attributes
                                x = (parseFloat(target.getAttribute("x")) || 0) + event.dx / that.metrics.viewBox.scale,
                                y = (parseFloat(target.getAttribute("y")) || 0) + event.dy / that.metrics.viewBox.scale;

                            // add dragging class
                            target.classList.add("drag-dragging");
                            target.classList.remove("drag-dropped");

                            // update the posiion attributes
                            target.setAttribute("x", x);
                            target.setAttribute("y", y);
                        })
                        .resizable(interactBasicOptions.resizable)
                        .on("resizemove", function (event) {
                            var target = event.target;
                            var x = parseFloat(target.getAttribute("x")) || 0;
                            var y = parseFloat(target.getAttribute("y")) || 0;

                            console.log(event);
                            console.log(that.metrics.viewBox.scale);

                            if (event.rect.width > 19) {
                                // update the element's size
                                target.setAttribute("width", event.rect.width / that.metrics.viewBox.scale);

                                // translate when resizing from top or left edges
                                x += event.deltaRect.left / that.metrics.viewBox.scale;
                                target.setAttribute("x", x);
                            }

                            if (event.rect.height > 19) {
                                // update the element's size
                                target.setAttribute("height", event.rect.height / that.metrics.viewBox.scale);

                                // translate when resizing from top or left edges
                                y += event.deltaRect.top / that.metrics.viewBox.scale;
                                target.setAttribute("y", y);
                            }
                        });
                }
            }

            console.groupEnd();
        },
        /**
         *
         */
        cleanHTML: function (selector) {
            document
                .querySelectorAll(selector)
                .forEach(elem => (elem.innerHTML = ""));
        },
        /**
         *
         */
        cleanDrawArea: function (selector) {
            this.drawArea.innerHTML = "";
        },
        addHTML: function (innerHTMLStr) {

            this.drawArea.innerHTML = innerHTMLStr;


            for (var i = 0; i < this.drawArea.children.length; i++) {
                var elemImage = this.drawArea.children[i];
                var elemDropped = elemImage;


                this.updateMetrics();

                console.group("Dropped elem");

                // dropped cordinates
                var elemDroppedBounding = elemDropped.getBoundingClientRect();

                var elemDroppedDistanceFrom = {};

                // position of dropped element relative to the document
                elemDroppedDistanceFrom.document = {
                    left: elemDroppedBounding.left + window.scrollX,
                    top: elemDroppedBounding.top + window.scrollY
                };

                // position of dropped element relative to SVG boundings
                elemDroppedDistanceFrom.svg = {
                    left: elemDroppedDistanceFrom.document.left - this.metrics.distanceFrom.document.left,
                    top: elemDroppedDistanceFrom.document.top - this.metrics.distanceFrom.document.top
                };

                console.log(elemDroppedDistanceFrom);

                console.info("O elemento foi solto à " + elemDroppedDistanceFrom.svg.left + "px da margem esquerda e " + elemDroppedDistanceFrom.svg.top + "px da margem superior do SVG.");

                console.groupEnd();

                console.group("Cáculos de escalonamento");

                elemDroppedDistanceFrom.svg.left =
                    elemDroppedDistanceFrom.svg.left / this.metrics.viewBox.scale -
                    this.metrics.whiteSpace.left / this.metrics.viewBox.scale;
                elemDroppedDistanceFrom.svg.top =
                    elemDroppedDistanceFrom.svg.top / this.metrics.viewBox.scale -
                    this.metrics.whiteSpace.top / this.metrics.viewBox.scale;

                console.groupEnd();




                var that = this;

                interact(elemImage)
                    .draggable(interactBasicOptions.draggable)
                    .on("dragmove", function (event) {
                        var target = event.target,
                            // keep the dragged position in the data-x/data-y attributes
                            x = (parseFloat(target.getAttribute("x")) || 0) + event.dx / that.metrics.viewBox.scale,
                            y = (parseFloat(target.getAttribute("y")) || 0) + event.dy / that.metrics.viewBox.scale;

                        // add dragging class
                        target.classList.add("drag-dragging");
                        target.classList.remove("drag-dropped");

                        // update the posiion attributes
                        target.setAttribute("x", x);
                        target.setAttribute("y", y);
                    })
                    .resizable(interactBasicOptions.resizable)
                    .on("resizemove", function (event) {
                        var target = event.target;
                        var x = parseFloat(target.getAttribute("x")) || 0;
                        var y = parseFloat(target.getAttribute("y")) || 0;

                        console.log(event);
                        console.log(that.metrics.viewBox.scale);

                        if (event.rect.width > 19) {
                            // update the element's size
                            target.setAttribute("width", event.rect.width / that.metrics.viewBox.scale);

                            // translate when resizing from top or left edges
                            x += event.deltaRect.left / that.metrics.viewBox.scale;
                            target.setAttribute("x", x);
                        }

                        if (event.rect.height > 19) {
                            // update the element's size
                            target.setAttribute("height", event.rect.height / that.metrics.viewBox.scale);

                            // translate when resizing from top or left edges
                            y += event.deltaRect.top / that.metrics.viewBox.scale;
                            target.setAttribute("y", y);
                        }
                    });

            }





        }
    });

    window[pluginName] = function (elem, options) {
        var response = [];

        if (typeof elem !== "object") {
            for (var i = 0; i < elem.length; ++i)
                response.push(new Plugin(elem[i], options));
        } else {
            response = new Plugin(elem, options);
        }

        return response;
    };


    // Private Functions
    var interactBasicOptions = {
        dropzone: {
            // only accept elements matching this CSS selector
            accept: ".draggable-droppable",
            // Require a 75% element overlap for a drop to be possible
            overlap: 0.75,

            // listen for drop related events:

            ondropactivate: function (event) {
                // add active dropzone feedback
                event.target.classList.add("drop-active");
            },
            ondragenter: function (event) {
                var draggableElement = event.relatedTarget,
                    dropzoneElement = event.target;

                // feedback the possibility of a drop
                dropzoneElement.classList.add("drop-target");
                draggableElement.classList.add("drag-can-drop");
                //draggableElement.textContent = "Dragged in";
            },
            ondragleave: function (event) {
                // remove the drop feedback style
                event.target.classList.remove("drop-target");
                event.relatedTarget.classList.remove("drag-can-drop");
                event.relatedTarget.textContent = "Dragged out";
            },
            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.target.classList.remove("drop-active");
                event.target.classList.remove("drop-target");
            }
        },
        draggable: {
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: {
                    top: 0,
                    left: 0,
                    bottom: 1,
                    right: 1
                }
            },
            // enable autoScroll
            autoScroll: true,
            // call this function on every dragmove event
            // onmove: {},
            // call this function on every dragend event
            onend: function (event) {
                // remove dragging class
                event.target.classList.remove("drag-dragging");
                event.target.classList.add("drag-dropped");

                console.log(
                    "moved a distance of " +
                    (Math.sqrt(event.dx * event.dx + event.dy * event.dy) | 0) + "px"
                );
            }
        },
        resizable: {
            // preserveAspectRatio: true,
            edges: {
                left: true,
                right: true,
                bottom: true,
                top: true
            }
        }
    };

})(window, document);

