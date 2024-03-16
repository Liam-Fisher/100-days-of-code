

## Audio

### Context 

##### (Input or 2way binding)

    Maybe require a consumer to provide an audio context? This could mean exposing the context with a two-way binding and creating the default if no context is provided. 
    The annoying part would be making sure a click event of some sort is triggered - maybe with a load button that is reset when a new audio context is created, and disables other functions untill the context is running.

### Audio channels 

##### (input and output)

    Think I'm just going to expose the device.node property here and let the consumer call connect

### Gain? 

    Might not be necessary to expose this, but we might as well plan to as it's pretty easy.        

## Patcher

### Library

##### (input)

    An available library of patchers, as a list of strings. This should be provided by the consumer if the ability to switch patchers is desired.

### Patcher

##### (input)

    An input signal for a customly typed patcher that is parsed (if it's a string), then used to create the device.

### SelectionID

##### (two-way binding)

    The exported element will provide a model signal? for changes to the selected patcher to load. This should be listened by the consumer, and the subscription should trigger a patcher loading (from a server, assets, or a remote url), and set the patcher input signal to the result. 
   
## Messaging

### Message Input
    
##### (input/2way binding)

    A signal input that, when set, sends a message to the device. Messages are in the format [time: number, tag: string, payload: ...number[]] . If no time is provided it should be set to 0, which will emit the message immediately. This should also set the contents of the GUI input. A two way binding could be implemented at a later date, so that the message payload and tag could be displayed by the GUI elements 

### Message Output

#### (output)
    
    A computed (read-only) signal that emits a message value when changed, the output value should be in the format [time: number, tag: string, payload: ...number[]]. The GUI might as well allow a user to create and send output messages, as it'll just make it a copy of the inport GUI, and allow testing for the consumer application.  

## Presets

### PresetIndex

##### (2way binding / cold)
    A string or number (index) that selects the preset, alongside a command (load, delete, create/update) - format is [id: string|number, action: 'load'|'remove'|'new'].
    The "new" command will use getPreset to get the parameter values and, if the string is an id, will update the preset at that id with the new parameter values. If the id doesn't exist, a new preset will be created.
    

### Preset Action 

##### (input)

## Parameters

    **???** not sure what this looks like code wise but there should be a way to 2way bind to parameters OR get/set them . Might expose a service? Or a couple functions? 
    
    Another solution might be to expose the device's parameterChangeEvent, and leave it to the consumer to handle binding?

    Or keep a Map of ParameterChangeEffects, scoped to the device's injection context.   


## Buffers 

## Bind to Buffer ??

    unsure about this one, as it'll have to create an asyncronous function that is updated when the buffer/FixedArray provided by the library consumer is changed? don;t think it;s possible to do this automatically, atleast not without a wildly impractical signal equality function. 
    - Furthermore, changes made to a buffer in the actual device are not emitted,
    We could use polling, or require the device itself to emit a specific outport message when the buffer is written to, and have the

## Set Buffer
    
    another option would be an interface with a Float32Array or AudioBuffer, and a bufferID. I'd probably use Behavior subjects for this one (I think?), or add some kind of counter, checked with a signal equality function.


## MIDI

    This is just going to be an exposed wrapper for a midi event emitter and subscription. 


## Visible

    Determines whether or not the GUI is visible, which, if structured properly, should affect which components actually end up being rendered. 
