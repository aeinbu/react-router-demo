import React, { useContext } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useParams,
	useRouteMatch
} from "react-router-dom"
import { StateContext, RoutingContext } from "./Contexts"


export const RouteView = ({ children }) => {
	const match = useRouteMatch()
	const paramsForThisLevel = useParams()
	const { nestedStates, stateForThisLevel, states, params } = useContext(RoutingContext)
	const isTopLevel = states.length === 0
	const matchUrl = isTopLevel || match.url === "/" ? "" : match.url
	return (
		<Switch>
			{
				nestedStates.map(route => (
					<Route key={route.path} path={matchUrl + route.path} >
						<RoutingContext.Provider value={
							{
								nestedStates: route.nestedStates,
								stateForThisLevel: route.state,
								states: stateForThisLevel === undefined
									? []
									: [...states, stateForThisLevel],
								params: { ...params, ...paramsForThisLevel }
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


export const StateRouter = ({ states, children }) =>
	<StateContext.Provider value={states}>
		<Router>
			<RoutingContext.Provider value={
				{
					nestedStates: states,
					stateForThisLevel: undefined,
					states: [],
					params: {}
				}
			}>
				<RouteView>
					{children}
				</RouteView>
			</RoutingContext.Provider>
		</Router>
	</StateContext.Provider>
