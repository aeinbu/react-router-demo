import React from 'react'

export const StateContext = React.createContext([])

export const RoutingContext = React.createContext({
	nestedStates: [],
	stateForThisLevel: undefined,
	states: [],
	params: {}
})