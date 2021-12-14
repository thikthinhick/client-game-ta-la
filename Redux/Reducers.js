import { combineReducers } from 'redux'
import ReducerLogin from './ReducerLogin'
import ReducerGame from './ReducerGame'
import ReducerScreen from './ReducerScreen'
import ReducerAudio from './ReducerAudio'
import ReducerSetting from './ReducerSetting'
import ReducerPlayGame from './ReducerPlayGame'
export default combineReducers({
  ReducerLogin,
  ReducerAudio,
  ReducerGame,
  ReducerScreen,
  ReducerPlayGame,
  ReducerSetting
})