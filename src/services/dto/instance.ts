export interface InstanceStateDTO {
  stateInstance:
    | 'notAuthorized'
    | 'authorized'
    | 'blocked'
    | 'sleepMode'
    | 'starting'
    | 'yellowCard';
}
