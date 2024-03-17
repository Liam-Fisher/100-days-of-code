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

