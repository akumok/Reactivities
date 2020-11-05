import { IUserFormValues } from './../models/user';
import { action, computed, observable, runInAction } from "mobx";
import { IUser } from "../models/user";
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { history } from '../..';

export default class UserStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
    }
    
    @observable user: IUser | null = null;


    @computed get isLoggedIn() {return !!this.user}

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
            })
            console.log("User");
            console.log(user);
            history.push('/activities');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}