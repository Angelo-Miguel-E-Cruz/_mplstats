import { useEffect } from "react"
import { useParams } from "react-router-dom"
import CardStats from "./util/cardStats"
import TableStats from "./util/table"
import { useRecordFunctions } from "@/lib/hooks/useRecordFunctions"
import NavButtons from "./util/navButtons"

export default function Records() {
  const { id } = useParams()
  const { state, fetchRecords, fetchCount } = useRecordFunctions(id)

  useEffect(() => {
    fetchCount()
    fetchRecords(0)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <NavButtons
        gameCount={state.gameCount}
        fetchRecords={fetchRecords}
      />

      <CardStats
        records={state.records} />

      <TableStats
        recordType={state.recordType}
        records={state.records} />
    </div>
  )
}