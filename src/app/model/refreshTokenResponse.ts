import { DTOError } from "./dtoError";

export class RefreshTokenResponse {
    refreshToken:string | undefined;
    token:string | undefined;
     error: DTOError | undefined;
     tokenError:boolean | undefined;

}
