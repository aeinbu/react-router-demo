import React, { useContext } from 'react'
import './App.css'
import { useParams } from "react-router-dom"
import { StateRouter, RouteView, RoutingContext } from "./StateRouter"


const Batch = () => <h2>Batch frame</h2>

const WelcomeToProflow = () => <>
    <h2>Welcome to Proflow</h2>
    <ul>
        <li><a href="/tenant/alfa">Alfa</a></li>
        <li><a href="/tenant/beta">Beta</a></li>
        <li><a href="/tenant/gamma">Gamma</a></li>
        <li><a href="/tenant/delta">Delta</a></li>
    </ul>
</>


const Dashboard = () => <h2>Dashboard frame</h2>

const Detail = () => <h2>Detail frame</h2>

const Operation = () => {
    var params = useParams()
    const rc = useContext(RoutingContext)
    console.log("- previousSegments", rc.segments)
    const currentSegment = {path: rc.pathForThisLevel, params};
    console.log("- currentSegment", params)
    console.log("- combined", [ ...rc.segments, currentSegment ])

    return <>
        <h2>Operation frame for operation number {params.operationNumber}</h2>
    </>
}

const Material = () => <h2>Material frame</h2>

const Order = () => {
    const params = useParams()
    const rc = useContext(RoutingContext)
    const tenantId = rc.segments[1].params.tenantId;   //TODO: This should be from segments[0], not segments[1]

    console.log("-", params)
    return <>
        <h2>Order frame for order number: {params.orderNumber}</h2>
        <RouteView>
            <ul>
                TODO: params.tenantId is not available here! Should be able to default it!!!
                <li><a href={`/tenant/${tenantId}/order/${params.orderNumber}/operation/10`}>Operation 10</a></li>
                <li><a href={`/tenant/${tenantId}/order/${params.orderNumber}/operation/20`}>Operation 20</a></li>
                <li><a href={`/tenant/${tenantId}/order/${params.orderNumber}/operation/30`}>Operation 30</a></li>
                <li><a href={`/tenant/${tenantId}/order/${params.orderNumber}/operation/40`}>Operation 40</a></li>
            </ul>
        </RouteView>
    </>
}

const Tenant = () => {
    const params = useParams()
    return <>
        <h2>Tenant Frame for tenant id: {params.tenantId}</h2>
        <RouteView>
            <ul>
                <li><a href={`/tenant/${params.tenantId}/dashboard`}>Dashboard</a></li>
                <li><a href={`/tenant/${params.tenantId}/batch`}>Batch</a></li>
                <li><a href={`/tenant/${params.tenantId}/order/100`}>Order 100</a></li>
                <li><a href={`/tenant/${params.tenantId}/order/101`}>Order 101</a></li>
                <li><a href={`/tenant/${params.tenantId}/order/102`}>Order 102</a></li>
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

const mainRoutes = [
    {
        state: "app",
        path: "/",
        component: <RootComponent />,
        nestedRoutes: [
            {
                state: "home",
                path: "/home",
                component: <WelcomeToProflow />,
                nestedRoutes: []
            },
            {
                state: "tenant",
                path: "/tenant/:tenantId",
                component: <Tenant />,
                nestedRoutes: [
                    {
                        state: "dashboard",
                        path: "/dashboard",
                        component: <Dashboard />,
                        nestedRoutes: []
                    },
                    {
                        state: "order",
                        path: "/order/:orderNumber",
                        component: <Order />,
                        nestedRoutes: [
                            {
                                state: "detail",
                                path: "/detail",
                                component: <Detail />,
                                nestedRoutes: []
                            },
                            {
                                state: "operation",
                                path: "/operation/:operationNumber",
                                component: <Operation />,
                                nestedRoutes: []
                            },
                            {
                                state: "material",
                                path: "/material",
                                component: <Material />,
                                nestedRoutes: []
                            }
                        ]
                    },
                    {
                        state: "batch",
                        path: "/batch",
                        component: <Batch />,
                        nestedRoutes: []
                    }
                ]
            }
        ]
    }
]

export const App = () => {
    return <>
        <h1>Proflow App Frame</h1>
        <StateRouter routes={mainRoutes} >
            <p>Fallback content for invalid url at first level</p>
        </StateRouter>
    </>
}

