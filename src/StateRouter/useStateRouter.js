import { useContext } from 'react'
import { useParams } from "react-router-dom"
import { StateContext, RoutingContext } from "./Contexts"


export const useStateRouter = () => {
	const routingContext = useContext(RoutingContext)
	const paramsForThisLevel = useParams()
	const allStates = useContext(StateContext)

	const createStateUrl = (targetState, targetStateParams = {}) => {
		const states = Array.isArray(targetState)
			? targetState
			: statesFromStateString(targetState)

		const paths = resolvePathsForStates(states)
		const mixedParams = Object.entries({ ...routingContext.params, ...paramsForThisLevel, ...targetStateParams })
			.sort(([name]) => -name.length)		// for correct replace of params like :op and :opNum - always replace longest name first

			return paths
			.map(path => path === "/" ? "" : path)
			.map(path => mixedParams
				.reduce((agg, [name, value]) => agg = agg.replace(`:${name}`, value), path)
			)
			.reduce((agg, cur) => agg + cur, "")
	}


	const resolvePathsForStates = ([firstState, ...restStates], states = allStates) => {
		const foundState = states.find(state => state.state === firstState)
		if (foundState === undefined) throw new Error(`Invalid state at current level: "${firstState}"`);

		return restStates.length > 0
			? [foundState.path, ...resolvePathsForStates(restStates, foundState.nestedStates)]
			: [foundState.path]
	}


	const statesFromStateString = (toStateString) => {
		// When toStateString starts with "/", its an absolute state path
		const currentState = toStateString.startsWith("/")
			? []	// absolute state path
			: [...routingContext.states, routingContext.stateForThisLevel]	// relative state path

		// Remove the starting "/" if present, before splitting the string
		const toStates = toStateString.startsWith("/")
			? toStateString.substr(1).split("/") 
			: toStateString.split("/")
			
		// Build the state stack relative from currentState, including following "." and ".." navigation
		const resultingState = toStates.reduce((agg, cur) => {
			if (cur === ".") return agg
			if (cur === "..") return agg.slice(0, -1)
			return [...agg, cur]
		}, currentState)

		return resultingState
	}

	return { createStateUrl };
}