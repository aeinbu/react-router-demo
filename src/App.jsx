import React from 'react'
import './App.css'
import { useParams } from "react-router-dom"
import { StateRouter, RouteView, useStateRouter } from "./StateRouter/"


const tenants = ["Alfa", "Beta", "Gamma", "Delta"]
const operationNumbers = [10,20,30,40,50,60]

const Batch = () => <h2>Batch frame</h2>


const WelcomeToProflow = () => {
    const stateRouter = useStateRouter()
    return <>
        <h2>Welcome to Proflow</h2>
        <ul>
            {
                tenants.map(tenant => <li><a key={tenant} href={stateRouter.createStateUrl("../tenant", { tenantId: tenant })}>{tenant}</a></li>)
            }
        </ul>
    </>
}


const Dashboard = () => {
    const stateRouter = useStateRouter()
    return <>
        <h2>Dashboard frame</h2>
        <p>
            Quick switch tenant
            {
                tenants.map(tenant => <> <a key={tenant} href={stateRouter.createStateUrl(".", { tenantId: tenant })}>{tenant}</a></>)
            }
        </p>
    </>
}


const Detail = () => <h2>Detail frame</h2>


const Operation = () => {
    var params = useParams()

    return <>
        <h2>Operation frame for operation number {params.operationNumber}</h2>
    </>
}


const Material = () => <h2>Material frame</h2>


const Order = () => {
    const params = useParams()
    const stateRouter = useStateRouter()

    return <>
        <h2>Order frame for order number: {params.orderNumber}</h2>
        <RouteView>
            <ul>
                {
                    operationNumbers.map(operationNumber => <li><a href={stateRouter.createStateUrl("./operation", { operationNumber })}>Operation {operationNumber}</a></li>)
                }
            </ul>
        </RouteView>
    </>
}


const Tenant = () => {
    const params = useParams()
    const stateRouter = useStateRouter()

    return <>
        <h2>Tenant Frame for tenant id: {params.tenantId}</h2>
        <RouteView>
            <ul>
                <li><a href={stateRouter.createStateUrl("./dashboard")}>Dashboard</a></li>
                <li><a href={stateRouter.createStateUrl("./batch")}>Batch</a></li>
                <li><a href={stateRouter.createStateUrl("./order", { orderNumber: 123000100 })}>Order number 123000100</a></li>
                <li><a href={stateRouter.createStateUrl("./order", { orderNumber: 123000101 })}>Order number 123000101</a></li>
                <li><a href={stateRouter.createStateUrl("./order", { orderNumber: 123000102 })}>Order number 123000102</a></li>
            </ul>
        </RouteView>
    </>
}


const RootComponent = () => <>
    <h2>This is RootComponent</h2>
    <RouteView>
        This is fallback content for RootComponent
    </RouteView>
</>


const mainStates = [
    {
        state: "app",
        path: "/",
        component: <RootComponent />,
        nestedStates: [
            {
                state: "home",
                path: "/home",
                component: <WelcomeToProflow />,
                nestedStates: []
            },
            {
                state: "tenant",
                path: "/tenant/:tenantId",
                component: <Tenant />,
                nestedStates: [
                    {
                        state: "dashboard",
                        path: "/dashboard",
                        component: <Dashboard />,
                        nestedStates: []
                    },
                    {
                        state: "order",
                        path: "/order/:orderNumber",
                        component: <Order />,
                        nestedStates: [
                            {
                                state: "detail",
                                path: "/detail",
                                component: <Detail />,
                                nestedStates: []
                            },
                            {
                                state: "operation",
                                path: "/operation/:operationNumber",
                                component: <Operation />,
                                nestedStates: []
                            },
                            {
                                state: "material",
                                path: "/material",
                                component: <Material />,
                                nestedStates: []
                            }
                        ]
                    },
                    {
                        state: "batch",
                        path: "/batch",
                        component: <Batch />,
                        nestedStates: []
                    }
                ]
            }
        ]
    }
]


export const App = () => {
    return <>
        <h1>Proflow App Frame</h1>
        <StateRouter states={mainStates} >
            <p>Fallback content for invalid url at first level</p>
        </StateRouter>
    </>
}

