import { useEffect } from "react"
import { useParams } from "react-router-dom"
import CardStats from "../util/cardStats"
import TableStats from "../util/table"
import { useRecordFunctions } from "@/lib/hooks/useRecordFunctions"
import NavButtons from "../util/navButtons"

export default function Records() {
  const { id } = useParams()
  const { state, viewMatch, fetchCount } = useRecordFunctions(id)

  useEffect(() => {
    if (!id) return
    fetchCount()
    viewMatch(0)
  }, [id])

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full">
        <NavButtons
          gameCount={state.gameCount}
          match={state.viewMatch}
          viewMatch={viewMatch}
        />
      </div>

      {/* <CardStats
        records={state.records} /> */}

      <TableStats
        recordType={state.recordType}
        records={state.records}
        kills={state.killData} />
    </div>
  )
}