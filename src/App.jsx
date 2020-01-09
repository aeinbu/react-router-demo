import React, { /*useContext*/ } from 'react'
import './App.css'
import { useParams } from "react-router-dom"
import { StateRouter, RouteView} from "./StateRouter"

const Batch = () => <h2>Batch frame</h2>

const WelcomeToProflow = () => <h2>Welcome to Proflow</h2>

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
    // const match = useRouteMatch()
    return <>
        <h2>Order frame for order number: {params.orderNumber}</h2>
        <RouteView>
            <p>Fallback content for invalid url at order level</p>
        </RouteView>
    </>
}



const Tenant = () => {
    const params = useParams()
    return <>
        <h2>Tenant Frame for tenant id: {params.tenantId}</h2>
        <RouteView>
            <p>Fallback content for invalid url at second level</p>
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

