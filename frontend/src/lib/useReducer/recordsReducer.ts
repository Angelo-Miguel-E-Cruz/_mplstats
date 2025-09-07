import type { RecordActions, RecordState } from "./states";

export default function RecordsReducer(state: RecordState, action: RecordActions) {
  const { type } = action

  switch (type) {
    case 'SET_PROPERTY':
      return {
        ...state,
        [action.payload.property]: action.payload.value

      }
    case "SET_RECORD_TYPE":
      return {
        ...state,
        recordType: action.payload
      }
    default:
      return state
  }
}