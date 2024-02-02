'use client'

import { Skeleton } from "antd"
import { useState, useEffect } from "react"
import ManageExplanationsForm from "./manage-explanations-form"
import ManageExplanationsTable from "./manage-explanations-table"

const ManageExplanations = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    },[])

    return (
        <Skeleton loading = {loading} active>
            <ManageExplanationsForm />
            <ManageExplanationsTable />
        </Skeleton>
    )
}

export default ManageExplanations