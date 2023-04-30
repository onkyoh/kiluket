export const COLORS = ['green', 'blue', 'purple', 'red', 'yellow']

export const SIZES = ['three', 'four', 'five', 'six', 'seven']

export const FINISHED_SHADOWS = {
    boxShadow: `5px 5px 15px 5px #FF8080,
    -9px 5px 15px 5px #FFE488,
    -7px -5px 15px 5px #8CFF85,
    12px -5px 15px 5px #80C7FF,
    12px 10px 15px 7px #E488FF,
    -10px 10px 15px 7px #FF616B,
    -10px -7px 27px 1px #8E5CFF,
    5px 5px 5px 5px rgba(0,0,0,0)`
}

export const UNFINISHED_SHADOWS = {
    boxShadow: '0px 0px 10px black'
}

export const INCOMPLETE_SHADOWS = {
    filter: 'brightness(0)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
}

export const ERROR_TEXT = {
    textAlign: 'center' as const, 
    color: 'red',
}

export const COMPLETED_TEXT = {
    textAlign: 'center' as const,
    color: 'black',
}

export const QUEST_COMPLETE_TEXT = 'Congratulations you have freed every light and completed your quest!'

export const SELECTED = {
    filter: 'brightness(0)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '1em'
}

