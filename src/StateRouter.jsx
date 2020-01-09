import React, { useContext } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	// useParams,
	useRouteMatch
} from "react-router-dom"


const RoutingContext = React.createContext({ routes: [] })


export const RouteView = ({ children, isTopLevel = false }) => {
	const match = useRouteMatch()
	const routes = useContext(RoutingContext)
	return (
		<Switch>
			{
				routes.map(route => (
					<Route key={route.url} path={isTopLevel ? route.url : match.url + route.url} >
						<RoutingContext.Provider value={route.nestedRoutes}>
							{route.component}
						</RoutingContext.Provider>
					</Route>
				))
			}
			<Route>
				{children}
			</Route>
		</Switch>
	)
}


export const StateRouter = ({ routes, children }) =>
	<Router>
		<RoutingContext.Provider value={routes}>
			<RouteView isTopLevel={true}>
				{children}
			</RouteView>
		</RoutingContext.Provider>
	</Router>
