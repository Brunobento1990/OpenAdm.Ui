export interface IContextApp{
    token:string;
    sessionInfo:ISessionInfo;
}

export interface ISessionInfo{
    nome:string;
    avatar?:string;
}

export function useContextApp(){

    function setContextApp(contextApp: IContextApp){

        localStorage.setItem('token', contextApp.token)
        localStorage.setItem('sessionInfo', JSON.stringify(contextApp.sessionInfo))
    }

    function clearContextApp(){
        localStorage.removeItem('token')
        localStorage.removeItem('sessionInfo')
    }

    function getSessionInfo():ISessionInfo | undefined{
        let sessionInfo = localStorage.getItem('sessionInfo')

        if(!sessionInfo) return undefined;

        return JSON.parse(sessionInfo);
    }

    return{
        setContextApp,
        clearContextApp,
        getSessionInfo
    }
}