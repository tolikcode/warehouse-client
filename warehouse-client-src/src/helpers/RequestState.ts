export enum RequestState {
  NotRequested = "NotRequested",
  InProgress = "InProgress",
  Finished = "Finished",
  Failed = "Failed",
}

export const isNotRequested = (request: any) =>
  !request || !request.requestState || request.requestState === RequestState.NotRequested;
export const isInProgress = (request: any) => request && request.requestState === RequestState.InProgress;
export const isFinished = (request: any) => request && request.requestState === RequestState.Finished;
export const isFailed = (request: any) => request && request.requestState === RequestState.Failed;
export const isLoading = (request: any) => isNotRequested(request) || isInProgress(request);
