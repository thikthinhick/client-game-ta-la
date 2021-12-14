export const ADDCHAT = 'ADDCHAT';
export const LOGIN = "LOGIN";
export const UPDATEROOM = "UPDATEROOM"
export const UPDATELISTCARD = 'UPDATELISTCARD'
export const CHANGESCREEN = 'CHANGESCREEN'
export const PLAYING = 'PLAYING'
export const ENDGAME = "ENDGAME"
export const JOINROOM = "JOINROOM"
export const CLICKAUDIO = "CLICKAUDIO"
export const addChat = (data) => {
    return {
        type: ADDCHAT,
        payload: data
    }
}
export const updatePlaying = () => {
    return {
        type: PLAYING
    }
}
export const updateEndGame = () => {
    return {
        type: ENDGAME
    }
}

export const changeScreen = (data) => {
    return {
        type: CHANGESCREEN,
        payload: data
    }
}
export const updateRoom = (data) => {
    return {
        type: UPDATEROOM,
        payload: data
    }
}
export const updateListCard = (data) => {
    return {
        type: UPDATELISTCARD,
        payload: data
    }
}
export const login = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
}
export const joinRoom = (data) => {
    return {
        type: 'JOINROOM',
        payload: data
    }
}
export const fightingAudio = (data) => {
    return {
        type: FIGHTINGAUDIO
    }
}
export const clickAudio = (data) => {
    return {
        type: CLICKAUDIO,
        payload: data
    }
}
export const addAudio = (data) => {
    return {
        type: "ADDAUDIO",
        payload: data
    }
}
export const pauseMusic = (data) => {
    return {
        type: "PAUSEMUSIC",
        payload: data
    }
}
export const musicGamePlay = (data) => {
    return {
        type: "MUSICGAMEPLAY",
        payload: data
    }
}
export const changeSettingItem = (data) => {
    return {
        type: "CHANGESETTINGITEM",
        payload: data
    }
}