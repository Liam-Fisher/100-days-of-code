# 100 Days Of Code - Log

### Day 1: March 16th, 2024
##### Inputs, Outputs and Types

**Today's Progress**: started by creating the base device component and adding some inputs/otuputs, as well as adding some methods to the device service 

**Thoughts:** I decided to ignore the library apsect for now and just create a basic application (which I alread no how to do). I can migrate this later. Was kind of unprepared for a project of this scale -- probably going to do some more planning. Realized I might have to use rxjs Subjects for a lot of inputs/outputs, as it seems like signals are more about push changes instead of timed events like message - I'll have to do some reasearch on the "laziness" of signals 

I also copied a bunch of type definitions from other projects (didn;t count this in my hour), which are basically the same as the RNBO ones, just moved around a bit, but it really helped to review all the data types (e.g. device, preset, buffer etc.. ) that I'm going to be working with, and sped up the process of coding. 

### Day 2: March 17th, 2024
##### Audio Service Snafu

**Today's Progress**: started by scaffolding the audio control interface and building the service. Some structural confusion with how root-level services work in a library (even though I'm technically building an application first), but I added the feature that multiple ngx-rnbo-device instances will share a single audio context, 

**Thoughts:** The Audio Service was fairly easy to write, but I ran into a wall when I realized you **can't change the values of audio params if the audio context is fetched from a signal** . or at least i can't. Not sure why this is, I tried NgZone.runOutsideAngular and a couple tricks with the Web Audio API (cancelling scheduled values, keeping a reference to the AudioParam in the function, etc..) but I eventually switched it to a regular audio context property. I think this is due to the context of AudioParam setter functions, but if it's a wider incompatibilty my "SharedService if you want it" pattern may need re-evaluation.

Also getting more comfortable with writing prompts for Copilot Chat, it's a fine line to decide at what point I should trust the answer but I usually have faith in my little buddy. I've found that asking specific questions about a UX flow, i.e. if this button was clicked, which audio context would be started? is better than a confirmation type question, i.e. "will this start the audio context for all devices?" . Copilot will be your yes-man for sure, but that's probably a learned behavior .

### Day 2: March 18th, 2024
##### Audio Service Snafu 2

**Today's "Progress"**: today was faily unproductive but I enjoyed writing code at least. Tried to figure out a system to allow the "smooth" connecting and disconnecting of audio nodes but when I tested it it didn't exactly work. Whenever as you disconnect parts of a signal chain there will always be "pops", even if you try and fade the channel out first. At least the fading part worked! And I got an excuse to make my first branch (just in case I can use it for something else). I ended up letting it go, and deciding that the consumer should provide the AudioContext object, and the library will handle everything else. You should usually only be using 1 audio context anyway, and this pattern makes it more like a wrapper for the device object itself (which takes patcher and context arguments).  


**Thoughts:**: I've noticed that I end up getting a little carried away when writing code, especially in terms of organizing and refactoring. I wasted a lot of time re-re-factoring code yesterday and it was incredibly frustrating! I've been working on planning better but I need to do it more thoroughly! I'm going to add diagram modeling to my learning list, I really enjoying block code programming (that's basically what RNBO is) amd hopefully that'll make my planning a little more clear. 

### Day 3: March 19th, 2024
##### Patcher Success

**Today's Progress**: Felt pretty good about today. Wrote a function for turning the RNBO device into a custom version and automatically connect all the audio nodes use, although I had some existing code to help. Also solved the audio context provider problem, and library consumers can now provide a context external, or access an automatically provided context. Still don't have the option for mutiple contexts, but this probably isn't a good idea anyway. Didn't get to figuring out diagramming software, the free online tool I found was a little intimidating and I just sorta blanked. I'll have to stick with paper and markdown files for now. 

**Thoughts:** I've been dealing with my Signals vs Observables problem by simply using both. This has made my code base a little more bloated but much easier to work with. 

### Day 4: March 20th, 2024
##### Buffering...

**Today's Progress:** ~~Not too much today~~ Lots Today !, started making a Buffer Service and ended up coding a class that basically does all the work, with the Service used for loading and passing around ui signals . 
UPDATE: I Also created a Parameter Service with a bunch of methods for parameter names and a subclass that leverages the normalization/denormalization function provided by the api. 


**Thoughts:** didn't count it towards my hour, but i spent about 30 mins in max making a test rnbo device for the basic features (including buffers). kind of concerned about how the biffer ui design is going to go, there's a lot of possibilities but given that i've decided to do a mobile first design approach to the gui, i think I'll just stick with a display, and the option to load buffers from disk/url . maybe add a similar pattern to the patcher loading where a parent component can set a list of available options for buffers ? then handle the loading, as well as passing the data back to the buffer-view component. 

### Day 5: March 21th, 2024
##### Parameter Binding

**Today's Progress:** Completed the parameter "chunk" (sketch? scaffold?) by creating the template and adding methods for consumer application binding. Also debugged an issue with changing the device dynamically by leveraging the invalidate device option. 

**Thoughts:** Felt clever-ish about the work i did today. Reached another "not sure if this is a good idea" point with signals and spent a little too much time trying to allow binding to an signal. Think I will stick with rxjs for allowing 2-way consumer bindings to top-level inputs. However I'm pretty happy with the signals/rxjs combo-pattern I came up with: which uses subscriptions for state propagation and effects for class instantiation, and allows the user to visualize the parameter in a normalized range, while viewing it as a literal value using computed signals. I think all the consumer level API bindings are going to end up being BehaviorSubjects, the interface elements Form Controls, and signals for everything in between.

### Day 6: March 22nd, 2024
##### Buffer Display

**Today's Progress:** Decent amount of progress today. Created a visual interface for the buffer components. Lets you select and view a buffer and input a url to fetch via text. Still need to do a bit of testing, will probably need to create a new rnbo patcher that tests out what happens when various methods are used. Also put together a File Loading Service as there was a lot of similar methods/properties between services. Also had to edit the Parameters/Buffers Services to add cleanup methods.  

**Thoughts:** Started realizing how many of the gui components are related - hence the file loading service. Also considering created some generic components, like a select for unique ids, but as the inputs/outputs and gonna change when/if i implement angular material. Realized that external input to set/get buffers is going to require some kind of command interface, not just a value, so I'll have to type and implement that. Feel like the "basic building blocks" part is going really well so far, given that I tackled the most challenging components first - messaging should be easy, I have done it before, and midi is just going to be IO and possibly a console.log option. May have to update my plan but I still have the design/design implementation stage to do, which will be significantly less familiar territory for me.

### Day: 7 March 23rd, 2024
##### Messages 

**Today's Progress:** ok day progress wise. Got stuck on the ability to control buffers externally so I decided to implement the messaging "chunk". I've mostly used messaging in previous rnbo devices so this was familiar territory, but I decided to implement the ability to switch between display and input modes, i.e. allow the user to input messages via the input element (which i'll change to angular material at some point), or simply view which messages are being sent. Didn't get as far as I would have like because I was feeling a little scatter brained/tired (I started kind of late).

**Thoughts:** Originally I was going to make a component for inputs, which allowed user input to the device, and one for outputs, which allowed the display of a device output, but since so much of the code is the same, I decided to just add the display/input functionality. The ability to display inputs could be useful for debugging external code, as would the ability to tests device outputs to external code. I have a few more things left to add to the component, like the ability to send a message at a certain time. I tried a couple different patterns (i.e. implementing a class at the port level), but ended up sticking with what I knew. I think this code will end up being rewritten extensively, but the basic structure is good.