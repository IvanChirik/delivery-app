import { IUserProfileData } from './user.interface';

export interface IAuthData {
    accessToken: string,
    user: IUserProfileData
}