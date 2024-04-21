
## Basic Syntax 
command = action.context context ?args : context 
context = contextType contextID
contextType = audio | schedule | device | buffer | parameter | preset | 
contextID = string

action = {
    switch(context) {
        case: audio
        case: file
        case: device
    }
}


## contexts

File, Device, 


### File
