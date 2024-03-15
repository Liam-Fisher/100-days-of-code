# Angular Library for RNBO
(if you are unfamiliar with RNBO, check out the website [here](https://rnbo.cycling74.com)) 

My end goal is to have an element called <ngx-rnbo-device> that works as an encapsulated component that can be included in an angular application as a standalone component. 
It should end up looking something like this:
`
    <body>
        <app-component>
            <ngx-rnbo-device></ngx-rnbo-device>
    
        </app-component>
    </body>
`
    It's going to revolve around the [RNBO Javascript API](https://rnbo.cycling74.com/js), and I'm going to try to make use of almost all the features, depending on time. I'm going to use 

     
## Techniques/Technologies/Tools

### Angular Material

    I'd like to get a better grasp on the possibilities of angular material, especially in regards to:
        - Implementing custom styles and themes in scss (my hope is that the GUI can be themed by Library Consumers, I'm pretty sure this will be possible but we'll have to see) 
        - Dynamically changing Material Component properties based on application state
        - Combining components from the CDK library to make the GUI more **accessible** (this is one of the reasons I'm using Angular Material, as both it's capabilties and failures wrt accessibility are well documented)
 
### Angular Signals
    I'd really like to use this opportunity to get the hang of angular signals, so I'm going to be using them a lot (by default for any dynamically changing properties), and possibly removing them if/when I'm sure change detection won't be needed.

# Parts 

    I'm going to being conceiving of this project as split up by data stream, as that's basically how the RNBO library is layed out. This includes (in order of expected implementation difficulty):

    - Audio
    - Patcher
    - Messages
    - Parameters
    - Presets
    - Buffers
    - MIDI


## Patcher
    a patcher are json files used to create a device. This includes a lot of the same info as the device itself, so I'm going to add some properties to the `BaseDevice` instance that includes all the information that would otherwise be stored in the patcher. 
# What it **will** be able to do...

## GUI||API  

    The main focus will be the ability to send and receive data from the device. This makes the element sort of a high-level wrapper for the `RNBO.BaseDevice` class, so that it can easily be used and edited in angular applications without too much boilerplate. I'd like the element to function as both a visual interface for the device **AND** a invisible wrapper for the RNBO API. This should be doable by *adding a visible attribute to the top level element*. The GUI aspects should enable compactness as much as reasonable, while maintaining the maximum possible control over the Device at the user level. 

## Dynamic or Static Patcher Uploading
    I'd like to make the action of loading the patcher itself as flexible as possible, so I'll make the patcher file an element attribute that can be set from within or outside of the component.
    This will require the application to provide either:
        - **A**: An existing, preloaded patcher (i.e. `<ngx-rnbo-device patcher="preloadedPatcher"></ngx-rnbo-device>`)
        - **B**: A list (library) of possible patchers and a listener for the selectionChange event that handles downloading the patcher (from assets or a server), 
        (i.e. `<ngx-rnbo-device [library]="patcherNameArray" [patcher]="dowloadedPatcher|async" (selectionChange)="downloadPatcher($event)"></ngx-rnbo-device>`)  
 
## Audio Initialization
    I'm going to add an embedded interface for controlling audio, that, at the very least, initializes the audio context (this needs to be done via user input, like a mouse click), and, by default routes audio out of device, directly to the speakers. The web audio api has some pretty basic setup code that is handled by libraries like [tone.js](https://tonejs.github.io/). I considered including tone as a dependency but decided against it, however my hope is that the end result should be compatible with this as well as ui libraries like [nexusUI](https://nexus-js.github.io/ui/), so that you can use them in external libraries with a minimal increase in complexity.

    - Side note, I have an [existing repo](https://github.com/Liam-Fisher/voicefx) where I experimented with using nexusUI in conjunction with RNBO to create an interface for a voice-modulation device.  

## Send/Receive Messages

    I'm going to add the ability to send messages to the device, from both a GUI input/output and via signals (?) 

## External MIDI access
    I'm gonna do the bare minimum here, and simply expose the MIDI inputs/outputs from the top level component. 
## Buffer Access
    Buffers in RNBO can be converted between "AudioBuffers" (which contains channel, duration and samplerate metadata) and an array of Float32Arrays (one for each channel). These will have getters and setters which should allow the **asynchronous** sharing of data with other elements.  

# What it **should** be able to do...

## Audio Controls 
    As an expansion on the Audio Initialization component, I'd like to add GUI/API functionality for the following: 
        1. Routing audio in and out of the device (should be pretty easy, basically just exposing the device.node property as a property of the <ngx-rnbo-device> element)
        2. enabling input from the user's microphone
        3. An output gain control slider

## Custom Meta Documentation
    I'd like to take advantage of the meta properties of message ports/parameters to add custom (input by the application user) tooltips and annotations 

# What it **might** be able to do...

## Midi Printer
    Might add a toggle to allow midi bytes to be printed to the console as they are input/output. This is an offering to developers based on the assumption that, if you've figured out how to route midi into a web application, you're probably comfortable opening dev tools to do some debugging.

## Buffer GUI
    Allowing a user to make changes to the content of a buffer 

## patcher upload from disk
    It might be beneficial to add an input for a user-created patcher from disk , using an html input element. This *might* be a faster method for debugging/fiddling (i.e.g, compiling the patcher in RNBO and uploading it directly instead of adding it to assets/uploading to a server then recompiling), but could be useful for an application that allows a user to upload a custom patcher from disk, and integrate it as part of the predefined signal chain.


## Uploading/Downloading custom Presets/Buffers
   You can grab the active presets, as well as "release" (which is kind of a getter/reset combo) the content of buffers. Given these capabilities, you should be able to use RNBO to create "snapshots" (i.e. presets created by setting parameter via user input and internal device code) and "recordings" (i.e. setting the content of buffers based on audio inputs). Not sure of the implementation specifics yet but it will likely follow the same pattern as the patcher input mechanics. 

## Custom Meta Styling
Given that the GUI will mostly be intended for functionality, (debugging/testing/fiddling), minimal effort will be going into the design aspects. However, the "meta" properties can be used to add styling relatively easily, so i'll probably make the properties of angular material objects settable this way (i.e. in a parameter component template `<mat-slider [showTicks]="meta.showTicks">`)    

## Multiple Devices
    Although a big part of RNBO is the capability to connect devices, this will be a single-device element. Hopefully, the input/output ui should allow the connecting of multiple elements present 
    **I'M NOT SURE WHAT TO DO ABOUT THE EMBEDDED AUDIO CONTEXT WHEN MULTIPLE DEVICE ELEMENTS ARE PRESENT**, so this is a big TBD.

# What it **won't** be able to do...

## MIDI input GUI

    Given the wide variety of midi message types, it'd probably be  to implement a GUI implementation for MIDI streams. MIDI is mostly useful when dealing with physical hardware (like a midi keyboard), and as a compact "event" format (i.e., a midi score). Allowing the import of a midi score and/or a GUI aid for physical midi hardware is a very cool idea but there's no real reason this couldn't be done outside the application, as long as the MIDI input/output is exposed.

## Custom message interfaces

    There is a lot of potential for creating custom GUIs using SVG/html canvas that integrate specifically with a class of message port, like a breakpoint function, a filter, or a chord. But I'm going to leave this out of this plan at least. 
       
## Patcher Editing
        You cannot create the source code for new devices without an RNBO license. Although editing the patcher export.json file is technically possible, I'm not sure at what point it can/cannot be edited without conflicting with the source code, (editing meta properties, for example, would definitely be safe, but editing parameter normalizationFunction would definitely not).

# Process

## Library Format 
    Angular libraries seem more difficult to test than so I'm going to start by creating an application, writing most or all of the code, then migrating it to a library project, and testing it alongside a sample application in the same workspace. If all goes well, I'll work on publishing the package. 
## Design Workflow 
    I'm going to take the following steps when designing the application, I'll probably write code in between these segments, which doesn't seem like best practice, but I don't think I'm quite ready for a #100DaysOfSystemDesign challenge just yet... :
    1. List out the main inputs/outputs of the top-level exported component <ngx-rnbo-device>
    2. Figure out the sub components hierarchy
        * top-level by data type (e.g. a top-level messaging component, a top-level parameters components etc...)
        * container and layout components 
        * Actual gui components
    3. Figure out the data flows between components
    4. Figure out where Services are needed?
        * Root level services (e.g. a service for controlling audio)
        * Component level services (e.g. a service for controlling a single parameter instance) 
        * Pipes? (not sure when/if this would be necessary)
    5. Determine the inclusion of Angular Material elements in the GUI
        * Which elements to use?
        * which properties should be accessible to the device meta?
    6. Design the actual GUI using Figma/Canva ? 
    7. Do any additional publishing work
        * clean up the documentation
        * add some info links   

Furthermore, I'm going to be writing type defintions from steps 2 - 5 
