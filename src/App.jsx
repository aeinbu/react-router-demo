import React, { /*useContext*/ } from 'react'
import './App.css'
import { useParams } from "react-router-dom"
import { StateRouter, RouteView } from "./StateRouter"


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
    return <>
        <h2>Operation frame for operation number {params.operationNumber}</h2>
    </>
}

const Material = () => <h2>Material frame</h2>

const Order = () => {
    const params = useParams()
    console.log("-", params)
    return <>
        <h2>Order frame for order number: {params.orderNumber}</h2>
        <RouteView>
            <ul>
                TODO: params.tenantId is not available here! Should be able to default it!!!
                <li><a href={`/tenant/${params.tenantId}/order/${params.orderNumber}/operation/10`}>Operation 10</a></li>
                <li><a href={`/tenant/${params.tenantId}/order/${params.orderNumber}/operation/20`}>Operation 20</a></li>
                <li><a href={`/tenant/${params.tenantId}/order/${params.orderNumber}/operation/30`}>Operation 30</a></li>
                <li><a href={`/tenant/${params.tenantId}/order/${params.orderNumber}/operation/40`}>Operation 40</a></li>
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

const mainRoutes = [
    {
        url: "/home",
        component: <WelcomeToProflow />,
        nestedRoutes: []
    },
    {
        url: "/tenant/:tenantId",
        component: <Tenant />,
        nestedRoutes: [
            {
                url: "/dashboard",
                component: <Dashboard />,
                nestedRoutes: []
            },
            {
                url: "/order/:orderNumber",
                component: <Order />,
                nestedRoutes: [
                    {
                        url: "/detail",
                        component: <Detail />,
                        nestedRoutes: []
                    },
                    {
                        url: "/operation/:operationNumber",
                        component: <Operation />,
                        nestedRoutes: []
                    },
                    {
                        url: "/material",
                        component: <Material />,
                        nestedRoutes: []
                    }
                ]
            },
            {
                url: "/batch",
                component: <Batch />,
                nestedRoutes: []
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

