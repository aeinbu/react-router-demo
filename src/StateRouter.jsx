import React, { useContext } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useParams,
	useRouteMatch
} from "react-router-dom"


// const RoutingContext = React.createContext({ routes: [] })
export const RoutingContext = React.createContext({
	nestedRoutes: [],
	stateForThisLevel: undefined,
	pathForThisLevel: undefined,
	segments: []
})


export const RouteView = ({ children }) => {
	const match = useRouteMatch()
	const paramsForThisLevel = useParams()
	const { nestedRoutes, stateForThisLevel, pathForThisLevel, segments } = useContext(RoutingContext)
	const isTopLevel = segments.length === 0
	const matchUrl = isTopLevel || match.url === "/" ? "" : match.url
	return (
		<Switch>
			{
				nestedRoutes.map(route => (
					<Route key={route.path} path={matchUrl + route.path} >
						<RoutingContext.Provider value={
							{
								nestedRoutes: route.nestedRoutes,
								stateForThisLevel: route.state,
								pathForThisLevel: route.path,
								segments: pathForThisLevel === undefined
									? []
									: [...segments, {
										state: stateForThisLevel,
										path: pathForThisLevel,
										params: paramsForThisLevel
									}]
							}
						}>
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
		<RoutingContext.Provider value={
			{
				nestedRoutes: routes,
				stateForThisLevel: undefined,
 				pathForThisLevel: undefined,
				segments: [] }
		}>
			<RouteView>
				{children}
			</RouteView>
		</RoutingContext.Provider>
	</Router>
