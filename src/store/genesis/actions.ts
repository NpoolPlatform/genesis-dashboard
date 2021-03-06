import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { UserMutations } from './mutations'
import { UserState } from './state'
import {
  LoginRequest,
  LoginResponse,
  GetGoogleTokenRequest,
  GetAdminAppsRequest,
  GetAdminAppsResponse,
  CreateAdminAppsRequest,
  CreateAdminAppsResponse,
  GetGenesisRoleRequest,
  GetGenesisRoleResponse,
  CreateGenesisRoleRequest,
  CreateGenesisRoleResponse,
  GetAppUserRequest,
  GetAppUserResponse,
  CreateGenesisUserRequest,
  CreateGenesisUserResponse,
  GetGenesisAppRoleUsersByOtherAppRequest,
  GetGenesisAppRoleUsersByOtherAppResponse,
  CreateGenesisAppUserAuthRequest,
  CreateGenesisAppUserAuthResponse,
  GetAuthsByOtherAppRequest,
  GetAuthsByOtherAppResponse
} from './types'
import { API } from './const'
import { MutationTypes as NotificationMutationTypes } from '../notifications/mutation-types'
import { notificationPush, notificationPop } from '../notifications/helper'
import { Notification } from '../notifications/types'
import { doAction } from '../action'
import { api } from 'src/boot/axios'

interface UserActions {
  [ActionTypes.GetAdminApps]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: GetAdminAppsRequest): void

  [ActionTypes.CreateAdminApps]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: CreateAdminAppsRequest): void

  [ActionTypes.GetGenesisRole]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: GetGenesisRoleRequest): void

  [ActionTypes.CreateGenesisRole]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: CreateGenesisRoleRequest): void

  [ActionTypes.GetGenesisAppRoleUsersByOtherApp]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: GetGenesisAppRoleUsersByOtherAppRequest): void

  [ActionTypes.GetAppUser]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: GetAppUserRequest): void

  [ActionTypes.CreateGenesisRoleUser]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: CreateGenesisUserRequest): void

  [ActionTypes.Login]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: LoginRequest): void

  [ActionTypes.CreateGenesisAppUserAuth]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: CreateGenesisAppUserAuthRequest): void

  [ActionTypes.GetAuthsByOtherApp]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: GetAuthsByOtherAppRequest): void

  [ActionTypes.GetGoogleToken]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: GetGoogleTokenRequest): void
}

const actions: ActionTree<UserState, RootState> = {
  [ActionTypes.GetAdminApps] ({ commit }, req: GetAdminAppsRequest) {
    doAction<GetAdminAppsRequest, GetAdminAppsResponse>(
      commit,
      API.GET_ADMIN_APPS,
      req,
      req.Message,
      (resp: GetAdminAppsResponse): void => {
        commit(MutationTypes.SetAdminApps, resp.Infos)
      })
  },

  [ActionTypes.CreateAdminApps] ({ commit }, req: CreateAdminAppsRequest) {
    doAction<CreateAdminAppsRequest, CreateAdminAppsResponse>(
      commit,
      API.CREATE_ADMIN_APPS,
      req,
      req.Message,
      (resp: CreateAdminAppsResponse): void => {
        commit(MutationTypes.SetAdminApps, resp.Infos)
      })
  },

  [ActionTypes.GetGenesisRole] ({ commit }, req: GetGenesisRoleRequest) {
    doAction<GetGenesisRoleRequest, GetGenesisRoleResponse>(
      commit,
      API.GET_GENESIS_ROLE,
      req,
      req.Message,
      (resp: GetGenesisRoleResponse): void => {
        if (resp.Info) {
          commit(MutationTypes.SetGenesisRole, resp.Info)
        }
      })
  },

  [ActionTypes.CreateGenesisRole] ({ commit }, req: CreateGenesisRoleRequest) {
    doAction<CreateGenesisRoleRequest, CreateGenesisRoleResponse>(
      commit,
      API.CREATE_GENESIS_ROLE,
      req,
      req.Message,
      (resp: CreateGenesisRoleResponse): void => {
        if (resp.Info) {
          commit(MutationTypes.SetGenesisRole, resp.Info)
        }
      })
  },

  [ActionTypes.GetGenesisAppRoleUsersByOtherApp] ({ commit }, req: GetGenesisAppRoleUsersByOtherAppRequest) {
    doAction<GetGenesisAppRoleUsersByOtherAppRequest, GetGenesisAppRoleUsersByOtherAppResponse>(
      commit,
      API.GET_GENESIS_APP_ROLE_USERS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetGenesisAppRoleUsersByOtherAppResponse): void => {
        if (resp.Infos && resp.Infos.length > 0) {
          commit(MutationTypes.SetGenesisUsers, resp.Infos)
        }
      })
  },

  [ActionTypes.GetAppUser] ({ commit }, req: GetAppUserRequest) {
    doAction<GetAppUserRequest, GetAppUserResponse>(
      commit,
      API.GET_APP_USER,
      req,
      req.Message,
      (resp: GetAppUserResponse): void => {
        if (resp.Info) {
          commit(MutationTypes.SetAppUsers, resp.Info)
        }
      })
  },

  [ActionTypes.CreateGenesisRoleUser] ({ commit }, req: CreateGenesisUserRequest) {
    doAction<CreateGenesisUserRequest, CreateGenesisUserResponse>(
      commit,
      API.CREATE_GENESIS_ROLE_USER,
      req,
      req.Message,
      (resp: CreateGenesisUserResponse): void => {
        commit(MutationTypes.SetAppUsers, resp.User)
        commit(MutationTypes.SetGenesisUsers, [resp.RoleUser])
      })
  },

  [ActionTypes.Login] ({ commit }, req: LoginRequest) {
    doAction<LoginRequest, LoginResponse>(
      commit,
      API.LOGIN,
      req,
      req.Message,
      (resp: LoginResponse): void => {
        const headers = api.defaults.headers as Record<string, string>
        headers['X-User-ID'] = resp.Info.User?.ID as string
        commit(MutationTypes.SetLoginedUser, resp.Info)
      })
  },

  [ActionTypes.CreateGenesisAppUserAuth] ({ commit }, req: CreateGenesisAppUserAuthRequest) {
    doAction<CreateGenesisAppUserAuthRequest, CreateGenesisAppUserAuthResponse>(
      commit,
      API.CREATE_GENESIS_APP_USER_AUTH,
      req,
      req.Message,
      (resp: CreateGenesisAppUserAuthResponse): void => {
        commit(MutationTypes.SetGenesisAuths, resp.Infos)
      })
  },

  [ActionTypes.GetAuthsByOtherApp] ({ commit }, req: GetAuthsByOtherAppRequest) {
    doAction<GetAuthsByOtherAppRequest, GetAuthsByOtherAppResponse>(
      commit,
      API.GET_AUTHS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAuthsByOtherAppResponse): void => {
        commit(MutationTypes.SetGenesisAuths, resp.Infos)
      })
  },

  [ActionTypes.GetGoogleToken] ({ commit }, req: GetGoogleTokenRequest) {
    const recaptcha = req.Recaptcha
    if (recaptcha) {
      const { executeRecaptcha, recaptchaLoaded } = recaptcha
      let waitingNotification: Notification
      if (req.Message.Waiting) {
        waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
        commit(NotificationMutationTypes.Push, waitingNotification)
      }
      recaptchaLoaded()
        .then((loaded: boolean) => {
          if (loaded) {
            void executeRecaptcha(req.Req)
              .then((token) => {
                commit(MutationTypes.SetGoogleToken, token)
                if (waitingNotification) {
                  commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
                }
              })
              .catch((err: Error) => {
                const error = req.Message.Error
                if (error) {
                  error.Description = err.message
                  const errorNotification = notificationPush(req.Message.ModuleKey, error)
                  commit(NotificationMutationTypes.Push, errorNotification)
                }
              })
          }
        })
        .catch((err: Error) => {
          const error = req.Message.Error
          if (error) {
            error.Description = err.message as string | undefined
            const errorNotification = notificationPush(req.Message.ModuleKey, error)
            commit(NotificationMutationTypes.Push, errorNotification)
          }
        })
    }
  }
}

export { actions, UserActions }
