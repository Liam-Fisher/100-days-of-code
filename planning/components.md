
## Display streams
    
### View Display
    Control which syncronous data stream view is visible

## Loading Data Streams

Loading a patcher via user input will enable the audio context. Else, it will have to be enabled via user click.
Setting the audio context toggle (via patcher or otherwise) will enable the other ui elements.

### Patcher loading
    this might end up being a menu...

#### Select from list
    Provided by the consumer, which should also handled the loading.

#### From Disk

    A button that trigger an HTML input element of type file.

### Audio Controls

#### Audio Loading toggle

    Turn the audio on and off. Loading a patcher will set this to on automatically
     Setting/Creating an audio context will set this to "off" aka paused or stopped and it must be restarted by clicking it

#### Input Selection
    control whether the default user microphone is routed to the device

#### Output Toggle
    control whether the default user output is connected to the device.
     

## Asyncronous Data Streams

### Presets 

#### Preset Select
    Select a preset to view
### Buffers

I think this will end up being a menu

#### Buffer Select

    Select a buffer to view and edit

#### Buffer Action

    Update/clear/display? the selected buffer. Display should eventually be activated by default.

#### Buffer Value Input

    Enable editing of individual buffer samples via an input - use a simple number input element

#### Buffer url input

    provide a url to download into the selected buffer ID

#### Buffer File Upload

    load a file from disk (could have a similar pattern to patchers to allow fetching buffers from consumer provided sources)

#### Buffer View

    A waveform display in svg?? could add a mouse interface? might make this a popup as well

## Syncronous Data Streams

### Messaging
    Basically just two message ports (in and out)

#### Message Toggle
    Prevent outputs from leaving the element, or input from entering the device. This will allow the user to input messages while the device is actively emitting messages.

#### Message Tag Select
    
    Selected the message tag to input/output

#### Message Payload

    An input element that only allows spaces separated numbers

### Parameters
    VERY unsure about how this is going to work... here;s what i;m thinking

#### Parameter Lookup

    Search for a parameter by ID, and if selected, display it

#### Number Parameter Input

    A slider, possibly with an optional number input - converting to from normalized parameter version might be tricky here

#### Enum Parameter Input
    A select element (maybe allow other input types?? i.e. a toggle, if the parameter only has two enum values)

