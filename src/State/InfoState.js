import Info from "../Components/info-style/info";

export function InfoState(routes, handleOnClickRoute){
    return (
        <Info
            routes = {routes}
            onClickRoute = {(i) => {handleOnClickRoute(i)}}
        />
    );
}