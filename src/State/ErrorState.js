import Error from "../Components/error-style/error";

export function ErrorState(routes, handleOnClickRoute, errorMsg){
    return (
        < Error 
          routes = {routes}
          onClickRoute = {(i) => {handleOnClickRoute(i)}}
          errorMsg = {errorMsg}
        />
    );
}