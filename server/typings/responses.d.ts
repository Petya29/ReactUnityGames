export namespace UserResponses {

}

export namespace TokenResponses {
    export interface GenerateJWTResponse {
        accessToken: string;
        refreshToken: string;
    }
}