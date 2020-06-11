import { generateStore, EventActions } from '@drizzle/store'
import drizzleOptions from '../drizzleOptions'
import { toast } from 'react-toastify'

// lastSeenEventId hack to get around MM events issue
const contractEventNotifier = lastSeenEventId => _ => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    if (action.event.id !== lastSeenEventId) {
      lastSeenEventId = action.event.id
      const caller = action.event.returnValues.caller
      const value = action.event.returnValues.value
      const blockNumber = action.event.blockNumber
      const message1 = `block:[${blockNumber}]`
      const message2 = `value=[${value}] set by [${caller}]`
      console.group('Event fired')
      console.log(action)
      console.log(message1)
      console.log(message2)
      console.groupEnd()
      toast.success(message1, { position: toast.POSITION.TOP_CENTER })
      toast.success(message2, { position: toast.POSITION.TOP_CENTER })
    }
  }
  return next(action)
}


// see issue:
// https://github.com/MetaMask/metamask-extension/issues/6668
const appMiddlewares = [ contractEventNotifier("lastSeenEventIdToGetAroundMetaMaskError") ]

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false  // enable ReduxDevTools!
})
