import React, { useContext, useMemo } from 'react'
import _ from 'lodash'
import { DashboardTemplate } from '../../../template/components'
import { LoginContext } from '../../login'
import SectionsContext from './sections.context'
import SectionsTable from './sectionsTable'

export default function Index() {
  const { userId } = useContext(LoginContext)

  const contextPayload = useMemo(
    () => ({
      userId
    }),
    [userId]
  )

  return (
    <DashboardTemplate>
      <SectionsContext.Provider value={contextPayload}>
        <SectionsTable />
      </SectionsContext.Provider>
    </DashboardTemplate>
  )
}
