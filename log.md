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

### Day: 8 March 24rd, 2024
##### Messages 

**Today's Progress:** frustrating day today. Can't seem to figure out why my message component won't load. Regardless, it is built though and should work so I will just have to diagnose a bit tomorrow. Also went a little overboard with the file access service, wrote a whole new set of types and a protocol to standardize the notion of files loading, should I want to add new file types in the future. Think I will end up extracting this to an external component, and not bother with file loading just now.

**Thoughts:** Noticed I have a really bad habit of just switching patterns when code doesn't work, instead of trying to figure out why it doesn't work in the first place. The messaging thing is really bugging me because I'm just unable to load it. Isolated the problem to a handful of components and maybe I will just have to redesign them from the bottom up. 

### Day: 9 March 25th 2024
##### Messages

**Today's Progress:** another frustrating day today. Figured out the messaging issue (i forgot to call link device) but I found myself struggling to complete the component implementations. Didn't expect to take as much time as I did but still wasn't particularly pleased with my progress even though I technically finished the work I set out to do. Think I might need to go back to the drawing board. 

**Thoughts:** Wish I could do better at not letting failure get to me - I think it's mostly the decline in productivity, as I really did expect this component to be the easiest to implement. Trying to go step by step and that's working out for me but it is frustratingly slow, especially when learning new elements of the framework. 

### Day: 10 March 26th 2024
##### Back to Buffers

**Today's Progress:** Today was also primarily filled with debugging but I felt like I was making gradual progress, and a lot of it was silly oversight stuff, like 0 vs 1 indexed channels and being unable to use an empty buffer. I've got a much better grasp on how to interact with buffers in RNBO, and although it's not exactly the "low-level" solution to audio-visual synchronization I was looking for, it's definitely possible to pass data in the form of ArrayBuffers without consuming too much memory.

**Thoughts:** Kind of an odd day as I was mostly fixing things - I really feel like I'm starting to get the hang of mixing signals, observables and asynchronous functions though, and my code is so much cleaner and more consistent when I know how to implement a solution. once i got the hang of signal queries I started straying away from a lot of the template syntax in angular, which has meant writing more lines of code, but code that is easier to understand and change.


### Day 11: March 27th 2024
##### a Bit of MIDI

**Today's Progress:** Did not have a whole lot of time today so I spent my hour doing some of the easier parts, i.e. building the MIDI service, which is very similar to the Messaging Service, and the Timing UI which is simple enough that it doesn't need a service.

**Thoughts:** Oddly enough, I'm probably happiest about the work I *didn't* do today. Managed to stick to my original restrictions and keep the midi service simple but clean enough to modify later. I am always looking to learn new things but this can be a barrier for me when I'm trying to complete a project, so even though I didn't come up with any clever new patterns or creative ui designs, I'm just happy I was able to resist deep-diving into the (still under revision) WebMIDI, though the autocomplete suggestions certainly tempted me! 


### Day 12: March 28th 2024
##### Presets

**Today's Progress:** Good amount of progress today, created the preset service/basic version of the component. Had some fun creating a command interface that'll be my inspiration for how the buffer interface will go, though neither are implemented programmatically at the top-level yet. Did all lot of nitpicky conditional component rendering stuff stuff that'll have to be changed into classes, but I wanted to make sure I had a record of the logic. 

**Thoughts:** Put a lot of thought into the state-logic of presets, for example a preset shouldn't be able to be updated if it hasn't been changed, or created if it has the same name as an existing preset. Kind of enjoyed the process of breaking a preset action into as few components as possible, in order to see which actions need to be taken. 

### Day 13: March 29th 2024
##### Midi investigation

**Today's Progress:** Didn't have a whole lot of time today so instead of starting on the angular material I did some testing of the preset components, and learned that Web MIDI is actually pretty easy to use, so I added some methods to the midi service to fetch user devices. 

**Thoughts:** I've always found midi to be somewhat irksome to work with at the byte level, but fortunately rnbo does all the parsing, so all you really need is to be able to format web midi messages into rnbo midi events. Given that this capability is there, it would be a shame not to take advantage of it. I'll have to play with it a little more to see if the latency reaches "annoying" levels, but it would be a cool feature to have. 

In regards to stream types, the connecting/disconnecting is starting to get a little repetitive, I think I'm going to start creating a generic method for connecting two compatible stream types, once I make a nice chart of what those are.

### Day 14: March 30th 2024

**Today's Progress:**  Didn't have a whole lot of time again today. Decided to take some of the code I've reused throughout the library and create some resuable functions. Trying to standardize some of the functionality so it's usable through a CLI as well as a GUI, and today this also included creating "command" functions for a few of the services that allow the control of objects. 

**Thoughts:** I really enjoy writing abstract code, unfortunately that doesn't seem to happen it the right timeline. Been learning a little more about design patterns and trying to factor them into my workflow.


~~### Day 15: March 31st 2024~~

**UH OH:** Today was a miss unfortunately. I started adding some methods to the rnbo component, but ended up getting tired and had to go to bed. Tomorrow is a new month though!


### Day 15: April 1st 2024

**Today's Progress:** Decided to swap it up today and create a site to host some of the stuff I'm building. This was a lot more tooling than writing code but I pushed my comfort zone so I'm gonna count it. Didn't end up actually hosting the site as I'm not really sure what to put but the configuration is all there.

**Thoughts:** I've dabbled in firebase a bit before but it's been a few months since I actually initialized a new project, and I forgot how slow and error-prone the process feels. This one really sapped the motivation out of me like nothing else but I am glad that I gave it a shot at least.


### Day 16 April 2nd 2024 

**Today's Progress:** Managed to get the site up at 100-doc.web.app , but struggled with getting the firebase services to work with the full standalone angular model. 

**Thoughts:** Although this is probably the best time to push boundaries and learn something new, I don't want to get too stuck/fixated on a new way of doing things (e.g. standalone) if the way I'm familiar with works just as well for creating simple demo projects. 


### Day 17 April 3rd 2024
##### Firebase Fun

**Today's Progress:** Did quite a bit today! Decided to create a [separate repo](https://github.com/Liam-Fisher/100-doc) for the hosting site as this one was getting a little crowded. Created an auth service and a firestore database for user documents. I was only able to get the "sign in with google" method to work, but it did manage to automatically create a firestore document for my user. Did some fairly thorough typescripting (minus a few "as"es) so it should be easy to scale. If you would like to login with google and see your name displayed in *stunning 12px sans-serif letters*, check it out [here](https://doc-100.web.app/);

*Thoughts:** I didn't even touch signals for this one although I'm fairly certain they would have been helpful for propagating changes in the authState. Wasn't sure at what point to switch over, so I decided to play it safe and stick with rxjs. Also didn't find the time to make it easier on the eyes, I'm saving my scss learning binge for a later date but it'll be coming. On the plus side, I've noticed I'm getting a lot better at writing clean and maintainable code, which used to be a huge issue for me. I love this "super-service with bound helper modules" pattern I've been using, but I've definitely got to be cautious about overusing it, as I'm sure to eventually come across some places where it's not the best call.    

### Day 18 April 4th 2024
##### Github API Calls 

**Today's Progress:** Had a little fun today. Started off by refactoring my Firebase Storage Service, as I initially planned to create a file uploading service. When I factored in testing storage rules though I realized I probably wouldn't have enough time to complete a useable component, so I decided to create a day counter for my 100 days of code challenge! Accomplished that pretty quickly, so I ramped it up and decided I would hold myself publically accountable, by posting the number of days that this repo had NO commits pushed to it.

**Thoughts:** This was surprisingly easy (bless the Github API), and involved a nice sprinkle of logical coding. I'm also really getting the hang of standalone-only angular apps, and although I'm a bit of a nerd for the structural aspects of NgModules, it's really only a cognitive aid that can be replaced with a well organized directory.